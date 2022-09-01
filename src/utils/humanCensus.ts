/* eslint-disable max-lines */
import {
  each,
  filter,
  find,
  indexOf,
  isArray,
  isEmpty,
  isObject,
  isString,
  without,
} from "lodash";
import moment from "moment";
import {
  createOrgCensusHumans,
  createOrgSimpleCensusFormat,
  deleteAllOrgSimpleCensusHumans,
  getAllOrgSimpleCensusFormats,
  updateOrg,
  updateOrgSimpleCensusFormat,
} from "src/api/org";
import { defaultCountry } from "src/constants";
import {
  allayInternalSimpleCensusFormat,
  fieldsMap,
  fullCensusFields,
  simpleCensusFields,
} from "src/constants/humanCensus";
import { ICensusHuman } from "src/interfaces/census";
import { IWorkbook } from "src/interfaces/csv";
import { IOrg } from "src/interfaces/org";
import {
  getDataObjectMapping,
  getFieldType,
  setDataObjectMapping,
  setFieldValue as requiredSetFieldValue,
  validateField as requiredValidateField,
} from "src/utils/requiredField";
import { formatData } from "./api";
import { exportCsvFile, readXlsFile } from "./csv";
import { addTag, hasTag } from "./document";
import { getIsoCountry, isValidZip } from "./region";
import { getFieldValue, isInvalidFieldValue } from "./requiredField";

export function setFieldValue(fieldName, rowData, value) {
  requiredSetFieldValue(fieldsMap[fieldName], rowData, value);
}

export function getRelationshipTypes(type) {
  const relationshipTypes = {
    dependent: ["Spouse", "Child", "Common Law", "Legal Guardianship"],
    main: [
      "Spouse",
      "Child",
      "Parent",
      "Sibling",
      "Friend",
      "Extended-family",
      "Common Law",
      "Legal Guardianship",
      "Other",
    ],
    beneficiary: [
      "Spouse",
      "Child",
      "Parent",
      "Sibling",
      "Friend",
      "Extended-family",
      "Common Law",
      "Legal Guardianship",
      "Other",
    ],
  };

  let rval = relationshipTypes[type];
  if (!rval) {
    rval = relationshipTypes["main"];
  }
  return rval;
}

export function getRelationshipTypesObjects(type) {
  const types = getRelationshipTypes(type);
  const objects = [];
  for (let i = 0; i < types.length; ++i) {
    const obj = {
      name: types[i],
    };
    objects.push(obj);
  }
  return objects;
}

export function isHumanIncomplete(human: ICensusHuman, fields) {
  for (let i = 0; i < fields.length; ++i) {
    if (human.employee) {
      // dependent
      if (!fields[i].requiredForDependent) {
        continue;
      }
    } else {
      // employee
      if (!fields[i].requiredForEmployee || fields[i].dependentOnly) {
        continue;
      }
    }

    let isMissing = isFieldMissing(human, fields[i].field);
    if (isMissing) {
      return true;
    }
  }
  return false;
}

export function areDependentsIncomplete(human: ICensusHuman, fields) {
  if (human.employee || human.dependents.length === 0) {
    return false;
  }

  for (let i = 0; i < human.dependents.length; ++i) {
    const dependent = human.dependents[i];
    if (isHumanIncomplete(dependent, fields)) {
      return true;
    }
  }

  return false;
}

export function isFieldMissing(human: ICensusHuman, field) {
  const value = getFieldValue(field, human);
  return isInvalidFieldValue(value, field);
}

export function humanSortFunction(a, b) {
  // sort by row number
  let aRowNumber, bRowNumber;
  if (!isEmpty(a.additional_data.row_number)) {
    aRowNumber = a.additional_data.row_number;
  }
  if (!isEmpty(b.additional_data.row_number)) {
    bRowNumber = b.additional_data.row_number;
  }
  if (!isEmpty(aRowNumber) && isEmpty(bRowNumber)) {
    return -1;
  }
  if (isEmpty(aRowNumber) && !isEmpty(bRowNumber)) {
    return 1;
  }
  if (!isEmpty(aRowNumber) && !isEmpty(bRowNumber)) {
    const diff = aRowNumber - bRowNumber;
    if (diff !== 0) {
      return diff;
    }
  }
  if (a.last_name && b.last_name) {
    if (a.last_name < b.last_name) {
      return -1;
    }
    if (a.last_name > b.last_name) {
      return 1;
    }
  }
  return 0;
}

export function addFlattenedHumans(sourceHumans, destHumans) {
  each(sourceHumans, function (human) {
    destHumans.push(human);
    human.dependents.sort(humanSortFunction);
    each(human.dependents, function (dependent) {
      destHumans.push(dependent);
    });
  });
}

export function updateHuman(humans: ICensusHuman[], humanId, updatedHuman?) {
  for (let i = 0; i < humans.length; i++) {
    if (humans[i].id === humanId) {
      if (updatedHuman) {
        humans[i] = updatedHuman;
      } else {
        humans.splice(i, 1);
      }
      return true;
    }
    if (
      isArray(humans[i].dependents) &&
      updateHuman(humans[i].dependents, humanId, updatedHuman)
    ) {
      return true;
    }
  }
  return false;
}

export function parseWorkbook(workbook, format, org, fullCensus) {
  // make sure workbook is valid
  if (!validateWorkbook(workbook) || !format) {
    return;
  }

  // parse employee data
  const rows = [];

  // validate ee data page
  let eePageIndex = 0;
  if (format.sheet_name) {
    for (let i = 0; i < workbook.SheetNames.length; ++i) {
      if (
        format.sheet_name.trim().toLowerCase() ===
        workbook.SheetNames[i].trim().toLowerCase()
      ) {
        eePageIndex = i;
        break;
      }
    }
  }

  const page = workbook.Sheets[workbook.SheetNames[eePageIndex]];
  if (!page) {
    return;
  }

  // get max row
  if (!isString(page["!ref"])) {
    return;
  }
  const refStr = page["!ref"];
  const minMaxCells = refStr.split(":");
  if (minMaxCells.length !== 2) {
    return false;
  }
  const maxCell = minMaxCells[1];
  let maxRow = 0;
  for (let i = 0; i < maxCell.length; ++i) {
    const char = maxCell.charAt(i);
    if (char >= "0" && char <= "9") {
      const numStr = maxCell.substring(i);
      maxRow = parseInt(numStr);
      break;
    }
  }
  if (!(isFinite(maxRow) && maxRow > 0)) {
    return;
  }

  // validate start row
  let dataStartRow = 1;
  if (isFinite(format.data_start_row)) {
    dataStartRow = format.data_start_row;
  }
  if (dataStartRow < 1) {
    return;
  }

  // check for comment rows and skip them
  for (let commentRowIndex = 1; commentRowIndex <= maxRow; ++commentRowIndex) {
    const commentCellName = "A" + commentRowIndex;
    const commentCellValue = getCellValue(page, commentCellName);
    // stop at first non-comment row
    if (!isCommentString(commentCellValue)) {
      dataStartRow += commentRowIndex - 1;
      break;
    }
  }

  if (dataStartRow > maxRow) {
    return;
  }

  // validate end row
  let endOnBlankRow = true;
  if (format.data_end_row > 0 && format.data_end_row >= dataStartRow) {
    maxRow = format.data_end_row;
    endOnBlankRow = false;
  }

  // parse rows: up to maxRow, or stop on first empty row
  let lastEmployeeRowData;
  for (let r = dataStartRow; r <= maxRow; ++r) {
    // relationship: if relationship info is present, there will be one row
    // for EE data and >= 0 rows of dependent data
    const relationship = getRelationship(r, page, format);

    // parse row
    const rowData = {
      additional_data: {
        row_number: r,
      },
      xls_data: {
        postal: null,
        gender: "",
        birthday: "",
        first_name: "",
        last_name: "",
        plan_name: "",
        coverage_type: "",
      },
      dependents: [],
    };

    // cache employee data for later coverage determination
    if (!relationship) {
      rowData.dependents = [];
      lastEmployeeRowData = rowData;
    }

    /**** common fields ****/

    // zip
    const postal = getPostal(r, page, format, org);
    rowData.xls_data.postal = postal.raw;
    setFieldValue("postal", rowData, postal.parsed);

    // gender
    const gender = getFieldText(
      "gender",
      "gender_column",
      r,
      page,
      format,
      org
    );
    rowData.xls_data.gender = gender.raw;
    setFieldValue("gender", rowData, gender.parsed);

    // birthday
    const birthday = getFieldText(
      "birthday",
      "birthday_column",
      r,
      page,
      format,
      org
    );
    rowData.xls_data.birthday = birthday.raw;
    setFieldValue("birthday", rowData, birthday.parsed);

    // last name
    let lastNameColumn = "last_name_column_ee";
    if (relationship && format["last_name_column_dep"]) {
      lastNameColumn = "last_name_column_dep";
    }
    const lastName = getFieldText(
      "last_name",
      lastNameColumn,
      r,
      page,
      format,
      org
    );
    rowData.xls_data.last_name = lastName.raw;

    // first name
    let firstNameColumn = "first_name_column_ee";
    if (relationship && format["first_name_column_dep"]) {
      firstNameColumn = "first_name_column_dep";
    }

    const firstName = getFieldText(
      "first_name",
      firstNameColumn,
      r,
      page,
      format,
      org
    );
    rowData.xls_data.first_name = firstName.raw;
    const firstNameCol = getCellName(format, firstNameColumn, r);
    if (!firstNameCol) {
      // if first name column is empty, parse last name for alternate name formats
      const parsedName = parseAlternateName(lastName.parsed);
      lastName.parsed = parsedName.last_name;
      firstName.parsed = parsedName.first_name;
    }
    setFieldValue("last_name", rowData, lastName.parsed);
    setFieldValue("first_name", rowData, firstName.parsed);

    /**** employee-only fields ****/

    // coverage
    const coverage = getCoverage(r, page, format);
    rowData.xls_data.coverage_type = coverage.raw;
    setFieldValue("coverage_type", rowData, coverage.parsed);

    // plan_name
    const planName = getFieldText(
      "plan_name",
      "plan_column",
      r,
      page,
      format,
      org
    );
    rowData.xls_data.plan_name = planName.raw;
    setFieldValue("plan_name", rowData, planName.parsed);

    /**** dependent-only non-field info ****/
    if (relationship) {
      setFieldValue("relationship", rowData, relationship);

      // add dependent to employee
      if (lastEmployeeRowData) {
        lastEmployeeRowData.dependents.push(rowData);
      }
    }

    // if empty row, stop
    let hasData = false;
    if (rowData) {
      const fields = ["birthday", "gender"];
      if (!relationship) {
        fields.push("coverage_type");
        fields.push("postal");
      }

      if (fullCensus) {
        fields.push("first_name");
        fields.push("last_name");
        if (!relationship) {
          fields.push("plan_name");
        }
      }

      for (let iField = 0; iField < fields.length; ++iField) {
        const value = getFieldValue(fieldsMap[fields[iField]], rowData);
        if (value) {
          hasData = true;
          if (!relationship) {
            rows.push(rowData);
          }
          break;
        }
      }
    }

    // if empty row (stop parsing) or last row, finish current EE
    if ((!hasData && endOnBlankRow) || r === maxRow) {
      break;
    }
  }

  // for each employee, determine coverage based on dependents, if coverage was not
  // already specified
  each(rows, function (rowData) {
    if (!rowData.relationship) {
      determineEmployeeCoverage(rowData);
    }
  });

  return rows;
}

export function validateWorkbook(workbook: IWorkbook): boolean {
  if (!isObject(workbook)) {
    return false;
  }

  // must have page names
  if (!isArray(workbook.SheetNames)) {
    return false;
  }

  // must have pages
  if (!isObject(workbook.Sheets)) {
    return false;
  }

  // make sure sheets are there
  for (let i = 0; i < workbook.SheetNames.length; ++i) {
    if (!isObject(workbook.Sheets[workbook.SheetNames[i]])) {
      return false;
    }
  }

  return true;
}

export function getCellValue(page, cell) {
  if (page && cell && isObject(page[cell])) {
    if (page[cell].w) {
      return page[cell].w.toString();
    }
    if (page[cell].v) {
      return page[cell].v.toString();
    }
  }
  return "";
}

export function isCommentString(str) {
  return isString(str) && str.length > 0 && str[0] === "#";
}

export function getRelationship(row, page, format) {
  let relationship = "";
  if (isString(format.relationship_column) && format.relationship_column) {
    const cellName = format.relationship_column.toUpperCase() + row.toString();
    let cellValue = getCellValue(page, cellName);
    if (cellValue) {
      const relationshipValues = {
        employee: format.relationship_employee,
        spouse: format.relationship_spouse,
        child: format.relationship_child,
      };

      cellValue = cellValue.trim().toLowerCase();
      if (relationshipValues.employee === "*") {
        // if employee relationship value is '*', then any value in this
        // cell means it's an employee row
        if (cellValue.length === 0) {
          relationship = "dependent";
        }
      } else {
        // parse actual values
        cellValue = matchCellValue(cellValue, relationshipValues);
        if (cellValue && cellValue !== "employee") {
          relationship = cellValue;
        }
      }
    }
  }
  return relationship;
}

export function matchCellValue(cellValue, matchObject) {
  if (isString(cellValue) && isObject(matchObject) && matchObject) {
    cellValue = cellValue.trim().toLowerCase();

    // match value by string (case insensitive)
    const keys = Object.keys(matchObject);
    for (let i = 0; i < keys.length; ++i) {
      // if matchObject is empty, match if cell is also empty
      if (!cellValue && !matchObject[keys[i]]) {
        // match!
        return keys[i];
      }

      // if matchObject is *, match if cell is not empty
      if (cellValue === "*" && matchObject[keys[i]]) {
        // match!
        return keys[i];
      }

      const toks = matchObject[keys[i]].split(",");
      for (let t = 0; t < toks.length; ++t) {
        let tok = toks[t].trim();
        if (tok.length === 0) {
          continue;
        }
        tok = tok.toLowerCase();

        // start with wildcard?
        const startStar = tok.charAt(0) === "*";
        if (startStar) {
          tok = tok.substring(1);
          if (tok.length === 0) {
            continue;
          }
        }

        // end with wildcard?
        const endStar = tok.charAt(tok.length - 1) === "*";
        if (endStar) {
          tok = tok.substring(0, tok.length - 1);
          if (tok.length === 0) {
            continue;
          }
        }

        if (startStar && endStar) {
          // contains
          if (!cellValue.includes(tok)) {
            continue;
          }
        } else if (startStar) {
          // ends with
          if (!cellValue.endsWith(tok)) {
            continue;
          }
        } else if (endStar) {
          // starts with
          if (!cellValue.startsWith(tok)) {
            continue;
          }
        } else {
          // equals
          if (cellValue !== tok) {
            continue;
          }
        }

        // match!
        return keys[i];
      }
    }
  }
  return "";
}

export function getPostal(row, page, format, org) {
  const rval = {
    raw: "",
    parsed: "",
  };

  if (isString(format.postal_column) && format.postal_column) {
    const cellName = getCellName(format, "postal_column", row);
    rval.raw = getCellValue(page, cellName);
    if (rval.raw) {
      // parse in case it's an address
      rval.raw = rval.raw.replace(/,/g, "");
      const tokens = rval.raw.split(" ");
      if (tokens.length > 0) {
        const lastToken = tokens[tokens.length - 1].trim();
        const validate = validateField(fieldsMap["postal"], lastToken, org);
        if (validate.match) {
          rval.parsed = validate.data;
        }
      }
    }
  }
  return rval;
}

export function validateField(field, value, org) {
  let val = requiredValidateField(field, value);

  // if no match with coverage code, try a much looser check
  if (field.mapping === "coverage_type" && (!val.match || val.review)) {
    const coverageAliases = [
      {
        value: "Employee",
        equals: ["ee"],
      },
      {
        value: "Employee & Spouse",
        contains: ["spo"],
        equals: ["es", "s"],
      },
      {
        value: "Employee & Children",
        contains: ["chi"],
        equals: ["ec", "c"],
      },
      {
        value: "Employee & Family",
        contains: ["fam"],
        equals: ["ef", "f"],
      },
    ];

    let val2ElectricBoogaloo = "";
    for (let n = 0; n < coverageAliases.length; ++n) {
      // equals?
      if (valueEquals(value, coverageAliases[n].equals)) {
        val2ElectricBoogaloo = coverageAliases[n].value;
        break;
      }

      // contains?
      if (valueContains(value, coverageAliases[n].contains)) {
        val2ElectricBoogaloo = coverageAliases[n].value;
        break;
      }
    }
    if (val2ElectricBoogaloo) {
      val = requiredValidateField(field, val2ElectricBoogaloo);
    }
  }

  // make sure zip is valid - even though format is OK, value may not be
  if (val.match && field.mapping === "postal") {
    let country = org.country;
    if (!country) {
      country = defaultCountry;
    }

    const isoCountry = getIsoCountry(org.country);
    if (isoCountry === "US") {
      const zipValid = isValidZip(value);
      if (!zipValid) {
        val.match = false;
      }
    }
  }

  return val;
}

export function valueEquals(value, equals) {
  if (isString(value) && isArray(equals)) {
    for (let i = 0; i < equals.length; ++i) {
      if (value.toLowerCase() === equals[i].trim().toLowerCase()) {
        return true;
      }
    }
  }
  return false;
}

export function valueContains(value, contains) {
  if (isString(value) && isArray(contains)) {
    for (let i = 0; i < contains.length; ++i) {
      const index = value
        .toLowerCase()
        .indexOf(contains[i].trim().toLowerCase());
      if (index > -1) {
        return true;
      }
    }
  }
  return false;
}

export function getFieldText(field, column, row, page, format, org) {
  const rval = {
    raw: "",
    parsed: "",
  };

  if (isString(format[column]) && format[column]) {
    const cellName = getCellName(format, column, row);
    rval.raw = getCellValue(page, cellName);
    if (rval.raw) {
      rval.raw = rval.raw.trim();
      const validate = validateField(fieldsMap[field], rval.raw, org);
      if (validate.match) {
        rval.parsed = validate.data;
      }
    }
  }
  return rval;
}

export function getCellName(format, column, row) {
  if (
    isObject(format) &&
    isString(column) &&
    isString(format[column]) &&
    format[column] &&
    row
  ) {
    return format[column].toUpperCase() + row.toString();
  }
  return "";
}

export function parseAlternateName(fullName) {
  const rval = {
    first_name: "",
    last_name: "",
  };

  if (fullName && isString(fullName)) {
    fullName = fullName.trim();

    // last_name, first_name
    let nameSplit = fullName.split(",");
    if (nameSplit.length === 2) {
      rval.last_name = nameSplit[0].trim();
      rval.first_name = nameSplit[1].trim();
      return rval;
    }

    // first_name last_name
    nameSplit = fullName.split(" ");
    if (nameSplit.length > 1) {
      let firstName = "",
        lastName = "";
      for (let i = 0; i < nameSplit.length; ++i) {
        nameSplit[i] = nameSplit[i].trim();
        if (i < nameSplit.length - 1) {
          // first name part
          if (i > 0) {
            firstName += " ";
          }
          firstName += nameSplit[i];
        } else {
          lastName = nameSplit[i];
        }
      }

      rval.last_name = lastName;
      rval.first_name = firstName;
      return rval;
    }
  }

  return rval;
}

export function getCoverage(row, page, format) {
  const rval = {
    raw: "",
    parsed: "",
  };

  if (isString(format.coverage_column) && format.coverage_column) {
    const cellName = getCellName(format, "coverage_column", row);
    rval.raw = getCellValue(page, cellName);
    if (rval.raw) {
      const coverageValues = {
        employee: format.coverage_ee,
        employee_spouse: format.coverage_es,
        employee_children: format.coverage_ec,
        employee_family: format.coverage_ef,
        waived: format.coverage_waived,
      };
      rval.parsed = matchCellValue(rval.raw.trim(), coverageValues);
    }
  }

  return rval;
}

export function determineEmployeeCoverage(rowData) {
  if (rowData) {
    // determine coverage by dependents, if not already set
    const existingCoverage = getFieldValue(fieldsMap["coverage_type"], rowData);
    if (!existingCoverage && isArray(rowData.xls_data.dependents)) {
      const spouses = filter(rowData.xls_data.dependents, function (dep) {
        return dep.relationship === "spouse";
      });
      const children = filter(rowData.xls_data.dependents, function (dep) {
        return dep.relationship === "child";
      });
      let derivedCoverageValue = "employee";
      if (spouses.length > 0 && children.length > 0) {
        derivedCoverageValue = "employee_family";
      } else if (spouses.length > 0) {
        derivedCoverageValue = "employee_spouse";
      } else if (children.length > 0) {
        derivedCoverageValue = "employee_children";
      }
      setFieldValue(fieldsMap["coverage_type"], rowData, derivedCoverageValue);
    }
  }
}

export function createUploadHuman(human) {
  let emptyHuman = getEmptyHuman();
  const uploadHuman = {
    ...emptyHuman,
    ...human,
  };
  cleanMissingFieldValues(uploadHuman);
  if (isArray(uploadHuman.dependents)) {
    each(uploadHuman.dependents, function (dependent) {
      cleanMissingFieldValues(dependent);
    });
  }
  delete uploadHuman.xls_data;
  return uploadHuman;
}

export function getEmptyHuman(defaultCoverage?: string) {
  let human = {
    email: "",
    first_name: "",
    last_name: "",
    postal: "",
    birthday: "",
    gender: "",
    coverage_type: "",
    medicare_carveout: false,
    retiree: false,
    cobra: false,
    relationship: "",
    employee: null,
    plan_name: "",
  };

  if (defaultCoverage) {
    // Default the coverage type to Employee
    const field = fieldsMap["coverage_type"];
    requiredSetFieldValue(field, human, field.choices[0].code);
  }
  return human;
}

export function cleanMissingFieldValues(human) {
  each(fullCensusFields, function (field) {
    if (!human[field.mapping]) {
      delete human[field.mapping];
    }
  });
}

export async function createOrgSimpleCensusHumans(humans, orgId) {
  for (let i = 0; i < humans.length; ++i) {
    humans[i] = formatData(humans[i]);
    if (isArray(humans[i].dependents)) {
      for (let d = 0; d < humans[i].dependents.length; ++d) {
        humans[i].dependents[d] = formatData(humans[i].dependents[d]);
      }
    }
  }

  await createOrgCensusHumans(orgId, humans);
}

export function exportCensusCSV(humans, filename) {
  const rows = getCensusRows(humans);
  return exportCsvFile(rows, filename);
}

export function getDownloadSimpleCensusFilename(orgDetail: IOrg) {
  const todayString = moment().format("YYYY_MM_DD_HH_mm");
  return orgDetail.name + "_" + todayString + "_simple_census";
}

export function getCensusRows(humans) {
  let rows = [];

  const header = getCensusCsvHeader();
  rows.push(header);

  const humanRows = getCensusCsvRows(humans);
  rows = rows.concat(humanRows);
  return rows;
}

export function getCensusCsvHeader() {
  const header = [];
  each(fullCensusFields, function (field) {
    let name = field.name;
    const simpleCensusFieldIndex = indexOf(simpleCensusFields, field);
    if (simpleCensusFieldIndex > -1) {
      name += "*";
    }
    header.push(name);
  });
  return header;
}

export function getCensusCsvRows(humans) {
  const rows = [];
  const data = getCensusData(humans);
  each(data, function (dataRow) {
    const row = [];
    each(fullCensusFields, function (field) {
      const value = dataRow[field.name];
      row.push(value);
    });
    rows.push(row);
  });
  return rows;
}

export function getCensusData(humans) {
  const data = [];
  each(humans, function (human) {
    const row = {};
    each(fullCensusFields, function (field) {
      let value = getFieldValue(field, human);
      if (field.value_code && getFieldType(field) === "CH") {
        // export name instead of code for choices flagged as such
        const foundChoice = field.choices.find(
          (choice) => choice.code === value
        );
        if (foundChoice && foundChoice.name) {
          value = foundChoice.name;
        }
      }

      if (field === fieldsMap["coverage_type"]) {
        // convert coverage types to industry standard version
        const coverageMap = {
          Employee: "EE",
          "Employee & Spouse": "ES",
          "Employee & Children": "EC",
          "Employee & Family": "EF",
        };
        if (value in coverageMap) {
          value = coverageMap[value];
        }
      }

      // convert undefined/null to empty string
      if (value === null || value === undefined) {
        value = "";
      }

      row[field.name] = value;
    });
    data.push(row);
  });
  return data;
}

export async function createOrUpdateOrgSimpleCensusFormat(format, orgId) {
  let newFormat;
  if (format.id) {
    newFormat = updateOrgSimpleCensusFormat(orgId, format);
  } else {
    newFormat = createOrgSimpleCensusFormat(orgId, format);
  }
  return newFormat;
}

export async function getCurrentCensusFormat(org: IOrg) {
  const formats = await getAllOrgSimpleCensusFormats(org.id);
  const formatId = getDataObjectMapping(org, "census_data.uploaded_format");
  let format =
    Array.isArray(formats) &&
    formats.find((censusFormat) => censusFormat.id === formatId);
  if (!format) {
    format = allayInternalSimpleCensusFormat;
  }
  return format;
}

export async function uploadCensusFile(
  orgDetail: IOrg,
  fileData,
  fileObject,
  uploadedFormat?
) {
  let format = uploadedFormat;
  if (!format) {
    format = await getCurrentCensusFormat(orgDetail);
  }

  const fileBlob = new Blob([fileObject], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // TODO: Use this logic when uploading from cloud to s3, consider later
  // const getFileUrl: string = await getGetPresignedUrl(fileData.key);
  // const csvFile = await httpLoadFileBlob(getFileUrl);
  // const fileBlob = await readXlsFile(csvFile.blob);
  const workbook = await readXlsFile(fileBlob);
  const employees =
    parseWorkbook(workbook, format, orgDetail, true) || ([] as ICensusHuman[]);

  each(employees, function (ee) {
    if (ee.xls_data && ee.additional_data) {
      each(Object.keys(ee.xls_data), function (key) {
        if (ee.xls_data[key] && !ee.additional_data[key]) {
          ee.additional_data[key] = ee.xls_data[key];
        }
      });
    }
  });
  if (Array.isArray(employees) && employees.length > 0) {
    await deleteAllOrgSimpleCensusHumans(orgDetail.id);
    await createSimpleCensusHuman(orgDetail, employees);
  }
}

export async function storeSimpleCensusFile(org, fileInfo, format) {
  if (!fileInfo.tags) {
    fileInfo.tags = "";
  }
  addTag(fileInfo, "simple-census");

  if (!isArray(org.generic_field_responses.plan_documents)) {
    org.generic_field_responses.plan_documents = [];
  }

  // find existing current simple census file
  const foundFile = getSimpleCensusFile(
    org.generic_field_responses.plan_documents
  );

  // if found file, replace it
  if (foundFile) {
    org.generic_field_responses.plan_documents = without(
      org.generic_field_responses.plan_documents,
      foundFile
    );
  }
  org.generic_field_responses.plan_documents.push(fileInfo);

  // store format id (or null if internal)
  if (format) {
    let formatId = null;
    if (format.id && !format.internal) {
      formatId = format.id;
    }
    setDataObjectMapping(org, "census_data.uploaded_format", formatId, false);
  }

  const updatedOrg = await updateOrg(org);
  return updatedOrg;
}

export function getSimpleCensusFile(docs) {
  const foundFile = find(docs, function (doc) {
    return hasTag(doc, "simple-census");
  });
  return foundFile;
}

export async function createSimpleCensusHuman(
  org: IOrg,
  employees: ICensusHuman[]
) {
  const humans = employees.map((employee) => createUploadHuman(employee));
  if (isArray(humans) && humans.length > 0) {
    await createOrgSimpleCensusHumans(humans, org.id);
  }
}

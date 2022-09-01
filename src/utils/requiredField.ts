/* eslint-disable max-lines */
import {
  each,
  find,
  indexOf,
  isArray,
  isEmpty,
  isObject,
  isString,
  isUndefined,
} from "lodash";
import moment from "moment";

const booleanChoices = [
  {
    name: "No",
    value: false,
    code: "N",
  },
  {
    name: "Yes",
    value: true,
    code: "Y",
  },
];

export function getFieldValue(field, dataObject, fieldResponseOverride?) {
  let value;
  if (field) {
    if (fieldResponseOverride) {
      if (isType("FI", field) || isType("IM", field)) {
        value = {
          name: fieldResponseOverride.name,
          file: fieldResponseOverride.response,
          filestack_url: fieldResponseOverride.filestack_url,
          mime_type: fieldResponseOverride.mime_type,
        };
      } else {
        value = fieldResponseOverride.response;
      }
    } else {
      // if the field has a data_object expression, get object instead
      if (field.data_object) {
        const tmpObject = getDataObjectMapping(dataObject, field.data_object);
        if (!isEmpty(tmpObject)) {
          dataObject = tmpObject;
        } else {
          return undefined;
        }
      }
      value = getDataObjectMapping(dataObject, field.mapping);
    }

    if (isType("BO", field)) {
      const choice = getBooleanChoice(value);
      if (choice) {
        value = choice.value;
      }
    }

    // if value is an empty string (invalid) return undefined
    if (typeof value === "string" && !value) {
      value = undefined;
    }
  }

  return value;
}

export function getBooleanChoice(value) {
  let booleanChoice;

  if (typeof value === "boolean") {
    booleanChoice = booleanChoices.find((choice) => choice.value === value);
  } else if (typeof value === "string") {
    booleanChoice = booleanChoices.find((choice) => choice.name === value);
    if (isUndefined(booleanChoice)) {
      var lowerCase = value.toLowerCase();
      if (lowerCase === "false" || lowerCase === "no") {
        booleanChoice = booleanChoices.find((choice) => choice.value === false);
      } else if (lowerCase === "true" || lowerCase === "yes") {
        booleanChoice = booleanChoices.find((choice) => choice.value === true);
      }
    }
  }

  return booleanChoice;
}

export function isType(type, field): boolean {
  if (isString(type) && isObject(field)) {
    const fieldType = getFieldType(field);
    return fieldType === type;
  }
  return false;
}

export function getFieldType(field): string {
  if (field && field.response_type) {
    if (isObject(field.response_type)) {
      return field.response_type.code;
    }
    return field.response_type;
  }
  return "";
}

export function getDataObjectMapping(dataObject, mappingString) {
  if (isObject(dataObject) && isString(mappingString)) {
    const mappingArray = mappingString.split(".");
    if (mappingArray.length > 0) {
      const rval = resolveMapping(dataObject, mappingArray[0]);
      if (mappingArray.length === 1) {
        return rval;
      }
      if (isObject(rval)) {
        mappingArray.shift();
        const restOfMapping = mappingArray.join(".");
        return getDataObjectMapping(rval, restOfMapping);
      }
    }
  }
  return undefined;
}

export function resolveMapping(
  dataObject,
  mapping,
  createObjects = false,
  mappingIsObject = false
) {
  mapping = mapping.trim();
  const startArray = indexOf(mapping, "[");
  const endArray = indexOf(mapping, "]");

  // [ with no ]
  if (startArray > -1 && endArray === -1) {
    return undefined;
  }

  // ] with no [
  if (startArray === -1 && endArray > -1) {
    return undefined;
  }

  // array
  if (startArray > -1 && endArray > -1) {
    // [ cannot be at beginning of mapping
    if (startArray === 0) {
      return undefined;
    }

    // ] must be at end of mapping
    if (endArray !== mapping.length - 1) {
      return undefined;
    }

    // ] must be at least 2 positions after [
    if (endArray < startArray + 2) {
      return undefined;
    }

    let insideArray = mapping.substring(startArray + 1, endArray).trim();

    // empty inside
    if (insideArray.length === 0) {
      return undefined;
    }

    // get array object
    const arrayName = mapping.substring(0, startArray);
    let arrayObject = dataObject[arrayName];

    // not an array
    if (!isArray(arrayObject)) {
      if (createObjects) {
        arrayObject = dataObject[arrayName] = [];
      } else {
        return undefined;
      }
    }

    const startBracket = indexOf(insideArray, "{");
    const endBracket = indexOf(insideArray, "}");

    // { with no }
    if (startBracket > -1 && endBracket === -1) {
      return undefined;
    }

    // } with no {
    if (startBracket === -1 && endBracket > -1) {
      return undefined;
    }

    // find object in array by properties
    if (startBracket > -1 && endBracket > -1) {
      // } before {
      if (endBracket < startBracket + 2) {
        return undefined;
      }

      // replace single quotes with double quotes
      insideArray = insideArray.replace(/\'/g, '"');

      // transform into object
      let paramsObj;
      try {
        paramsObj = JSON.parse(insideArray);
      } catch (err) {
        return undefined;
      }

      // now try and find object with these properties in the array
      let foundObject = arrayObject.find((object) => object.id === paramsObj);
      if (!isObject(foundObject) && createObjects) {
        foundObject = paramsObj;
        arrayObject.push(foundObject);
      }
      return foundObject;
    }
    // no properties, just key, so create empty array object
    if (!isObject(arrayObject[insideArray]) && createObjects) {
      arrayObject[insideArray] = {};
    }
    return arrayObject[insideArray];
  }
  // no array, so create interim object if requested
  if (!isObject(dataObject[mapping]) && createObjects && mappingIsObject) {
    dataObject[mapping] = {};
  }
  return dataObject[mapping];
}

export function isInvalidFieldValue(value, field) {
  // if value is an array, and is empty, it's invalid
  // except for list fields which can have empty arrays
  if (isArray(value) && !Array.isArray(field)) {
    return value.length === 0;
  }

  return isInvalidValue(value);
}

export function isValidValue(value) {
  return !isInvalidValue(value);
}

export function isInvalidValue(value) {
  return isEmpty(value) || value === null || value === "";
}

export function setFieldValue(field, dataObject, value) {
  if (dataObject && value) {
    if (field.data_object) {
      const tmpObject = resolveMapping(
        dataObject,
        field.data_object,
        true,
        true
      );
      if (tmpObject) {
        dataObject = tmpObject;
      } else {
        return false;
      }
    }
    return setDataObjectMapping(dataObject, field.mapping, value, true);
  }
}

export function setDataObjectMapping(
  dataObject,
  mappingString,
  value,
  createIfMissing
) {
  if (isObject(dataObject) && isString(mappingString)) {
    const mappingArray = mappingString.split(".");
    if (mappingArray.length > 0) {
      const rval = resolveMapping(
        dataObject,
        mappingArray[0],
        createIfMissing,
        mappingArray.length > 1
      );
      if (mappingArray.length === 1) {
        dataObject[mappingArray[0]] = value;
        return true;
      }
      mappingArray.shift();
      const restOfMapping = mappingArray.join(".");
      return setDataObjectMapping(rval, restOfMapping, value, createIfMissing);
    }
  }
  return false;
}

export function validateField(field, value) {
  const rval = {
    data: value,
    match: false,
    review: false,
  };

  if (isType("DA", field)) {
    // DA - Date
    const date = validateDate(value, true);
    if (date) {
      rval.data = date;
      rval.match = true;
    }
  } else if (isType("CH", field) || isType("BO", field)) {
    // CH - Choices or BO - Booleans. Booleans store field.value instead of field.name
    if (isValidValue(value)) {
      let choices = [];
      if (isType("CH", field)) {
        choices = field.choices;
      } else if (isType("BO", field)) {
        choices = booleanChoices;
      }

      const choice = findByNameOrCode(choices, value);
      if (choice) {
        // nailed it, gtfo

        if (field.value_code && choice.code) {
          // if field is set up to store choice code
          rval.data = choice.code;
        } else if (choice.value) {
          // if choice has a value (like booleans)
          rval.data = choice.value;
        } else {
          // default: choice name
          rval.data = choice.name;
        }

        rval.match = true;
      } else {
        // exact match by choice.value?
        const valueMatch = choices.find((choice) => choice.value === value);
        if (valueMatch) {
          rval.data = valueMatch.value ? valueMatch.value : valueMatch.name;
          rval.match = true;
        }
        // THIS IS RETURNING BAD MATCHES
        // TODO: re-enable when figured out
        /*
              else {

                  // not quite, try and fuzzy match choices by name?
                  fuzz = findByTopStringScore(field.choices, value, 0.65, 0.65);
                  if (fuzz) {
                      rval.data = isDefined(fuzz.value) ? fuzz.value : fuzz.name;
                      rval.match = true;
                      rval.review = true;
                  }
              }
              */
      }
    }
  } else if (isType("MO", field) || isType("NU", field)) {
    // MO - Money or NU - Number
    if (isString(value)) {
      // if money, make sure it only has numeric
      // TODO: make robust filters for this, and make money directive use them
      if (isType("MO", field)) {
        // remove $ and , if existing
        let tmpStr = "";
        for (let i = 0; i < value.length; ++i) {
          const char = value.charAt(i);
          if (!(char === "$" || char === ",")) {
            tmpStr += char;
          }
        }
        value = tmpStr;
      }

      const numValue = parseFloat(value);
      if (isNaN(numValue)) {
        rval.match = false;
      } else {
        rval.data = numValue;
        rval.match = true;
      }
    } else if (isFinite(value)) {
      rval.data = value;
      rval.match = true;
    }
  } else if (isType("IT", field)) {
    // IT - Integer
    if (isString(value)) {
      const intValue = parseInt(value);
      if (isNaN(intValue)) {
        rval.match = false;
      } else {
        rval.data = intValue;
        rval.match = true;
      }
    }
  } else {
    // TX, (also EM, PO for now), any others
    if (isValidValue(value)) {
      rval.match = true;
    }
  }

  return rval;
}

const internalDateFormat = "YYYY-MM-DD";
const validDateFormats = ["YYYY-MM-DD", "MM-DD-YYYY", "MM-DD-YY"];
export function validateDate(dateString, isPast) {
  dateString = dateString.split("/").join("-");
  const dateParts = dateString.split("-");
  if (dateParts.length === 3) {
    const dateNumbers = [];
    each(dateParts, function (datePart) {
      const num = parseInt(datePart);
      if (!isNaN(num)) {
        dateNumbers.push(num);
      }
    });

    if (dateNumbers.length === dateParts.length) {
      for (let i = 0; i < validDateFormats.length; ++i) {
        const format = validDateFormats[i];
        const formatSplit = format.split("-");
        let twoDigitYear = false;
        if (formatSplit.length === dateNumbers.length) {
          let year, month, day;
          for (let j = 0; j < formatSplit.length; ++j) {
            const formatPart = formatSplit[j];
            const char = formatPart.charAt(0).toUpperCase();

            if (char === "Y" && formatPart.length === dateParts[j].length) {
              year = dateNumbers[j];
              if (formatPart.length === 2) {
                twoDigitYear = true;
              }
            } else if (
              char === "M" &&
              dateNumbers[j] >= 1 &&
              dateNumbers[j] <= 12
            ) {
              month = dateNumbers[j];
            } else if (
              char === "D" &&
              dateNumbers[j] >= 1 &&
              dateNumbers[j] <= 31
            ) {
              day = dateNumbers[j];
            }
          }

          if (year && month && day) {
            const momentDate = moment(dateString, format);
            if (momentDate.isValid()) {
              // if two-digit year and isPast is set, make sure moment.js
              // didn't put this date in the future
              if (twoDigitYear && isPast) {
                const today = moment();
                if (momentDate.isAfter(today)) {
                  year = momentDate.year() - 100;
                  momentDate.year(year);
                }
              }

              // return in nice format cause other date formats are whack
              return momentDate.format(internalDateFormat);
            }
          }
        }
      }
    }
  }

  return undefined;
}

export function findByNameOrCode(array, nameOrCode) {
  return find(array, function (obj) {
    let found = false;
    if (obj.name) {
      if (obj.name.toUpperCase() === nameOrCode.toUpperCase()) {
        found = true;
      }
    }
    if (obj.code) {
      if (obj.code.toUpperCase() === nameOrCode.toUpperCase()) {
        found = true;
      }
    }
    return found;
  });
}

import { filter } from "lodash";
import { updateOrgSimpleCensusHuman } from "src/api/org";
import { ICensusHuman } from "src/interfaces/census";
import { ITableHeader } from "src/interfaces/common";
import { isValidValue, setFieldValue } from "src/utils/requiredField";
import { IFieldInfo } from "../components/CensusFieldInput/utils";

export function getHeaderList(fields: IFieldInfo[], numDependents: number) {
  const headerList: ITableHeader[] = [
    { Header: "Row", accessor: "row_number" },
  ];

  // eslint-disable-next-line array-callback-return
  const headers = fields.filter((field) => {
    if (!(field.dependentOnly && numDependents === 0)) {
      return field;
    }
  });

  return [...headerList, ...headers];
}

export function getCensusCount(
  coverageType: string,
  filteredHumans: ICensusHuman[]
) {
  const filtered = filter(filteredHumans, function (human) {
    return !human.employee && human.coverage_type === coverageType;
  });
  return filtered.length || 0;
}

export function getPaginationAdditionalInformation(
  filteredHumans: ICensusHuman[]
) {
  return [
    { field: "EE", value: getCensusCount("employee", filteredHumans) },
    { field: "ES", value: getCensusCount("employee_spouse", filteredHumans) },
    { field: "EC", value: getCensusCount("employee_children", filteredHumans) },
    { field: "EF", value: getCensusCount("employee_family", filteredHumans) },
    { field: "W", value: getCensusCount("waived", filteredHumans) },
  ];
}

export async function handleOnChangeField(
  orgId: string,
  human: ICensusHuman,
  field,
  value
) {
  if (isValidValue(value)) {
    setFieldValue(field, human, value);
    await updateOrgSimpleCensusHuman(orgId, human);
  }
}

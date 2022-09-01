import { ICensusHuman } from "src/interfaces/census";
import { isFieldMissing } from "src/utils/humanCensus";

export interface IFieldInfo {
  Header: string;
  accessor: string;
  field: any;
  textAlign?: string;
  noWrap?: boolean;
  dependentOnly?: boolean;
  requiredForEmployee?: boolean;
  requiredForDependent?: boolean;
}

export function checkHasMissingField(
  human: ICensusHuman,
  fieldInfo: IFieldInfo
) {
  // not required for dependent
  if (human.employee && !fieldInfo.requiredForDependent) {
    return false;
  }

  // not required for employee
  if (!human.employee && !fieldInfo.requiredForEmployee) {
    return false;
  }

  return isFieldMissing(human, fieldInfo.field);
}

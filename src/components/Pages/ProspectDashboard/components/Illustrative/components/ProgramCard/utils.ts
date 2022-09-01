import { get } from "lodash";
import { PROGRAM_TYPE } from "src/constants";
import { ICarrierPlan, IVersion } from "src/interfaces/benefit";

export function getCurrentProgramVersion(
  program: ICarrierPlan,
  programType: string
): IVersion {
  const allVersions: IVersion[] = get(program, "versions", []);
  if (programType === PROGRAM_TYPE.ILLUST) {
    const allProgramIllustrativeVersions = allVersions.filter(
      (version) => version.version_type === PROGRAM_TYPE.ILLUST
    );
    if (
      Array.isArray(allProgramIllustrativeVersions) &&
      allProgramIllustrativeVersions.length > 0
    ) {
      return allProgramIllustrativeVersions[0];
    }
    return null;
  }
  const allProgramUnderwrittenVersions = allVersions.filter(
    (version) => version.version_type === PROGRAM_TYPE.UW
  );
  if (
    Array.isArray(allProgramUnderwrittenVersions) &&
    allProgramUnderwrittenVersions.length > 0
  ) {
    return allProgramUnderwrittenVersions[0];
  }
  return null;
}

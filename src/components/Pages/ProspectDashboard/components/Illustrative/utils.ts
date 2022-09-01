import { get } from "lodash";
import { ICarrierPlan, ITpa } from "src/interfaces/benefit";

export function shouldShowTpa(tpa: ITpa, filterText: string = "") {
  if (!filterText) {
    return true;
  }
  const programs: ICarrierPlan[] = get(tpa, "programs", []);
  return (
    programs.filter((program) => shouldShowProgram(program, filterText))
      .length > 0
  );
}

export function shouldShowProgram(
  program: ICarrierPlan,
  filterText: string = ""
) {
  if (!filterText) {
    return true;
  }
  const programName = get(program, "name", "");
  return programName.toLowerCase().includes(filterText.toLowerCase());
}

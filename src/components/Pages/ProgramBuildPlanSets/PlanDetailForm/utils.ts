import { get } from "react-hook-form";
import { IPlan } from "src/interfaces/benefit";

export function handleFormDefaultValue(plan: IPlan) {
  // :
  //  ICustomPlanDetail
  const defaultValue = {
    deductible_in: get(plan, "carrier_plan.deductible_in"),
  };
}

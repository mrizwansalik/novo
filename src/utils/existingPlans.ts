import { PlanOption } from "src/constants/enum/plan";
import { IProspectProgress } from "src/interfaces/prospects";

export function getPlanOption(prospectProgress: IProspectProgress): PlanOption {
  if (prospectProgress) {
    if (!prospectProgress.existing_plans_self_funded) {
      return PlanOption.FULLY_FUNDED;
    }
    if (prospectProgress.existing_plans_skipped) {
      return PlanOption.PLANS;
    }
    if (
      prospectProgress.existing_plans_self_funded ||
      prospectProgress.existing_plans_count > 0
    ) {
      return PlanOption.SELF_FUNDED;
    }
  }
}

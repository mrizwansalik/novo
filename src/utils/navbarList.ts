import { get } from "lodash";
import { healthType } from "src/constants/enum";
import { PlanOption } from "src/constants/enum/plan";
import { INavbar } from "src/interfaces/common";
import { IProspectProgress } from "src/interfaces/prospects";
import routes from "src/routes";
import { getPlanOption } from "./existingPlans";
export function dynamicNavbar(
  orgId: string,
  navbarList: INavbar[],
  prospectId: string,
  prospectProgress: IProspectProgress
): INavbar[] {
  return navbarList.map((item: INavbar) => {
    switch (item.title) {
      case "Dashboard":
        item.routingUrl = routes.dashboard.brokerage.brokerageId.prospects.prospectId.dashboard.getValue(
          orgId,
          prospectId
        );
        break;
      case "Client Profile":
        item.routingUrl = routes.dashboard.brokerage.prospects.prospectId.profile.value(
          prospectId
        );
        break;
      case "Census":
        item.routingUrl = routes.dashboard.brokerage.prospects.prospectId.census.details.value(
          prospectId
        );
        if (prospectProgress) {
          if (prospectProgress.census_progress === 1) {
            item.hint = "";
          }
        }
        break;
      case "Existing Plans":
        const planOption = getPlanOption(prospectProgress);
        const isComplete = get(
          prospectProgress,
          "existing_plans_documents_complete",
          false
        );
        if (isComplete) {
          item.hint = "";
        }
        if (planOption === PlanOption.SELF_FUNDED) {
          item.routingUrl = routes.dashboard.brokerage.brokerageId.prospects.prospectId.plans.selfFunded.documents.getValue(
            orgId,
            prospectId
          );
        }

        if (planOption === PlanOption.FULLY_FUNDED) {
          item.routingUrl = routes.dashboard.brokerage.brokerageId.prospects.prospectId.plans.fullyInsured.documents.getValue(
            orgId,
            prospectId
          );
        }
        break;
      case "Health History":
        const healthHistoryType = get(
          prospectProgress,
          "health_history_type",
          null
        );
        switch (healthHistoryType) {
          case healthType.CLAIMS:
            item.routingUrl = routes.dashboard.brokerage.prospects.prospectId.claims.documents.getValue(
              prospectId
            );
            break;
          case healthType.PHQS:
            item.routingUrl = routes.dashboard.brokerage.prospects.prospectId.phqs.getValue(
              prospectId
            );
            break;
          default:
            item.routingUrl = routes.dashboard.brokerage.prospects.prospectId.health.getValue(
              prospectId
            );
            break;
        }
        break;
      case "Build Programs":
        item.routingUrl = routes.dashboard.brokerage.prospects.prospectId.recipe.value(
          prospectId
        );
        break;
    }
    return item;
  });
}

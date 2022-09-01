import routes from "src/routes";

export function getPlanSetsPageRoute(
  isDashboardPage: boolean,
  brokerageId: string,
  prospectId: string,
  recipeId: string,
  planSetId: string
): string {
  if (isDashboardPage) {
    return routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.plansets.getValue(
      brokerageId,
      prospectId,
      recipeId,
      planSetId
    );
  }
  return routes.dashboard.god.brokerages.prospects.onboarding.programBuild.recipe.plansets.getValue(
    brokerageId,
    prospectId,
    recipeId,
    planSetId
  );
}

export function getPlanDetailPageRoute(
  isDashboardPage: boolean,
  brokerageId: string,
  prospectId: string,
  recipeId: string,
  planSetId: string,
  planId: string
): string {
  if (isDashboardPage) {
    return routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.plansets.plans.getValue(
      brokerageId,
      prospectId,
      recipeId,
      planSetId,
      planId
    );
  }
  return routes.dashboard.god.brokerages.prospects.onboarding.programBuild.recipe.plansets.plans.getValue(
    brokerageId,
    prospectId,
    recipeId,
    planSetId,
    planId
  );
}

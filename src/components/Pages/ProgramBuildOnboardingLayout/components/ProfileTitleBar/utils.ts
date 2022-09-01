import routes from "src/routes";

export function getNextRoute(
  currentStep: number,
  brokerageId: string,
  prospectId: string,
  recipeId: string
) {
  switch (currentStep) {
    case 1:
      return routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.pharmacyBenefitManager.getValue(
        brokerageId,
        prospectId,
        recipeId
      );
    case 2:
      return routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.costContainmentVendors.getValue(
        brokerageId,
        prospectId,
        recipeId
      );
    case 3:
      return routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.tpa.getValue(
        brokerageId,
        prospectId,
        recipeId
      );
    case 4:
      return routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.plansets.getValue(
        brokerageId,
        prospectId,
        recipeId,
        ""
      );
    case 5:
      return routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.expenses.getValue(
        brokerageId,
        prospectId,
        recipeId
      );
    case 6:
      return routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.stopLoss.getValue(
        brokerageId,
        prospectId,
        recipeId
      );
  }
}

export function getPreviousRoute(
  currentStep: number,
  brokerageId: string,
  prospectId: string,
  recipeId: string
) {
  switch (currentStep) {
    case 2:
      return routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.network.getValue(
        brokerageId,
        prospectId,
        recipeId
      );
    case 3:
      return routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.pharmacyBenefitManager.getValue(
        brokerageId,
        prospectId,
        recipeId
      );
    case 4:
      return routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.costContainmentVendors.getValue(
        brokerageId,
        prospectId,
        recipeId
      );
    case 5:
      return routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.tpa.getValue(
        brokerageId,
        prospectId,
        recipeId
      );
    case 6:
      return routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.plansets.getValue(
        brokerageId,
        prospectId,
        recipeId,
        ""
      );
    case 7:
      return routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.expenses.getValue(
        brokerageId,
        prospectId,
        recipeId
      );
  }
}

import { get, isEmpty } from "lodash";
import {
  addStopLossContract,
  updateOrgRecipeStopLoss,
} from "src/api/orgRecipes";
import {
  aggregateAttachmentPoints,
  contractTypes,
  specificDeductibles,
} from "src/constants/quote";
import { emptyStopLossContract } from "src/constants/stopLoss";
import { IOrgRecipes, IStopLoss } from "src/interfaces/orgRecipes";
import routes from "src/routes";
import { IOption } from "src/types";

export interface IStopLossInForm
  extends Omit<
    IStopLoss,
    "aggregate_attachment_percent" | "contract_length" | "specific_deductible"
  > {
  aggregate_attachment_percent: IOption;
  contract_length: IOption;
  specific_deductible: IOption;
}

export function getFormDefaultValue(
  orgRecipe?: IOrgRecipes,
  stopLossId?: string
) {
  let currentStopLoss;
  if (!isEmpty(orgRecipe) && stopLossId) {
    const stop_loss_contracts = get(orgRecipe, "stop_loss_contracts", []);
    currentStopLoss =
      stop_loss_contracts.find((stopLoss) => stopLoss.id === stopLossId) || {};
  } else {
    currentStopLoss = emptyStopLossContract;
  }

  const {
    specific_deductible,
    aggregate_attachment_percent,
    contract_length,
  } = currentStopLoss;
  const specificDeductibleOption = specificDeductibles.find(
    (item) => item.value === specific_deductible
  );
  const aggregateAttachmentPercentOption = aggregateAttachmentPoints.find(
    (item) => item.value === aggregate_attachment_percent
  );
  const contractTypeOption = contractTypes.find(
    (item) => item.value === contract_length
  );

  let generateNameFromVariables = false;
  if (!currentStopLoss.name) {
    generateNameFromVariables = true;
  }

  const currentStopLossFormData = {
    ...currentStopLoss,
    specific_deductible: specificDeductibleOption,
    aggregate_attachment_percent: aggregateAttachmentPercentOption,
    contract_length: contractTypeOption,
  };

  return {
    currentStopLoss: currentStopLossFormData,
    generateNameFromVariables,
    has_aggregating_specific: false,
  };
}

export async function saveStopLossFunction(orgId, recipeId, stopLossContract) {
  const stopLossData = formatFormData(stopLossContract);
  if (stopLossContract.id) {
    //modifying exisitng option
    const updatedStopLoss = await updateOrgRecipeStopLoss(
      orgId,
      recipeId,
      stopLossContract.id,
      stopLossData
    );
    return updatedStopLoss;
  }
  //creatig new optoin
  const newStopLoss = await addStopLossContract(orgId, recipeId, stopLossData);
  return newStopLoss;
}

export function formatFormData(stopLossContract: IStopLossInForm) {
  return {
    ...stopLossContract,
    aggregate_attachment_percent:
      stopLossContract.aggregate_attachment_percent.value,
    contract_length: stopLossContract.contract_length.value,
    specific_deductible: stopLossContract.specific_deductible.value,
  } as IStopLoss;
}

export function handleRedirect(
  brokerageId,
  prospectId,
  recipeId,
  stopLossId = "",
  history,
  pathname
) {
  const isOnboarding = pathname.includes("onboarding");
  if (isOnboarding) {
    history.push(
      routes.dashboard.god.brokerages.prospects.onboarding.programBuild.recipe.stopLoss.getValue(
        brokerageId,
        prospectId,
        recipeId,
        stopLossId
      )
    );
  } else {
    history.push(
      routes.dashboard.brokerage.brokerageId.prospects.org.prospectId.recipe.recipeId.stopLoss.getValue(
        brokerageId,
        prospectId,
        recipeId,
        stopLossId
      )
    );
  }
}

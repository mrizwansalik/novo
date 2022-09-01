import get from "lodash/get";
import { createNetworkIngredient } from "src/api/network";
import { INetworkIngredient } from "src/interfaces/network";
import ProgramBuildStore from "src/stores/programBuildStore";
import { GetValues, Reset } from "src/types/hookForm";
import { parseCommaStringToNumber } from "src/utils/form";

export async function handleSolutionPartnersForm(
  getValues: GetValues,
  reset: Reset,
  programBuildStore: ProgramBuildStore,
  prospectId: string,
  recipeId: string
): Promise<void> {
  try {
    programBuildStore.setLoadingProgress(0);
    const formValues = getValues();
    const networkIngredient: INetworkIngredient = {
      description: "",
      name: get(formValues, "name", ""),
      sub_type: get(formValues, "subNetworkType.value", ""),
      type: "cost_containment_vendor",
      default_fee: {
        amount_children: parseCommaStringToNumber(
          get(formValues, "amountChildren", "")
        ),
        amount_employee: parseCommaStringToNumber(
          get(formValues, "amountEmployee", "")
        ),
        amount_family: parseCommaStringToNumber(
          get(formValues, "amountFamily", "")
        ),
        amount_number: parseCommaStringToNumber(
          get(formValues, "amountNumber", "")
        ),
        amount_spouse: parseCommaStringToNumber(
          get(formValues, "amountSpouse", "")
        ),
        amount_text: get(formValues, "amountCustom", ""),
        amount_type: get(formValues, "subNetworkAmountType.value", ""),
        fee_type: "cost_containment_vendor",
        group_size_amount: [],
        name: get(formValues, "name", ""),
      },
    } as INetworkIngredient;
    await createNetworkIngredient(prospectId, networkIngredient);
    programBuildStore.fetchCostContainmentVendors(prospectId);
    programBuildStore.fetchOrgRecipe(prospectId, recipeId);
    reset({});
    programBuildStore.setLoadingProgress(100);
  } catch (error) {
    programBuildStore.setLoadingProgress(0);
  }
}

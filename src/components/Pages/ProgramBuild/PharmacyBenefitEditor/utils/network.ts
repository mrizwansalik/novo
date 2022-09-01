import get from "lodash/get";
import { createPharmacyBenefitManager } from "src/api/network";
import { NetworkCategory } from "src/constants";
import { IPharmacyBenefitManager } from "src/interfaces/network";
import ProgramBuildStore from "src/stores/programBuildStore";
import { GetValues, Reset } from "src/types/hookForm";
import { parseCommaStringToNumber } from "src/utils/form";

export async function handleNetworkForm(
  getValues: GetValues,
  reset: Reset,
  programBuildStore: ProgramBuildStore,
  prospectId: string,
  recipeId: string
): Promise<void> {
  try {
    programBuildStore.setLoadingProgress(0);
    const formValues = getValues();
    const pharmacyBenefitManager: IPharmacyBenefitManager = {
      address: "",
      blog: "",
      city: null,
      name: get(formValues, "name", ""),
      default_fee: {
        amount_children: 0,
        amount_employee: 0,
        amount_family: 0,
        amount_number: parseCommaStringToNumber(
          get(formValues, "amountNumber", "")
        ),
        amount_spouse: 0,
        amount_text: "",
        amount_type: get(formValues, "subNetworkAmountType.value", ""),
        fee_type: NetworkCategory.PHARMACY_BENEFIT_MANAGER,
        group_size_amount: [],
        name: get(formValues, "name", ""),
      },
      desc: "",
      facebook: "",
      fax: "",
      filestack_picture: "",
      is_standard: false,
      linkedin: "",
      phone: "",
      picture: "",
      postal: "",
      suite_number: "",
      twitter: "",
      website: "",
    } as IPharmacyBenefitManager;
    await createPharmacyBenefitManager(prospectId, pharmacyBenefitManager);
    await programBuildStore.fetchOrgRecipe(prospectId, recipeId);
    programBuildStore.fetchPharmacyBenefitManagers(prospectId);
    reset({});
    programBuildStore.setLoadingProgress(100);
  } catch (error) {
    programBuildStore.setLoadingProgress(0);
  }
}

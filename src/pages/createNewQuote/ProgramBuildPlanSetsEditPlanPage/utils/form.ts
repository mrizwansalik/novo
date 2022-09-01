import get from "lodash/get";
import { toast } from "react-toastify";
import { createOrgRecipesTPAs, deleteOrgRecipesTPAs } from "src/api/network";
import { ITpa } from "src/interfaces/benefit";
import { IOrgRecipesWithTPAs } from "src/interfaces/network";
import { GetValues } from "src/types/hookForm";
import ProgramBuildStore from "../../../../stores/programBuildStore";
import { ThirdPartyAdministratorFormValues } from "../constants";

export async function handleSelectTPA(
  programBuildStore: ProgramBuildStore,
  tpa: ITpa,
  getValues: GetValues,
  tpaOrder: number,
  orgId: string,
  prospectId: string,
  recipeId: string,
  isChecked: boolean
): Promise<void> {
  programBuildStore.setLoadingProgress(10);
  const vendorSelects =
    getValues(ThirdPartyAdministratorFormValues.VENDOR_SELECT)[tpaOrder] || {};

  const vendorSelectKeys =
    typeof vendorSelects === "object" ? Object.keys(vendorSelects) : [];

  if (isChecked) {
    if (!orgId || !prospectId || !recipeId || !tpa?.id) {
      toast.error("Error while select TPAs, please contact us!");
      return;
    }

    const selectedNetworkIngredients = Array.isArray(vendorSelectKeys)
      ? vendorSelectKeys
          ?.filter((vendorSelectKey: string) => vendorSelects[vendorSelectKey])
          ?.map((vendorSelectKey: string) =>
            get(vendorSelectKey?.split("+join+"), "[1]", "")
          )
      : [];

    const orgRecipesTPAs: IOrgRecipesWithTPAs = {
      brokerage_id: orgId,
      network_ingredients: selectedNetworkIngredients,
      tpa: tpa?.id,
    };
    await createOrgRecipesTPAs(prospectId, recipeId, orgRecipesTPAs);
    programBuildStore.setLoadingProgress(50);
    programBuildStore.fetchOrgRecipe(prospectId, recipeId);
    programBuildStore.setLoadingProgress(100);
    return;
  }

  if (!isChecked) {
    const foundTPA = programBuildStore?.orgRecipe?.tpas?.find(
      (savedTpas) => savedTpas?.tpa?.id === tpa?.id
    );

    if (!prospectId || !recipeId || !foundTPA?.id) {
      toast.error("Error while select TPAs, please contact us!");
      return;
    }
    await deleteOrgRecipesTPAs(prospectId, recipeId, foundTPA?.id);
    programBuildStore.setLoadingProgress(50);
    programBuildStore.fetchOrgRecipe(prospectId, recipeId);
    programBuildStore.setLoadingProgress(100);
  }
}

export async function handleSelectSubTPA(
  programBuildStore: ProgramBuildStore,
  tpa: ITpa,
  getValues: GetValues,
  tpaOrder: number,
  orgId: string,
  prospectId: string,
  recipeId: string
): Promise<void> {
  programBuildStore.setLoadingProgress(10);
  const vendorSelects =
    getValues(ThirdPartyAdministratorFormValues.VENDOR_SELECT)[tpaOrder] || {};

  const vendorSelectKeys =
    typeof vendorSelects === "object" ? Object.keys(vendorSelects) : [];

  if (!orgId || !prospectId || !recipeId || !tpa?.id) {
    toast.error("Error while select TPAs, please contact us!");
    return;
  }

  const selectedNetworkIngredients = Array.isArray(vendorSelectKeys)
    ? vendorSelectKeys
        ?.filter((vendorSelectKey: string) => vendorSelects[vendorSelectKey])
        ?.map((vendorSelectKey: string) =>
          get(vendorSelectKey?.split("+join+"), "[1]", "")
        )
    : [];

  const orgRecipesTPAs: IOrgRecipesWithTPAs = {
    brokerage_id: orgId,
    network_ingredients: selectedNetworkIngredients,
    tpa: tpa?.id,
  };
  createOrgRecipesTPAs(prospectId, recipeId, orgRecipesTPAs);
  programBuildStore.setLoadingProgress(50);
  programBuildStore.setLoadingProgress(100);
}

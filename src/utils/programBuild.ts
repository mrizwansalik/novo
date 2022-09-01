import get from "lodash/get";
import { createBenefitTPAs } from "src/api/network";
import { createOrgRecipes, getOrgRecipes } from "src/api/orgRecipes";
import { NetworkCategory } from "src/constants";
import { IOption } from "src/interfaces/common";
import { ISubNetwork, ISubNetworksTree } from "src/interfaces/network";
import { INetworkIngredient } from "src/interfaces/network";
import ProgramBuildStore from "src/stores/programBuildStore";
import { GetValues, Reset } from "src/types/hookForm";
import { parseCommaStringToNumber } from "src/utils/form";

export async function syncOrgRecipes(prospectId: string): Promise<void> {
  const orgRecipes = await getOrgRecipes(prospectId);
  if (Array.isArray(orgRecipes) && orgRecipes.length > 0) return;
  createOrgRecipes(prospectId);
}

export function getNetworkCategoryOptions(): IOption[] {
  const options: IOption[] = [
    {
      label: "All Categories",
      value: NetworkCategory.ALL,
    },
    {
      label: "Network",
      value: NetworkCategory.SUB_NETWORK,
    },
    {
      label: "Reference Based Pricing",
      value: NetworkCategory.REFERENCE_BASED_PRICING,
    },
  ];

  return options;
}

export function getSolutionPartnersOptions(): IOption[] {
  const options: IOption[] = [
    {
      label: "All Categories",
      value: NetworkCategory.ALL,
    },
    {
      label: "Direct Primary Care",
      value: NetworkCategory.DIRECT_PRIMARY_CARE,
    },
    {
      label: "Navigation",
      value: NetworkCategory.NAVIGATION,
    },
    {
      label: "Medical Management",
      value: NetworkCategory.MEDICAL_MANAGEMENT,
    },
    {
      label: "Virtual Primary Care",
      value: NetworkCategory.VIRTUAL_PRIMARY_CARE,
    },
    {
      label: "Tele Health",
      value: NetworkCategory.TELE_HEALTH,
    },
    {
      label: "Rx Solutions",
      value: NetworkCategory.RX_SOLUTIONS,
    },
    {
      label: "Bundled Services",
      value: NetworkCategory.BUNDLED_SERVICES,
    },
    {
      label: "Misc",
      value: NetworkCategory.MISC,
    },
  ];

  return options;
}

export function buildSubNetworksTree(
  subNetworks: ISubNetwork[],
  searchKeyword: string = ""
): ISubNetworksTree {
  const subNetworkTypes: string[] = [
    NetworkCategory.REFERENCE_BASED_PRICING,
    NetworkCategory.SUB_NETWORK,
  ];

  const newSubNetworkTree: ISubNetworksTree = subNetworkTypes.reduce(
    (subNetworkTree: ISubNetworksTree, networkType: string) => {
      const filteredSubNetworks: ISubNetwork[] = Array.isArray(subNetworks)
        ? subNetworks?.filter(
            (subNetwork: ISubNetwork) =>
              subNetwork?.type === networkType &&
              subNetwork?.name
                ?.toLowerCase()
                ?.includes(searchKeyword?.toLowerCase())
          )
        : [];
      return { ...subNetworkTree, [networkType]: filteredSubNetworks };
    },
    {}
  );

  return newSubNetworkTree;
}

export function buildSubPharmacyTree(
  subNetworks: ISubNetwork[],
  searchKeyword: string = ""
): ISubNetworksTree {
  const subNetworkTypes: string[] = [NetworkCategory.PHARMACY_BENEFIT_MANAGER];

  const newSubNetworkTree: ISubNetworksTree = subNetworkTypes.reduce(
    (subNetworkTree: ISubNetworksTree, networkType: string) => {
      const filteredSubNetworks: ISubNetwork[] = Array.isArray(subNetworks)
        ? subNetworks?.filter(
            (subNetwork: ISubNetwork) =>
              subNetwork?.type === networkType &&
              subNetwork?.name
                ?.toLowerCase()
                ?.includes(searchKeyword?.toLowerCase())
          )
        : [];
      return { ...subNetworkTree, [networkType]: filteredSubNetworks };
    },
    {}
  );

  return newSubNetworkTree;
}

export function buildSubSolutionPartnersTree(
  subNetworks: ISubNetwork[],
  searchKeyword: string = ""
): ISubNetworksTree {
  const subNetworkTypes: string[] = [
    NetworkCategory.DIRECT_PRIMARY_CARE,
    NetworkCategory.NAVIGATION,
    NetworkCategory.MEDICAL_MANAGEMENT,
    NetworkCategory.VIRTUAL_PRIMARY_CARE,
    NetworkCategory.TELE_HEALTH,
    NetworkCategory.RX_SOLUTIONS,
    NetworkCategory.BUNDLED_SERVICES,
    NetworkCategory.MISC,
  ];

  const newSubNetworkTree: ISubNetworksTree = subNetworkTypes.reduce(
    (subNetworkTree: ISubNetworksTree, networkType: string) => {
      const filteredSubNetworks: ISubNetwork[] = Array.isArray(subNetworks)
        ? subNetworks?.filter(
            (subNetwork: ISubNetwork) =>
              subNetwork?.sub_type === networkType &&
              subNetwork?.name
                ?.toLowerCase()
                ?.includes(searchKeyword?.toLowerCase())
          )
        : [];
      return { ...subNetworkTree, [networkType]: filteredSubNetworks };
    },
    {}
  );

  return newSubNetworkTree;
}

export async function handleTPAForm(
  getValues: GetValues,
  reset: Reset,
  programBuildStore: ProgramBuildStore,
  orgId: string,
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
      type: get(formValues, "subNetworkType.value", ""),
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
        fee_type: get(formValues, "subNetworkType.value", ""),
        group_size_amount: [],
        name: get(formValues, "name", ""),
      },
    } as INetworkIngredient;
    await createBenefitTPAs(orgId, networkIngredient);
    programBuildStore.fetchThirdPartyAdministrators(orgId);
    programBuildStore.fetchNetworkIngredientWithTPAs(orgId);
    programBuildStore.fetchOrgRecipe(prospectId, recipeId);
    reset({});
    programBuildStore.setLoadingProgress(100);
  } catch (error) {
    programBuildStore.setLoadingProgress(0);
  }
}

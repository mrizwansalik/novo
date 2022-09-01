import { networkCategories, NetworkCategory } from "src/constants";
import { ITpa } from "src/interfaces/benefit";
import ProgramBuildStore from "src/stores/programBuildStore";

export function syncThirdPartyAdministrators(
  programBuildStore: ProgramBuildStore,
  orgId: string
) {
  if (orgId) {
    programBuildStore.fetchThirdPartyAdministrators(orgId);
    programBuildStore.fetchNetworkIngredientWithTPAs(orgId);
  }
}

export function pickNetworkGroupByCategory(
  networkCategory: NetworkCategory
): NetworkCategory {
  const groups = [
    {
      groupId: NetworkCategory.PROVIDER_ACCESS,
      categories: [
        NetworkCategory.SUB_NETWORK,
        NetworkCategory.REFERENCE_BASED_PRICING,
      ],
    },
    {
      groupId: NetworkCategory.PHARMACY_BENEFIT_MANAGER,
      categories: [NetworkCategory.PHARMACY_BENEFIT_MANAGER],
    },
    {
      groupId: NetworkCategory.NAVIGATION,
      categories: [NetworkCategory.NAVIGATION],
    },
    {
      groupId: NetworkCategory.MEDICAL_MANAGEMENT,
      categories: [NetworkCategory.MEDICAL_MANAGEMENT],
    },
    {
      groupId: NetworkCategory.VIRTUAL_PRIMARY_CARE,
      categories: [NetworkCategory.VIRTUAL_PRIMARY_CARE],
    },
    {
      groupId: NetworkCategory.TELE_HEALTH,
      categories: [NetworkCategory.TELE_HEALTH],
    },
    {
      groupId: NetworkCategory.RX_SOLUTIONS,
      categories: [NetworkCategory.RX_SOLUTIONS],
    },
    {
      groupId: NetworkCategory.BUNDLED_SERVICES,
      categories: [NetworkCategory.BUNDLED_SERVICES],
    },
    {
      groupId: NetworkCategory.MISC,
      categories: [NetworkCategory.MISC],
    },
  ];

  const foundGroup = groups?.find((group) =>
    group?.categories?.includes(networkCategory)
  );

  return foundGroup?.groupId;
}

export const pickNetworkGroupByCategoryWorker = (networkCategory) => {
  enum NetworkCategoryEnum {
    PROVIDER_ACCESS = "provider_access",
    SUB_NETWORK = "sub_network",
    REFERENCE_BASED_PRICING = "reference_based_pricing",
    PHARMACY_BENEFIT_MANAGER = "pharmacy_benefit_manager",
    SOLUTION_PARTNER = "solution_partner",
    DIRECT_PRIMARY_CARE = "direct_primary_care",
    NAVIGATION = "navigation",
    MEDICAL_MANAGEMENT = "medical_management",
    VIRTUAL_PRIMARY_CARE = "virtual_primary_care",
    TELE_HEALTH = "tele_health",
    RX_SOLUTIONS = "rx_solutions",
    BUNDLED_SERVICES = "bundled_services",
    MISC = "misc",
    ALL = "all",
  }

  const groups = [
    {
      groupId: NetworkCategoryEnum.PROVIDER_ACCESS,
      categories: [
        NetworkCategoryEnum.SUB_NETWORK,
        NetworkCategoryEnum.REFERENCE_BASED_PRICING,
      ],
    },
    {
      groupId: NetworkCategoryEnum.PHARMACY_BENEFIT_MANAGER,
      categories: [NetworkCategoryEnum.PHARMACY_BENEFIT_MANAGER],
    },
    {
      groupId: NetworkCategoryEnum.NAVIGATION,
      categories: [NetworkCategoryEnum.NAVIGATION],
    },
    {
      groupId: NetworkCategoryEnum.MEDICAL_MANAGEMENT,
      categories: [NetworkCategoryEnum.MEDICAL_MANAGEMENT],
    },
    {
      groupId: NetworkCategoryEnum.VIRTUAL_PRIMARY_CARE,
      categories: [NetworkCategoryEnum.VIRTUAL_PRIMARY_CARE],
    },
    {
      groupId: NetworkCategoryEnum.TELE_HEALTH,
      categories: [NetworkCategoryEnum.TELE_HEALTH],
    },
    {
      groupId: NetworkCategoryEnum.RX_SOLUTIONS,
      categories: [NetworkCategoryEnum.RX_SOLUTIONS],
    },
    {
      groupId: NetworkCategoryEnum.BUNDLED_SERVICES,
      categories: [NetworkCategoryEnum.BUNDLED_SERVICES],
    },
    {
      groupId: NetworkCategoryEnum.MISC,
      categories: [NetworkCategoryEnum.MISC],
    },
  ];

  const foundGroup = groups?.find((group) =>
    group?.categories?.includes(networkCategory as NetworkCategoryEnum)
  );

  return foundGroup?.groupId;
};

export function getNetworkCategoryLabel(category: NetworkCategory): string {
  const categoryName = networkCategories?.find(
    (networkCategory) => networkCategory?.value === category
  )?.name;

  return categoryName;
}

export function checkSelectedTPAs(
  programBuildStore: ProgramBuildStore,
  tpa: ITpa
): boolean {
  const foundTPA = programBuildStore?.orgRecipe?.tpas?.find(
    (savedTpas) => savedTpas?.tpa?.id === tpa?.id
  );
  return !!foundTPA;
}

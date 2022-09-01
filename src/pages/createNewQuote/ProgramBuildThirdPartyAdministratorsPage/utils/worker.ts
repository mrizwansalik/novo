//INFO: disable max-lines for webworker.
/* eslint-disable max-lines */

import { ITpa } from "src/interfaces/benefit";
import { INetworkIngredientWithTPAs } from "src/interfaces/network";

export const extractProgramByCategoryWorker = (
  networkIngredientWithTPAs: INetworkIngredientWithTPAs[] = [],
  tpasSelectedOptions: Record<string, boolean> = {},
  tpa: ITpa
) => {
  enum NetworkCategory {
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

  enum NetworkTPAType {
    OPTIONAL = "optional",
    MANDATORY = "mandatory",
    DEFAULT = "default",
    NONE = "none",
  }

  const providerAccessNetworkCategories: NetworkCategory[] = [
    NetworkCategory.PROVIDER_ACCESS,
  ];

  const pbmTPAsNetworkCategories: NetworkCategory[] = [
    NetworkCategory.PHARMACY_BENEFIT_MANAGER,
  ];

  const requiredNetworkCategories: NetworkCategory[] = [
    NetworkCategory.PROVIDER_ACCESS,
    NetworkCategory.PHARMACY_BENEFIT_MANAGER,
  ];

  const commonNetworkCategories: NetworkCategory[] = [
    NetworkCategory.NAVIGATION,
    NetworkCategory.MEDICAL_MANAGEMENT,
    NetworkCategory.VIRTUAL_PRIMARY_CARE,
    NetworkCategory.TELE_HEALTH,
    NetworkCategory.RX_SOLUTIONS,
    NetworkCategory.BUNDLED_SERVICES,
    NetworkCategory.MISC,
  ];

  function pickNetworkGroupByCategory(
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

  function isMatchCategories(
    programCategories: NetworkCategory[],
    networkIngredientWithTPA: INetworkIngredientWithTPAs
  ): boolean {
    const convertedType = programCategories?.includes(
      pickNetworkGroupByCategory(networkIngredientWithTPA?.type)
    );
    const convertedSubType = programCategories?.includes(
      pickNetworkGroupByCategory(
        networkIngredientWithTPA?.sub_type as NetworkCategory
      )
    );
    return convertedType || convertedSubType;
  }

  if (!Array.isArray(networkIngredientWithTPAs)) return [];
  let requiredTpas: Record<string, INetworkIngredientWithTPAs[]> = {};
  let mandatoryTpas: Record<string, INetworkIngredientWithTPAs[]> = {};
  let optionalTpas: Record<string, INetworkIngredientWithTPAs[]> = {};
  let providerAccessTpas: Record<string, INetworkIngredientWithTPAs[]> = {};
  let pbmTpas: Record<string, INetworkIngredientWithTPAs[]> = {};
  let rawProviderAccessTpas: Record<string, INetworkIngredientWithTPAs[]> = {};
  let rawPbmTpas: Record<string, INetworkIngredientWithTPAs[]> = {};

  networkIngredientWithTPAs?.forEach(
    (networkIngredientWithTPA: INetworkIngredientWithTPAs) => {
      const tpas = networkIngredientWithTPA?.tpas || [];
      tpas?.forEach((tpaDetail: ITpa) => {
        const networkCategory =
          pickNetworkGroupByCategory(
            networkIngredientWithTPA?.sub_type as NetworkCategory
          ) ?? pickNetworkGroupByCategory(networkIngredientWithTPA?.type);

        const isSelected =
          tpasSelectedOptions[
            `${tpa?.id}+join+${networkIngredientWithTPA?.id}`
          ];
        if (
          tpaDetail?.id === tpa?.id &&
          isSelected &&
          isMatchCategories(requiredNetworkCategories, networkIngredientWithTPA)
        ) {
          if (Array.isArray(requiredTpas[`${networkCategory}`])) {
            requiredTpas[`${networkCategory}`].push(networkIngredientWithTPA);
          } else {
            requiredTpas[`${networkCategory}`] = [networkIngredientWithTPA];
          }
        }

        if (
          tpaDetail?.id === tpa?.id &&
          isSelected &&
          isMatchCategories(
            commonNetworkCategories,
            networkIngredientWithTPA
          ) &&
          NetworkTPAType.MANDATORY === tpaDetail?.type
        ) {
          if (Array.isArray(mandatoryTpas[`${networkCategory}`])) {
            mandatoryTpas[`${networkCategory}`].push(networkIngredientWithTPA);
          } else {
            mandatoryTpas[`${networkCategory}`] = [networkIngredientWithTPA];
          }
        }

        if (
          tpaDetail?.id === tpa?.id &&
          isSelected &&
          isMatchCategories(
            commonNetworkCategories,
            networkIngredientWithTPA
          ) &&
          NetworkTPAType.OPTIONAL === tpaDetail?.type
        ) {
          if (Array.isArray(optionalTpas[`${networkCategory}`])) {
            optionalTpas[`${networkCategory}`].push(networkIngredientWithTPA);
          } else {
            optionalTpas[`${networkCategory}`] = [networkIngredientWithTPA];
          }
        }

        if (
          tpaDetail?.id === tpa?.id &&
          isSelected &&
          isMatchCategories(
            providerAccessNetworkCategories,
            networkIngredientWithTPA
          )
        ) {
          if (Array.isArray(providerAccessTpas[`${networkCategory}`])) {
            providerAccessTpas[`${networkCategory}`].push(
              networkIngredientWithTPA
            );
          } else {
            providerAccessTpas[`${networkCategory}`] = [
              networkIngredientWithTPA,
            ];
          }
        }

        if (
          tpaDetail?.id === tpa?.id &&
          isSelected &&
          isMatchCategories(pbmTPAsNetworkCategories, networkIngredientWithTPA)
        ) {
          if (Array.isArray(pbmTpas[`${networkCategory}`])) {
            pbmTpas[`${networkCategory}`].push(networkIngredientWithTPA);
          } else {
            pbmTpas[`${networkCategory}`] = [networkIngredientWithTPA];
          }
        }

        if (
          tpaDetail?.id === tpa?.id &&
          isMatchCategories(
            providerAccessNetworkCategories,
            networkIngredientWithTPA
          )
        ) {
          if (Array.isArray(rawProviderAccessTpas[`${networkCategory}`])) {
            rawProviderAccessTpas[`${networkCategory}`].push(
              networkIngredientWithTPA
            );
          } else {
            rawProviderAccessTpas[`${networkCategory}`] = [
              networkIngredientWithTPA,
            ];
          }
        }

        if (
          tpaDetail?.id === tpa?.id &&
          isMatchCategories(pbmTPAsNetworkCategories, networkIngredientWithTPA)
        ) {
          if (Array.isArray(rawPbmTpas[`${networkCategory}`])) {
            rawPbmTpas[`${networkCategory}`].push(networkIngredientWithTPA);
          } else {
            rawPbmTpas[`${networkCategory}`] = [networkIngredientWithTPA];
          }
        }
      });
    }
  );

  return {
    requiredTpas,
    mandatoryTpas,
    optionalTpas,
    providerAccessTpas,
    pbmTpas,
    rawProviderAccessTpas,
    rawPbmTpas,
  };
};

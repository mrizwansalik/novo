import { NetworkCategory, NetworkTPAType } from "src/constants";
import { ITpa } from "src/interfaces/benefit";
import { IOption } from "src/interfaces/common";
import { INetworkIngredientWithTPAs } from "src/interfaces/network";
import OrgStore from "src/stores/orgStore";
import ProgramBuildStore from "src/stores/programBuildStore";
import { pickNetworkGroupByCategory } from "./networks";

export function getNetworkCategoryOptions(): IOption[] {
  const options: IOption[] = [
    {
      label: "Network",
      value: NetworkCategory.SUB_NETWORK,
    },
    {
      label: "Reference Based Pricing",
      value: NetworkCategory.REFERENCE_BASED_PRICING,
    },
    {
      label: "All Categories",
      value: NetworkCategory.ALL,
    },
  ];
  return options;
}

export function getThirdPartyAdministratorOptions(): IOption[] {
  const options: IOption[] = [
    {
      label: "Provider Access",
      value: NetworkCategory.PROVIDER_ACCESS,
    },
    {
      label: "PBM",
      value: NetworkCategory.PHARMACY_BENEFIT_MANAGER,
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
      label: "VPC",
      value: NetworkCategory.VIRTUAL_PRIMARY_CARE,
    },
    {
      label: "Telehealth",
      value: NetworkCategory.TELE_HEALTH,
    },
    {
      label: "Rx-Solutions",
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

export function extractProgramByCategory(
  networkIngredientWithTPAs: INetworkIngredientWithTPAs[] = [],
  tpasSelectedOptions: Record<string, boolean> = {},
  tpa: ITpa,
  programCategories: NetworkCategory[],
  skipCheckCategory?: boolean,
  networkTPATypes?: NetworkTPAType[],
  checkSelected?: boolean
): INetworkIngredientWithTPAs[] {
  if (!Array.isArray(networkIngredientWithTPAs)) return [];
  const filteredTpas: INetworkIngredientWithTPAs[] = networkIngredientWithTPAs?.filter(
    (networkIngredientWithTPA: INetworkIngredientWithTPAs) => {
      const tpas = networkIngredientWithTPA?.tpas || [];
      const foundTpa = tpas?.find((tpaDetail: ITpa) => {
        if (!Array.isArray(networkTPATypes)) {
          return tpaDetail?.id === tpa?.id;
        }

        const isSelected = checkSelected
          ? tpasSelectedOptions[
              `${tpa?.id}+join+${networkIngredientWithTPA?.id}`
            ]
          : true;

        return (
          tpaDetail?.id === tpa?.id &&
          networkTPATypes?.includes(tpaDetail?.type) &&
          isSelected
        );
      });

      const convertedType = programCategories?.includes(
        pickNetworkGroupByCategory(networkIngredientWithTPA?.type)
      );

      const convertedSubType = programCategories?.includes(
        pickNetworkGroupByCategory(
          networkIngredientWithTPA?.sub_type as NetworkCategory
        )
      );

      return (
        !!foundTpa && (convertedType || convertedSubType || skipCheckCategory)
      );
    }
  );
  return filteredTpas;
}

export function countProgramByCategory(
  programBuildStore: ProgramBuildStore,
  tpa: ITpa,
  programCategories: NetworkCategory[]
): number {
  const networkIngredientWithTPAs: INetworkIngredientWithTPAs[] =
    programBuildStore?.networkIngredientWithTPAs || [];
  if (!Array.isArray(networkIngredientWithTPAs)) {
    return 0;
  }

  const filteredTpas: INetworkIngredientWithTPAs[] = networkIngredientWithTPAs?.filter(
    (networkIngredientWithTPA: INetworkIngredientWithTPAs) => {
      const tpas = networkIngredientWithTPA?.tpas || [];
      const foundTpa = tpas?.find(
        (tpaDetail: ITpa) => tpaDetail?.id === tpa?.id
      );

      const convertedType = programCategories?.includes(
        pickNetworkGroupByCategory(networkIngredientWithTPA?.type)
      );

      const convertedSubType = programCategories?.includes(
        pickNetworkGroupByCategory(
          networkIngredientWithTPA?.sub_type as NetworkCategory
        )
      );

      return !!foundTpa && (convertedType || convertedSubType);
    }
  );
  return filteredTpas?.length;
}

export function countTotalProgramByCategory(
  programBuildStore: ProgramBuildStore,
  orgStore: OrgStore,
  programCategories: NetworkCategory[]
): number {
  const networkIngredientWithTPAs: INetworkIngredientWithTPAs[] =
    programBuildStore?.networkIngredientWithTPAs || [];
  const tpas: ITpa[] = programBuildStore?.tpas || [];
  if (!Array.isArray(networkIngredientWithTPAs)) {
    return 0;
  }

  const filteredTpas: INetworkIngredientWithTPAs[] = networkIngredientWithTPAs?.filter(
    (networkIngredientWithTPA: INetworkIngredientWithTPAs) => {
      const foundNetworkIngredientWithTPA = tpas?.find((tpaDetail: ITpa) =>
        networkIngredientWithTPA?.tpas?.find(
          (ingredientWithTPA: ITpa) => ingredientWithTPA?.id === tpaDetail?.id
        )
      );

      const convertedType = programCategories?.includes(
        pickNetworkGroupByCategory(networkIngredientWithTPA?.type)
      );

      const convertedSubType = programCategories?.includes(
        pickNetworkGroupByCategory(
          networkIngredientWithTPA?.sub_type as NetworkCategory
        )
      );

      const validProgram: boolean =
        foundNetworkIngredientWithTPA?.can_customize_program;

      const validState: boolean =
        foundNetworkIngredientWithTPA?.valid_states?.length > 0
          ? foundNetworkIngredientWithTPA?.valid_states?.includes(
              orgStore?.orgDetail?.state_abbreviation
            )
          : true;

      return validProgram && validState && (convertedType || convertedSubType);
    }
  );
  return filteredTpas?.length;
}

export function getNetworkTpaType(tpas: ITpa[]): NetworkTPAType {
  let isMandatory: boolean = false;
  let isDefault: boolean = false;
  if (Array.isArray(tpas)) {
    tpas?.forEach((tpa: ITpa) => {
      if (tpa?.type === NetworkTPAType.MANDATORY) {
        isMandatory = true;
      }
      if (tpa?.type === NetworkTPAType.DEFAULT) {
        isDefault = true;
      }
    });
  }
  if (isMandatory) {
    return NetworkTPAType.MANDATORY;
  }
  if (isDefault) {
    return NetworkTPAType.DEFAULT;
  }
  return NetworkTPAType.OPTIONAL;
}

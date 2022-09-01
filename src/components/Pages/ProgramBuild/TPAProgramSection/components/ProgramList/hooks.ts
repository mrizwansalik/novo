import { useMemo } from "react";
import { NetworkCategory } from "src/constants";
import { countTotalProgramByCategory } from "src/pages/createNewQuote/ProgramBuildThirdPartyAdministratorsPage/utils";
import useStore from "src/utils/useStore";

export function useRenderValues(): [number, number, number] {
  const { programBuildStore, orgStore } = useStore();
  const totalOfProviderAccesses = useMemo(
    () =>
      countTotalProgramByCategory(programBuildStore, orgStore, [
        NetworkCategory.PROVIDER_ACCESS,
      ]),
    [programBuildStore?.networkIngredientWithTPAs]
  );

  const totalOfPharmacyBenefitManager = useMemo(
    () =>
      countTotalProgramByCategory(programBuildStore, orgStore, [
        NetworkCategory.PHARMACY_BENEFIT_MANAGER,
      ]),
    [programBuildStore?.networkIngredientWithTPAs]
  );

  const totalOfOthers = useMemo(
    () =>
      countTotalProgramByCategory(programBuildStore, orgStore, [
        NetworkCategory.NAVIGATION,
        NetworkCategory.MEDICAL_MANAGEMENT,
        NetworkCategory.VIRTUAL_PRIMARY_CARE,
        NetworkCategory.TELE_HEALTH,
        NetworkCategory.RX_SOLUTIONS,
        NetworkCategory.BUNDLED_SERVICES,
        NetworkCategory.MISC,
      ]),
    [programBuildStore?.networkIngredientWithTPAs]
  );

  return [
    totalOfProviderAccesses,
    totalOfPharmacyBenefitManager,
    totalOfOthers,
  ];
}

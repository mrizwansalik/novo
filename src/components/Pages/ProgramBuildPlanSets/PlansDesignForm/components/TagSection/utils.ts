import { IClaimsData } from "src/interfaces/benefit";
import { IPlanSet } from "src/interfaces/orgRecipes";
import CreateQuoteStore from "src/stores/createQuoteStore";

export function onSelectTag(
  createQuoteStore: CreateQuoteStore,
  planSet: IPlanSet
): void {
  createQuoteStore.setSelectedYear(planSet.name);
}

export function enableDelete(claimsData: IClaimsData[], year: number): boolean {
  const filteredClaims: IClaimsData[] = Array.isArray(claimsData)
    ? claimsData?.filter(
        (claimDetail: IClaimsData) => claimDetail?.year === year
      )
    : [];
  return filteredClaims?.length > 0;
}

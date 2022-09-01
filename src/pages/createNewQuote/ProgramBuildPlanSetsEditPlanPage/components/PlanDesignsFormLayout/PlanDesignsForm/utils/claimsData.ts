import { deleteClaimsData } from "src/api/benefits";
import { IClaimsData } from "src/interfaces/benefit";
import { getClaimsDetail } from "src/pages/createNewQuote/HealthClaimsDocumentsPage/utils";
import BenefitStore from "src/stores/benefitStore";

export async function handleRemoveClaimsData(
  benefitStore: BenefitStore,
  prospectId: string,
  year: number
): Promise<void> {
  const claimsData: IClaimsData[] = benefitStore?.claimsData || [];
  const foundClaimsData: IClaimsData = claimsData?.find(
    (claimsDetail: IClaimsData) => claimsDetail?.year === year
  );

  if (!foundClaimsData) return undefined;
  await deleteClaimsData(prospectId, foundClaimsData?.id);
  getClaimsDetail(benefitStore, prospectId);
}

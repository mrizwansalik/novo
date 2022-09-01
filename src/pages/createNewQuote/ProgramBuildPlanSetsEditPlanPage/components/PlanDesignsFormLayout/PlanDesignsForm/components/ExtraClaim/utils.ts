import moment from "moment";
import {
  createStopLossClaims,
  deleteStopLossClaims,
  updateStopLossClaims,
} from "src/api/benefits";
import { SpecialTime } from "src/constants";
import { IClaimsData, IStopLossClaims } from "src/interfaces/benefit";
import { ClaimsHistoryFormValues } from "src/pages/createNewQuote/HealthClaimsHistoryPage/constant";
import BenefitStore from "src/stores/benefitStore";
import CreateQuoteStore from "src/stores/createQuoteStore";

export function handleAdd(
  editMode: boolean,
  setEditMode: (editMode: boolean) => void,
  claimAmount: number,
  claimId: string,
  append: ({ amount: number, id: string }) => void
): void {
  append({ id: claimId, amount: Number(claimAmount) });
  setEditMode(!editMode);
}

export function handleCancel(
  editMode: boolean,
  setEditMode: (editMode: boolean) => void
): void {
  setEditMode(!editMode);
}

export function handleUpdate(
  setValue: (fieldName: string, values: IStopLossClaims[]) => void,
  fields: IStopLossClaims[],
  order: number,
  updateValue: number
): void {
  const newFields = fields?.map((field, index: number) => {
    if (order === index) {
      return {
        ...field,
        amount: Number(updateValue),
      };
    }
    return field;
  });
  setValue(ClaimsHistoryFormValues.LARGE_CLAIM_AMOUNT, newFields);
}

export async function handleCreateStopLossClaims(
  benefitStore: BenefitStore,
  createQuoteStore: CreateQuoteStore,
  prospectId: string,
  value: number
): Promise<IStopLossClaims> {
  const claimsData = benefitStore?.claimsData || [];
  const selectedYear =
    createQuoteStore?.selectedYear === SpecialTime.LAST_YEAR
      ? moment().subtract(1, "year").toDate().getFullYear()
      : Number(createQuoteStore?.selectedYear);

  const foundClaimsData =
    Array.isArray(claimsData) &&
    claimsData?.find(
      (claimsDataDetail: IClaimsData) =>
        claimsDataDetail?.year === Number(selectedYear)
    );

  const stopLossClaim: IStopLossClaims = {
    amount: value,
  } as IStopLossClaims;

  const createdStopLossClaim = await createStopLossClaims(
    prospectId,
    foundClaimsData?.id,
    stopLossClaim
  );

  return createdStopLossClaim;
}

export async function handleUpdateStopLossClaims(
  benefitStore: BenefitStore,
  createQuoteStore: CreateQuoteStore,
  stopLossClaimId: string,
  prospectId: string,
  value: number
): Promise<void> {
  const claimsData = benefitStore?.claimsData || [];
  const selectedYear =
    createQuoteStore?.selectedYear === SpecialTime.LAST_YEAR
      ? moment().subtract(1, "year").toDate().getFullYear()
      : Number(createQuoteStore?.selectedYear);

  const foundClaimsData =
    Array.isArray(claimsData) &&
    claimsData?.find(
      (claimsDataDetail: IClaimsData) =>
        claimsDataDetail?.year === Number(selectedYear)
    );

  const stopLossClaim: IStopLossClaims = {
    amount: Number(value),
  } as IStopLossClaims;

  await updateStopLossClaims(
    prospectId,
    foundClaimsData?.id,
    stopLossClaimId,
    stopLossClaim
  );
}

export async function handleDeleteStopLossClaims(
  benefitStore: BenefitStore,
  createQuoteStore: CreateQuoteStore,
  stopLossClaimId: string,
  prospectId: string
): Promise<void> {
  const claimsData = benefitStore?.claimsData || [];
  const selectedYear =
    createQuoteStore?.selectedYear === SpecialTime.LAST_YEAR
      ? moment().subtract(1, "year").toDate().getFullYear()
      : Number(createQuoteStore?.selectedYear);

  const foundClaimsData =
    Array.isArray(claimsData) &&
    claimsData?.find(
      (claimsDataDetail: IClaimsData) =>
        claimsDataDetail?.year === Number(selectedYear)
    );

  await deleteStopLossClaims(prospectId, foundClaimsData?.id, stopLossClaimId);
}

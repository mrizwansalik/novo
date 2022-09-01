import moment from "moment";
import { IClaimsData } from "src/interfaces/benefit";
import CreateQuoteStore from "src/stores/createQuoteStore";
import { IYearTag } from "./interfaces";

export function getYearTags(): IYearTag[] {
  const years: IYearTag[] = [
    {
      label: "New Plan Set",
      value: moment().subtract(1, "year").toDate().getFullYear(),
    },
    {
      label: moment().toDate().getFullYear().toString(),
      value: moment().toDate().getFullYear(),
    },
    {
      label: moment().subtract(1, "year").toDate().getFullYear().toString(),
      value: moment().subtract(1, "year").toDate().getFullYear(),
    },
    {
      label: moment().subtract(2, "year").toDate().getFullYear().toString(),
      value: moment().subtract(2, "year").toDate().getFullYear(),
    },
    {
      label: moment().subtract(3, "year").toDate().getFullYear().toString(),
      value: moment().subtract(3, "year").toDate().getFullYear(),
    },
    {
      label: moment().subtract(4, "year").toDate().getFullYear().toString(),
      value: moment().subtract(4, "year").toDate().getFullYear(),
    },
  ];

  return years;
}

export function onSelectTag(
  createQuoteStore: CreateQuoteStore,
  year: IYearTag
): void {
  createQuoteStore.setSelectedYear(year.label);
}

export function enableDelete(claimsData: IClaimsData[], year: number): boolean {
  const filteredClaims: IClaimsData[] = Array.isArray(claimsData)
    ? claimsData?.filter(
        (claimDetail: IClaimsData) => claimDetail?.year === year
      )
    : [];
  return filteredClaims?.length > 0;
}

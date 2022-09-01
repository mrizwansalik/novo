import { IOption } from "src/interfaces/common";

export interface IClaimsHistoryForm {
  assumedDiscount: string;
  averageCoinsurance: string;
  averageDeductive: string;
  averageNumberOfEmployee: string;
  averageOOPM: string;
  contractLength: string;
  largeClaimAmount: { amount: number }[];
  paidThroughDate: IOption;
  paidThroughMonth: IOption;
  paidThroughYear: IOption;
  planEffectiveYear: IOption;
  planEffectiveMonth: IOption;
  planType: IOption;
  averageRxPlan: IOption;
  paidStatus: IOption;
  monthlyClaim: IMonthlyClaimForm[];
}

export interface IMonthlyClaimForm {
  amount: string;
  checked: boolean;
}

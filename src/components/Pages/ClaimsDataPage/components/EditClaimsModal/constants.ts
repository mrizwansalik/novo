export const layouts = [
  {
    label: "Claims History",
    description:
      "Entering claims data now will result in more accurate illustrative rates.",
  },
  {
    label: "PHQs",
    description:
      "PHQs will be required for underwriting if there is insufficient claims data.",
  },
];

export const monthsOptions = [
  {
    label: "Jan",
    value: 1,
  },
  {
    label: "Feb",
    value: 2,
  },
  {
    label: "Mar",
    value: 3,
  },
  {
    label: "Apr",
    value: 4,
  },
  {
    label: "May",
    value: 5,
  },
  {
    label: "Jun",
    value: 6,
  },
  {
    label: "Jul",
    value: 7,
  },
  {
    label: "Aug",
    value: 8,
  },
  {
    label: "Sep",
    value: 9,
  },
  {
    label: "Oct",
    value: 10,
  },
  {
    label: "Nov",
    value: 11,
  },
  {
    label: "Dec",
    value: 12,
  },
];

export const defaultMonthlyClaims = Array.from({ length: 12 }).map((_) => ({
  checked: true,
  amount: "",
}));

export enum ClaimsHistoryFormValues {
  PLAN_EFFECTIVE_YEAR = "planEffectiveYear",
  PLAN_EFFECTIVE_MONTH = "planEffectiveMonth",
  CONTRACT_LENGTH = "contractLength",
  AVERAGE_NUMBER_OF_EMPLOYEE = "averageNumberOfEmployee",
  ASSUMED_DISCOUNT = "assumedDiscount",
  ASSUMED_DISCOUNT_CHECK = "assumedDiscountCheck",
  DISCOUNT_UNKNOWN = "discountUnknown",
  PLAN_TYPE = "planType",
  AVERAGE_DEDUCTIVE = "averageDeductive",
  AVERAGE_COINSURANCE = "averageCoinsurance",
  AVERAGE_OOPM = "averageOOPM",
  AVERAGE_RX_PLAN = "averageRxPlan",
  PAID_THROUGH_DATE = "paidThroughDate",
  PAID_THROUGH_MONTH = "paidThroughMonth",
  PAID_THROUGH_YEAR = "paidThroughYear",
  PAID_STATUS = "paidStatus",
  LARGE_CLAIM_AMOUNT_INPUT = "largeClaimAmountInput",
  LARGE_CLAIM_AMOUNT = "largeClaimAmount",
  MONTHLY_CLAIM = "monthlyClaim",
}

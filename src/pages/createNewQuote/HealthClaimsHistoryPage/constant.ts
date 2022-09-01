export enum CreateQuoteSteps {
  CLIENT_PROFILE = 1,
  CENSUS = 2,
  HEALTH_HISTORY = 3,
  EXISTING_PLAN = 4,
  PROGRAMS_BUILD = 5,
}

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

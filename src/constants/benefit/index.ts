import { IOption } from "src/types";

export const emptyMedicalCarrierPlan = {
  name: "",
  plan_type_id: "8fc8da2d-7d67-4fa4-a2a5-47df974d8ee4",
  description: "",
  plan_class: "PPO",
  plan_level: "",
  hsa_qualified: false,
  deductible_in: 0,
  deductible_out: 0,
  deductible_family_in: 0,
  deductible_family_out: 0,
  coinsurance_in: null,
  coinsurance_out: null,
  out_of_pocket_max_in: 0,
  out_of_pocket_max_out: 0,
  out_of_pocket_max_family_in: 0,
  out_of_pocket_max_family_out: 0,
  copay_office_visit: null,
  copay_specialist_specialist: null,
  copay_hospital: null,
  copay_emergency_room: null,
  copay_ambulatory: null,
  rx_deductible: null,
  rx_generic: null,
  rx_preferred: null,
  rx_non_preferred: null,
  rx_specialty: null,
  rx_preventative: null,
  rx_tier: "",
};

export const copayTypesPercentages = [
  "percentage",
  "percentage_with_max",
  "percentage_after_deductible",
  "percentage_after_deductible_with_max",
];

export const copayTypesDollars = [
  "dollars",
  "dollars_with_max",
  "dollars_after_deductible",
  "dollars_after_deductible_with_max",
  "dollars_then_coinsurance",
];

export const copayTypeDeductibleConinsurance = "deductible_coinsurance";

export const copayTypes = [
  ...copayTypesDollars,
  ...copayTypesPercentages,
  copayTypeDeductibleConinsurance,
];

export const copayTypeOptions: IOption[] = [
  {
    value: "dollars",
    label: "Dollars",
  },
  {
    value: "dollars_with_max",
    label: "Dollars With Max",
  },
  {
    value: "dollars_after_deductible",
    label: "Dollars After Deductible",
  },
  {
    value: "dollars_after_deductible_with_max",
    label: "Dollars After Deductible With Max",
  },
  {
    value: "dollars_then_coinsurance",
    label: "Dollars Then Coinsurance",
  },
  {
    value: "percentage",
    label: "Percentage",
  },
  {
    value: "percentage_with_max",
    label: "Percentage With Max",
  },
  {
    value: "percentage_after_deductible",
    label: "Percentage After Deductible",
  },
  {
    value: "percentage_after_deductible_with_max",
    label: "Percentage After Deductible With Max",
  },
  {
    value: "deductible_coinsurance",
    label: "Deductible Coinsurance",
  },
];

export const compositeEmployeeTier = {
  name: "Employee",
  code: "EE",
  contribution_owner: "Org",
  contribution_rate: 0,
  contribution_percent: 0,
  contribution_type: "Fixed Rate",
  price: 0,
  price_at_expected: 0,
  renewal_price: null,
  renewal_price_at_expected: null,
  has_children: false,
  has_spouse: false,
};

export const compositeEmployeeAndSpouseTier = {
  name: "Employee & Spouse",
  code: "ES",
  contribution_owner: "Org",
  contribution_rate: 0,
  contribution_percent: 0,
  contribution_type: "Fixed Rate",
  price: 0,
  price_at_expected: 0,
  renewal_price: null,
  renewal_price_at_expected: null,
  has_children: false,
  has_spouse: true,
};

export const compositeEmployeeAndChildrenTier = {
  name: "Employee & Children",
  code: "EC",
  contribution_owner: "Org",
  contribution_rate: 0,
  contribution_percent: 0,
  contribution_type: "Fixed Rate",
  price: 0,
  price_at_expected: 0,
  renewal_price: null,
  renewal_price_at_expected: null,
  has_children: true,
  has_spouse: false,
};

export const compositeEmployeeAndFamilyTier = {
  name: "Employee & Family",
  code: "EF",
  contribution_owner: "Org",
  contribution_rate: 0,
  contribution_percent: 0,
  contribution_type: "Fixed Rate",
  price: 0,
  price_at_expected: 0,
  renewal_price: null,
  renewal_price_at_expected: null,
  has_children: true,
  has_spouse: true,
};

export const EmptyExpense = {
  name: "",
  amount_type: "fixed_per_employee_per_month",
  fee_type: "other",
  amount_text: "",
  amount_number: 0,
  group_size_amount: [],
  amount_children: 0,
  amount_employee: 0,
  amount_family: 0,
  amount_spouse: 0,
};

export const ExpenseTypeOptions = [
  {
    label: "PEPM",
    value: "fixed_per_employee_per_month",
  },
  {
    label: "Tiered (per mo)",
    value: "four_tier_fixed_per_employee_per_month",
  },
  {
    label: "One-time Fee",
    value: "one_time_fee",
  },
  {
    label: "Custom",
    value: "custom_text",
  },
];

export const defaultCompositeTiers = [
  compositeEmployeeTier,
  compositeEmployeeAndSpouseTier,
  compositeEmployeeAndChildrenTier,
  compositeEmployeeAndFamilyTier,
];

import { NetworkCategory } from "src/constants";

export const networkCategories = [
  {
    name: "Provider Access",
    value: NetworkCategory.PROVIDER_ACCESS,
  },
  {
    name: "PBMs",
    value: NetworkCategory.PHARMACY_BENEFIT_MANAGER,
  },
  {
    name: "Navigation",
    value: NetworkCategory.NAVIGATION,
  },
  {
    name: "Medical Management",
    value: NetworkCategory.MEDICAL_MANAGEMENT,
  },
  {
    name: "Telehealth",
    value: NetworkCategory.TELE_HEALTH,
  },
  {
    name: "Virtual Primary Care",
    value: NetworkCategory.VIRTUAL_PRIMARY_CARE,
  },
  {
    name: "Rx-Solutions",
    value: NetworkCategory.RX_SOLUTIONS,
  },
  {
    name: "Bundled Services",
    value: NetworkCategory.BUNDLED_SERVICES,
  },
  {
    name: "Misc",
    value: NetworkCategory.MISC,
  },
];

export const requiredNetworkCategories = [
  {
    name: "Provider Access",
    value: NetworkCategory.PROVIDER_ACCESS,
  },
  {
    name: "PBMs",
    value: NetworkCategory.PHARMACY_BENEFIT_MANAGER,
  },
];

export const networkIngredientTypes = [
  {
    name: "Sub-Network",
    short_name: "Provider Access",
    code: "sub_network",
  },
  {
    name: "Reference Based Pricing",
    short_name: "Provider Access",
    code: "reference_based_pricing",
  },
  {
    name: "Pharmacy Benefit Manager",
    short_name: "PBM",
    code: "pharmacy_benefit_manager",
  },
  {
    name: "Direct Primary Care",
    short_name: "DPC",
    code: "direct_primary_care",
  },
  {
    name: "Navigation",
    short_name: "Navigation",
    code: "navigation",
  },
  {
    name: "Medical Management",
    short_name: "Medical Management",
    code: "medical_management",
  },
  {
    name: "Virtual Primary Care",
    short_name: "VPC",
    code: "virtual_primary_care",
  },
  {
    name: "Telehealth",
    short_name: "Telehealth",
    code: "tele_health",
  },
  {
    name: "Rx-Solutions",
    short_name: "Rx-Solutions",
    code: "rx_solutions",
  },
  {
    name: "Bundled Services",
    short_name: "Bundled Services",
    code: "bundled_services",
  },
  {
    name: "Misc",
    short_name: "Misc",
    code: "misc",
  },
  {
    name: "Pass Through Expense",
    short_name: "Pass Through Expense",
    code: "pass_through_expense",
  },
];

export const tpaIngredientTypes = [
  {
    key: "mandatory",
    label: "Mandatory",
  },
  {
    key: "default",
    label: "Default",
  },
  {
    key: "optional",
    label: "Optional",
  },
  {
    key: "none",
    label: "Other",
  },
];

export const emptyTpa = {
  name: "",
  minimum_group_size: 0,
  maximum_group_size: null,
  custom_plan_minimum_group_size: 0,
  custom_plan_maximum_group_size: null,
  maximum_number_plans: null,
  is_editable: true,
  carrier: "",
  can_customize_program: true,
  has_pre_packaged_plans: false,
  default_fees: [],
  excluded_states: [],
};

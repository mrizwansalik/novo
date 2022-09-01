export enum NetworkCategory {
  PROVIDER_ACCESS = "provider_access",
  SUB_NETWORK = "sub_network",
  REFERENCE_BASED_PRICING = "reference_based_pricing",
  PHARMACY_BENEFIT_MANAGER = "pharmacy_benefit_manager",
  SOLUTION_PARTNER = "solution_partner",
  DIRECT_PRIMARY_CARE = "direct_primary_care",
  NAVIGATION = "navigation",
  MEDICAL_MANAGEMENT = "medical_management",
  VIRTUAL_PRIMARY_CARE = "virtual_primary_care",
  TELE_HEALTH = "tele_health",
  RX_SOLUTIONS = "rx_solutions",
  BUNDLED_SERVICES = "bundled_services",
  MISC = "misc",
  ALL = "all",
}

export enum NetworkAPIType {
  SUB_NETWORKS = "sub-networks",
  PHARMACY_BENEFIT_MANAGERS = "pharmacy-benefit-managers",
  COST_CONTAINMENT_VENDORS = "cost-containment-vendors",
  THIRD_PARTY_ADMINISTRATOR = "tpas",
}

export enum NetworkAmountType {
  FIXED_PER_EMPLOYEE_PER_MONTH = "fixed_per_employee_per_month",
  FOUR_TIER_FIXED_PER_EMPLOYEE_PER_MONTH = "four_tier_fixed_per_employee_per_month",
  ONE_TIME_FEE = "one_time_fee",
  CUSTOM_TEXT = "custom_text",
}

export enum NetworkTPAType {
  OPTIONAL = "optional",
  MANDATORY = "mandatory",
  DEFAULT = "default",
  NONE = "none",
}

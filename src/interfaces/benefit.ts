import { NetworkTPAType } from "src/constants";

/* eslint-disable max-lines */
export interface IClaimsDocument {
  id?: string;
  year?: number;
  archived?: boolean;
  created?: string;
  file: string;
  mime_type: string;
  modified?: string;
  name: string;
  tags?: string;
}

export interface IStopLossClaims {
  amount: number;
  id: string;
}

export interface IClaimsData {
  id?: string;
  assumed_discount: number;
  contract_length: number;
  experience_average_employees: number;
  experience_coinsurance: number;
  experience_deductible: number;
  experience_oop_max: number;
  experience_plan_type: string;
  experience_rx: string;
  files_skipped: boolean;
  generic_field_responses: {
    claims_documents: IClaimsDocument[];
  };
  monthly_claims: number[];
  paid_status: string;
  year: number;
  paid_through_date: string;
  start_date: string;
  stop_loss_claims: IStopLossClaims[];
}

export interface IPhqDocumentCarrier {
  id: string;
  name: string;
  picture: string;
  picture_thumbnail_64: string;
  picture_thumbnail_128: string;
  picture_thumbnail_256: string;
  picture_thumbnail_512: string;
  filestack_picture: string;
}

export interface IAssignedDocument {
  created: string;
  modified: string;
  signature_state: string;
  status: string;
  worker_document: string;
  owner: IPhqDocumentCarrier;
}

export interface IPhqDocument {
  id: string;
  document_type: string;
  name: string;
  created: string;
  modified: string;
  carrier: IPhqDocumentCarrier;
  file: string;
  assigned?: IAssignedDocument[];
  can_edit?: string;
  status?: string;
  signature_state?: string;
}

// Third party Administrators
export interface ITpa {
  lozengeText?: string;
  can_customize_program: boolean;
  carrier: string;
  custom_plan_maximum_group_size?: number;
  custom_plan_minimum_group_size?: number;
  default_fees: IFee[];
  excluded_states: any[];
  has_pre_packaged_plans: boolean;
  id: string;
  ingredients?: any[];
  is_editable: boolean;
  is_standard: boolean;
  maximum_group_size?: number;
  maximum_number_plans?: number;
  minimum_group_size: number;
  name: string;
  network_ingredient_tpa_id?: string;
  non_square_picture_thumbnail_64: string;
  non_square_picture_thumbnail_128: string;
  non_square_picture_thumbnail_256: string;
  non_square_picture_thumbnail_512: string;
  picture: string;
  picture_thumbnail_64: string;
  picture_thumbnail_128: string;
  picture_thumbnail_256: string;
  picture_thumbnail_512: string;
  programs?: ICarrierPlan[];
  selected?: boolean;
  type: NetworkTPAType;
  valid_states: string[];
}

export interface IFee {
  amount?: number;
  amount_children: number;
  amount_employee: number;
  amount_family: number;
  amount_number: number;
  amount_spouse: number;
  amount_text: string;
  amount_type: string;
  fee_type: string;
  group_size_amount?: any[];
  id?: string;
  name: string;
}

export interface ICarrier {
  lozengeText?: string;
  address?: string;
  blog?: string;
  carrier_type?: string;
  city?: any;
  country?: any;
  desc?: string;
  facebook?: string;
  fax?: string;
  filestack_picture?: string;
  id?: string;
  is_standard?: boolean;
  is_underwriter?: boolean;
  linkedin?: string;
  name?: string;
  non_square_picture_thumbnail_64?: string;
  non_square_picture_thumbnail_128?: string;
  non_square_picture_thumbnail_256?: string;
  non_square_picture_thumbnail_512?: string;
  phone?: string;
  picture?: string;
  picture_thumbnail_128?: string;
  picture_thumbnail_256?: string;
  picture_thumbnail_512?: string;
  postal?: string;
  region?: any;
  suite_number?: string;
  twitter?: string;
  website?: any;
  workers?: any[];
}

export interface IPlan {
  carrier_plan_id?: string;
  newCarrierPlan?: string;
  advanace_funding_provisions?: string;
  claims_fund_percentage?: any;
  created?: string;
  description?: string;
  documents?: any[];
  error_status?: string;
  existing_plan_participation?: any[];
  family_status_pricings?: IFamilyStatusPricings[];
  hasRenewalRates?: boolean;
  has_children?: boolean;
  has_lasers_at_renewal?: any;
  has_spouse?: boolean;
  id?: string;
  modified?: string;
  name?: string;
  network_ingredients?: any[];
  participation_estimation_employee?: any;
  participation_estimation_employee_child?: any;
  participation_estimation_employee_family?: any;
  participation_estimation_employee_spouse?: any;
  plan?: string;
  renewal?: boolean;
  terminal_liability?: string;
  carrier_plan?: ICarrierPlan;
}

export interface IFamilyStatusPricings {
  aggregate_corridor?: any;
  aggregate_premium?: any;
  aggregate_tlo?: any;
  code?: string;
  contribution_owner: string;
  contribution_rate: number;
  contribution_type: string;
  contribution_percent: number;
  dependent_contribution_rate: number;
  dependent_contribution_percent: number;
  error?: any;
  expected_claims_fund?: any;
  fee_total?: any;
  has_children: false;
  has_spouse: false;
  id: string;
  max_claims_cost?: any;
  name: string;
  org_plan: string;
  price: number;
  price_at_expected?: any;
  renewal_price?: any;
  renewal_price_at_expected?: any;
  reveal_full_price: boolean;
  specific_premium?: any;
  specific_tlo?: any;
}

export interface ICarrierPlan {
  carrier?: { carrier: ICarrier } | ICarrier;
  versions?: IVersion[];
  code?: string;
  coinsurance_in?: number;
  coinsurance_out?: any;
  copay_ambulatory?: any;
  copay_ambulatory_max?: any;
  copay_ambulatory_str?: string;
  copay_ambulatory_type?: string;
  copay_emergency_room?: any;
  copay_emergency_room_max?: any;
  copay_emergency_room_str?: string;
  copay_emergency_room_type?: string;
  copay_hospital?: any;
  copay_hospital_max?: any;
  copay_hospital_str?: string;
  copay_hospital_type?: string;
  copay_office_visit?: number;
  copay_office_visit_max?: any;
  copay_office_visit_str?: string;
  copay_office_visit_type?: string;
  copay_specialist?: any;
  copay_specialist_max?: any;
  copay_specialist_str?: string;
  copay_specialist_type?: string;
  copay_urgent_care?: any;
  copay_urgent_care_max?: any;
  copay_urgent_care_str?: string;
  copay_urgent_care_type?: string;
  custom?: boolean;
  deductible_family_in?: number;
  deductible_family_out?: number;
  deductible_in?: number;
  deductible_out?: number;
  description?: string;
  documents?: any[];
  hsa_qualified?: boolean;
  id?: string;
  in_network_url?: string;
  level?: string;
  name?: string;
  network?: any;
  out_of_pocket_max_family_in?: number;
  out_of_pocket_max_family_out?: number;
  out_of_pocket_max_in?: number;
  out_of_pocket_max_out?: number;
  plan_class?: string;
  pricing_calculation_complete?: any;
  recipe_key?: any;
  rx_deductible?: any;
  rx_deductible_str?: string;
  rx_generic?: any;
  rx_generic_max?: any;
  rx_generic_str?: string;
  rx_generic_type?: string;
  rx_non_preferred?: any;
  rx_non_preferred_max?: any;
  rx_non_preferred_str?: string;
  rx_non_preferred_type?: string;
  rx_preferred?: any;
  rx_preferred_max?: any;
  rx_preferred_str?: string;
  rx_preferred_type?: string;
  rx_preventative?: any;
  rx_preventative_max?: any;
  rx_preventative_str?: string;
  rx_preventative_type?: string;
  rx_specialty?: any;
  rx_specialty_max?: any;
  rx_specialty_str?: string;
  rx_specialty_type?: string;
  rx_tier?: string;
  status?: string;
  type?: string;
}

export interface IVersion {
  aggregate_attachment_percent?: number;
  aggregate_stop_loss_underwriting_factor?: number;
  aggregate_tlo?: boolean;
  aggregating_specific_deductible: any;
  claims_fund_underwriting_factor?: number;
  contract_length?: string;
  contract_length_agg?: string;
  contract_length_spec?: string;
  created?: string;
  date_underwritten_rates_set?: any;
  display_name?: string;
  fees?: IFee[];
  files?: any;
  has_advanced_specific_funding?: boolean;
  has_agg_accommodation?: boolean;
  id?: string;
  is_blended?: boolean;
  lasers?: any[];
  modified?: string;
  name?: string;
  network_discount_override?: Number;
  network_ingredients?: { network_ingredient: INetworkIngredient }[];
  notes?: string;
  number_of_tiers?: number;
  org_plans?: any[];
  overall_underwriting_factor?: number;
  proposal_documents?: any[];
  risk_corridor?: number;
  run_in?: number;
  run_out?: number;
  specific_deductible?: number;
  specific_stop_loss_underwriting_factor?: number;
  specific_tlo?: boolean;
  status?: string;
  stop_loss_carrier?: ICarrier | string;
  stop_loss_contract?: any;
  stop_loss_title?: string;
  total_annual_admin_fees?: number;
  total_annual_cost_no_corridor?: number;
  total_annual_maximum_cost?: number;
  total_annual_stop_loss_cost?: number;
  total_expected_claims_fund?: number;
  underwritten_status?: string;
  version_type?: string;
}

export interface IWaivedUser {
  census_data: unknown;
  email: string;
  first_name: string;
  id: string;
  joined: boolean;
  last_name: string;
  name: string;
}
export interface INetworkIngredient {
  description: string;
  id: string;
  name: string;
  type: string;
}

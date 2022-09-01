import { IBroker, IBrokerage } from "./broker";
import { ILocation } from "./location";

export interface IProspect {
  id: string;
  suite_number?: string;
  address: string;
  postal: string;
  website?: string;
  locked: boolean;
  created: string;
  is_demo: boolean;
  primary_broker: IBroker;
  phone?: string;
  name: string;
  num_employees: number;
  email?: string;
  employer_identification_number?: string;
  sic_code?: string;
  naics_code: number;
  naics_description: string;
  phq_status: string;
  org_status: string;
  benefits_enabled: boolean;
  hr_enabled: boolean;
  user_access_enabled: boolean;
  census_data: ICensusData;
  num_models: number;
  brokerage: IBrokerage;
  onboarding_version: string;
  picture?: string;
  picture_thumbnail_64?: string;
  picture_thumbnail_128?: string;
  picture_thumbnail_256?: string;
  picture_thumbnail_512?: string;
  filestack_picture?: string;
  state_abbreviation: string;
  sic_description?: string;
  non_square_picture_thumbnail_64?: string;
  non_square_picture_thumbnail_128?: string;
  non_square_picture_thumbnail_256?: string;
  non_square_picture_thumbnail_512?: string;
  twitter?: string;
  fax?: string;
  facebook?: string;
  linkedin?: string;
  blog?: string;
  desc?: string;
  generic_field_responses?: unknown;
  is_brokerage: boolean;
  is_carrier: boolean;
  is_underwriter: boolean;
  is_the_force_strong_with_this_one: boolean;
  effective_date: string;
  city_region_postal_code: string;
  city: ILocation;
  region: ILocation;
  country: ILocation;
}

export interface ICensusData {
  health_plan: IHealthPlan;
  uploaded_format?: string;
  claims_data_skip: boolean;
  health_history_type: string;
  claims_documents_skip: boolean;
  health_history_skipped: boolean;
}

export interface IHealthPlan {
  effective_date: string;
  have_health_plan: true;
}

export interface IProspectProgress {
  additional_info_count: number;
  additional_info_progress: number;
  census_count: number;
  census_progress: number;
  census_skipped: boolean;
  claims_data_count: number;
  claims_data_progress: number;
  claims_documents_count: number;
  claims_documents_progress: number;
  existing_plans_complete: number;
  existing_plans_count: number;
  existing_plans_documents_complete: boolean;
  existing_plans_progress: number;
  existing_plans_self_funded: boolean;
  existing_plans_skipped: boolean;
  group_detail_progress: number;
  has_org_recipe: boolean;
  health_history_skipped: boolean;
  health_history_type: string;
  onboarding_version: string;
  phq_count: number;
  phq_progress: number;
  phq_status: string;
  phq_workers: number;
  phq_workers_completed_phqs: number;
}

export interface IPlanDocuments {
  archived?: boolean;
  created?: string;
  file?: string;
  filestack_url?: string;
  id?: string;
  mime_type?: string;
  modified?: string;
  name?: string;
  tags?: string;
  file_name?: string;
}
export interface IGenericFieldResponses {
  plan_documents?: IPlanDocuments[];
  claims_documents: IClaimsDocuments[];
}

export interface IClaimsDocuments {
  archived?: boolean;
  created?: string;
  file: string;
  filestack_url?: string;
  id?: string;
  mime_type: string;
  modified?: string;
  name: string;
  tags?: string;
  file_name?: string;
  year?: number;
}

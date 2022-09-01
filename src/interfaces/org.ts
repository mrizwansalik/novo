import { IBroker, IBrokerage } from "./broker";
import { IDocument } from "./document";
import { ILocation, IRegion } from "./location";
import { ICensusData, IGenericFieldResponses } from "./prospects";
export interface IOrg {
  id: string;
  name: string;
  picture?: string;
  picture_thumbnail_64?: string;
  picture_thumbnail_128?: string;
  picture_thumbnail_256?: string;
  picture_thumbnail_512?: string;
  filestack_picture?: string;
  suite_number?: string;
  address: string;
  postal: string;
  phone?: string;
  state_abbreviation?: string;
  num_employees: number;
  email?: string;
  employer_identification_number?: string;
  benefits_enabled: boolean;
  hr_enabled: boolean;
  user_access_enabled: boolean;
  sic_code?: string;
  sic_description?: string;
  naics_code?: string | number;
  naics_description?: string;
  locked: boolean;
  non_square_picture_thumbnail_64?: string;
  non_square_picture_thumbnail_128?: string;
  non_square_picture_thumbnail_256?: string;
  non_square_picture_thumbnail_512?: string;
  website?: string;

  twitter?: string;
  fax?: string;
  facebook?: string;
  linkedin?: string;
  blog?: string;
  desc?: string;
  generic_field_responses?: IGenericFieldResponses;
  is_brokerage?: boolean;
  is_carrier?: boolean;
  is_underwriter?: boolean;
  is_demo: boolean;
  census_data: ICensusData;
  is_the_force_strong_with_this_one?: boolean;
  onboarding_version: string;
  primary_broker: IBroker;
  effective_date?: string;
  city_region_postal_code?: string;
  city?: ILocation;
  region?: ILocation;
  country?: ILocation;
  created: string;
  phq_status: string;
  org_status: string;
  num_models: number;
  brokerage: IBrokerage;
}

export interface IGenericFieldResponse {
  plan_documents: IDocument[];
}

export interface INewOrgRequest {
  name?: string;
  address?: string;
  benefits_enabled?: boolean;
  city?: number;
  country?: number;
  region?: number;
  employer_identification_number?: string;
  phone?: string;
  postal?: string;
}

export interface INewOrgFormValues {
  name: string;
  address: string;
  region: IRegion;
  city: IRegion;
  country: IRegion;
  postal: string;
}

export interface IFetchOrganizationRequest {
  jwt: string;
}
interface ICity {
  id: number;
  name: string;
}
interface IRegion {
  id: number;
  name: string;
}
interface ICountry {
  id: number;
  name: string;
}
export interface IOrganization {
  name: string;
  picture: string;
  picture_thumbnail_64: string;
  picture_thumbnail_128: string;
  picture_thumbnail_256: string;
  picture_thumbnail_512: string;
  filestack_picture: string;
  id: string;
  suite_number: string;
  address: string;
  postal: string;
  city: ICity;
  phone: string;
  state_abbreviation: string;
  num_employees: number;
  email: string;
  employer_identification_number: string;
  benefits_enabled: boolean;
  hr_enabled: boolean;
  user_access_enabled: boolean;
  sic_code: string;
  sic_description: string;
  naics_code: number;
  naics_description: string;
  locked: boolean;
  non_square_picture_thumbnail_64: string;
  non_square_picture_thumbnail_128: string;
  non_square_picture_thumbnail_256: string;
  non_square_picture_thumbnail_512: string;
  twitter: string;
  fax: string;
  facebook: string;
  linkedin: string;
  blog: string;
  desc: string;
  is_brokerage: boolean;
  is_carrier: boolean;
  is_underwriter: boolean;
  is_demo: boolean;
  is_the_force_strong_with_this_one: boolean;
  onboarding_version: string;
  effective_date: string;
  city_region_postal_code: string;
  region: IRegion;
  country: ICountry;
  // INFO: not enough information to declare type
  // website: null;
  // generic_field_responses: {};
  // census_data: {};
  // primary_broker: null;
}

export interface IDependentDetail {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  personal_email: string;
  birthday: string;
  gender: string;
  city: string;
  country: string;
  address: string;
  language: string;
  marital_status: string;
  government_number: string;
  relationship: string;
  state_abbreviation: string;
  suite_number: string;
  region: string;
  health_data: {
    weight: string;
    height: string;
    is_smoker: boolean;
  };
  census_data: {
    is_employed: boolean;
    is_full_time_student: boolean;
    is_disabled: boolean;
    is_incapacitated: boolean;
    primary_care_physician: string;
  };
  postal: string;
  filestack_picture: string;
}

interface IWorkerRecord {
  id?: string;
  org?: string;
}

interface IBrokerageRecord {
  brokerage?: string;
}

interface IInvite {
  id?: string;
  worker?: string;
  time?: string;
}

interface IPhqData {
  needs_confirmation?: boolean;
}

export interface IWorker {
  name?: string;
  picture?: string;
  picture_thumbnail_64?: string;
  picture_thumbnail_128?: string;
  picture_thumbnail_256?: string;
  picture_thumbnail_512?: string;
  filestack_picture?: string;
  id?: string;
  suite_number?: string;
  address?: string;
  postal?: string;
  city?: string;
  phone?: string;
  state_abbreviation?: string;
  email?: string;
  joined?: boolean;
  last_name?: string;
  first_name?: string;
  middle_name?: string;
  gender?: string;
  birthday?: string;
  language?: string;
  government_number?: string;
  personal_email?: string;
  marital_status?: string;
  is_broker_at_current?: boolean;
  worker_records?: [IWorkerRecord];
  broker_records?: [IBrokerageRecord];
  created?: string;
  modified?: string;
  password_set?: boolean;
  is_the_force_strong_with_this_one?: boolean;
  invites?: [IInvite];
  worker_type?: string;
  is_default_underwriter?: boolean;
  region?: string;
  country?: string;
  census_data?: unknown;
  custom_field_responses?: unknown;
  phq_data?: IPhqData;
  // INFO: not enough information to declare type
  // health_benefits_available: null;
  // date_health_benefits_available: null;
  // hours_per_week: null;
  // positions: [];
  // census_data: {};
  // health_data: {};
}

export interface IResetPasswordRequest {
  password: string;
}

export interface IResetPasswordResponse {
  status: number;
}

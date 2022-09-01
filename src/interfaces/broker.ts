export interface IBroker {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  user_id?: string;
  date: string;
}

export interface IBrokerage {
  id: string;
  name: string;
}

interface ICensusData {
  health_history_skipped: boolean;
  health_history_type: string;
  uploaded_format: any;
}

export interface IUpdateProspectPhqStatusRequest {
  census_data: ICensusData;
  org_status: string;
  phq_status: string;
}

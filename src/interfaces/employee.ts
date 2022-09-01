export interface IEmployeeDetail {
  name: string;
  id: string;
  picture: string;
  address: string;
  email: string;
  city: number;
  state_abbreviation: string;
  phone: number;
  postal: number;
  suite_number: string;
  joined: string;
  last_name: string;
  first_name: string;
  middle_name: string;
  gender: string;
  birthday: string;
  government_number: string;
  marital_status: string;
  positions: [
    {
      id: string;
      reports_to: string;
      start_date: string;
      end_date: string;
      name: string;
      description: string;
      position_type: string;
    }
  ];
  worker_type: string;
  census_data: {
    phq: {
      waiving: boolean;
      dependents_complete: boolean;
    };
  };
  acknowledgement: {
    term: string;
    agreed: boolean;
  };
  phq_data: {
    needs_confirmation: boolean;
  };
}

export interface ICensusHuman {
  birthday: string;
  coverage_type: string;
  dependents: any;
  employee: null;
  first_name: string;
  gender: string;
  id: string;
  last_name: string;
  plan_name: string;
  postal: string;
  relationship: string;
  additional_data: ICensusAdditionalData;
}

export interface ICensusAdditionalData {
  gender: string;
  postal: string;
  birthday: string;
  row_number: number;
  coverage_type: string;
}

export interface ICensusTemplate {
  birthday_column: string;
  coverage_column: string;
  coverage_ec: string;
  coverage_ee: string;
  coverage_ef: string;
  coverage_es: string;
  coverage_waived: string;
  created: string;
  data_end_row: number;
  data_start_row: number;
  first_name_column_dep: string;
  first_name_column_ee: string;
  gender_column: string;
  id: string;
  last_name_column_dep: string;
  last_name_column_ee: string;
  modified: string;
  name: string;
  plan_column: string;
  postal_column: string;
  relationship_child: string;
  relationship_column: string;
  relationship_employee: string;
  relationship_spouse: string;
  sheet_name: string;
}

export interface IPlanParticipation {
  participation_estimation_employee?: number;
  participation_estimation_employee_spouse?: number;
  participation_estimation_employee_child?: number;
  participation_estimation_employee_family?: number;
}

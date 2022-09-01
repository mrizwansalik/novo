export interface IFilePolicy {
  policy: string;
  signature: string;
}

export interface IFileFormat {
  birthday_column?: string;
  coverage_column?: string;
  coverage_ec?: string;
  coverage_ee?: string;
  coverage_ef?: string;
  coverage_es?: string;
  coverage_waived?: string;
  data_end_row?: string;
  data_start_row?: string;
  first_name_column_dep?: string;
  first_name_column_ee?: string;
  gender_column?: string;
  id?: string;
  last_name_column_dep?: string;
  last_name_column_ee?: string;
  name: string;
  plan_column?: string;
  postal_column?: string;
  relationship_child?: string;
  relationship_column?: string;
  relationship_employee?: string;
  relationship_spouse?: string;
  sheet_name?: string;
  hasMultipleSheets?: boolean;
}

export interface IUploadedFile {
  mime_type: string;
  name?: string;
  title: string;
  container: string;
  key: string;
  file: string;
  can_edit?: boolean;
  created?: string;
  document_type?: string;
  id?: string;
  modified?: string;
  assigned?: unknown[];
  document_id?: string;
  filestack_url?: string;
  tags?: string;
}

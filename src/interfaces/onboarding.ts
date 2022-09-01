export interface IProspectProgress {
  client?: boolean;
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

export interface IOnboardingStep {
  label: string;
  code: string;
  steps: number;
  stepIndex: number;
  skipped: boolean;
  skippable: boolean;
  route: string;
  fully_funded?: boolean;
  routes?: string[];
  index_offset?: number;
  has_org_recipe?: boolean;
}

export const specificDeductibles = [
  { label: "$10000", value: 10000 },
  { label: "$15000", value: 15000 },
  { label: "$20000", value: 20000 },
  { label: "$25000", value: 25000 },
  { label: "$30000", value: 30000 },
  { label: "$35000", value: 35000 },
  { label: "$40000", value: 40000 },
  { label: "$45000", value: 45000 },
  { label: "$50000", value: 50000 },
  { label: "$55000", value: 55000 },
  { label: "$60000", value: 60000 },
  { label: "$65000", value: 65000 },
  { label: "$70000", value: 70000 },
  { label: "$75000", value: 75000 },
  { label: "$80000", value: 80000 },
  { label: "$85000", value: 85000 },
  { label: "$90000", value: 90000 },
  { label: "$95000", value: 95000 },
  { label: "$100000", value: 100000 },
  { label: "$125000", value: 125000 },
  { label: "$150000", value: 150000 },
  { label: "$175000", value: 175000 },
  { label: "$200000", value: 200000 },
  { label: "$250000", value: 250000 },
  { label: "$500000", value: 500000 },
];

export const contractTypes = [
  { label: "12/12", value: "12/12" },
  { label: "12/15", value: "12/15" },
  { label: "12/18", value: "12/18" },
  { label: "12/24", value: "12/24" },
  { label: "15/12", value: "15/12" },
  { label: "18/12", value: "18/12" },
  { label: "24/12", value: "24/12" },
];

export const aggregateAttachmentPoints = [
  { label: "105%", value: 1.05 },
  { label: "110%", value: 1.1 },
  { label: "115%", value: 1.15 },
  { label: "120%", value: 1.2 },
  { label: "125%", value: 1.25 },
];

export const EXISTING_PLANS_FILES_MAPPING =
  "generic_field_responses.plan_documents";
export const RFP_FILES_MAPPING = "generic_field_responses.rfp_documents";

export interface IExistingPlanDocumentTypeChoice {
  name: string;
  tag: string;
  fullyFunded: boolean;
}
export const existingPlanDocumentTypeChoices: IExistingPlanDocumentTypeChoice[] = [
  {
    name: "Census",
    tag: "simple-census",
    fullyFunded: true,
  },
  {
    name: "Current Plan Year Renewal",
    tag: "existing_renewal_notices",
    fullyFunded: true,
  },
  {
    name: "Current Stop Loss Policy",
    tag: "existing_stop_loss_policy",
    fullyFunded: false,
  },
  {
    name: "Existing Rates",
    tag: "existing_rates",
    fullyFunded: true,
  },
  {
    name: "Most Recent Carrier Invoice",
    tag: "existing_recent_invoices",
    fullyFunded: true,
  },
  {
    name: "Plan Document",
    tag: "existing_plan_documents",
    fullyFunded: true,
  },
  {
    name: "Summary of Benefits and Coverage",
    tag: "existing_summary_of_benefits",
    fullyFunded: true,
  },
  {
    name: "Upcoming Renewal",
    tag: "existing_upcoming_renewal",
    fullyFunded: true,
  },
  {
    name: "Summary Plan Description",
    tag: "existing_summary_plan_description",
    fullyFunded: true,
  },
  {
    name: "Other",
    tag: "other",
    fullyFunded: true,
  },
];

export const existingPlanDocumentTypeTags = [
  "simple-census",
  "existing_renewal_notices",
  "existing_stop_loss_policy",
  "existing_rates",
  "existing_recent_invoices",
  "existing_plan_documents",
  "existing_summary_of_benefits",
  "existing_upcoming_renewal",
  "existing_summary_plan_description",
  "other",
];

export interface IProgramRecipeSteps {
  name: string;
  label: string;
  route: string;
  orgRecipeKey: string;
  edit: boolean;
  description?: string;
}
export const programRecipeSteps: IProgramRecipeSteps[] = [
  {
    name: "networks",
    label: "Provider Access",
    route: ".network",
    orgRecipeKey: "sub_networks",
    edit: false,
    description: "",
  },
  {
    name: "pharmacy_benefit_manager",
    label: "Pharmacy Benefit Manager",
    route: ".pharmacy-benefit-manager",
    orgRecipeKey: "pbms",
    edit: false,
  },
  {
    name: "cost_containment_vendor",
    label: "Solution Partners",
    route: ".cost-containment-vendors",
    orgRecipeKey: "cost_containment_vendors",
    edit: false,
  },
  {
    name: "tpa",
    label: "Third Party Administrators",
    route: ".tpa",
    orgRecipeKey: "tpas",
    edit: false,
  },
  {
    name: "plan_set",
    label: "Plan Designs",
    route: ".planset",
    orgRecipeKey: "plan_sets",
    edit: true,
  },
  {
    name: "Expenses",
    label: "Expenses",
    route: ".expenses",
    orgRecipeKey: "fees",
    edit: false,
    description:
      "Other pass through expenses (e. g. health navigator services, ben admin fee, etc.)",
  },
  {
    name: "stop_loss",
    label: "Stop Loss",
    route: ".stop-loss",
    orgRecipeKey: "stop_loss_contracts",
    edit: true,
  },
];

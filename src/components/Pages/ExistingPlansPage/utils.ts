import { IPlanDocuments } from "src/interfaces/prospects";

export interface IChecklist {
  title: string;
  isComplete: boolean;
  tags: string;
}

export const requiredChecklist = [
  {
    title: "Census",
    isComplete: false,
    tags: "simple-census",
  },
  {
    title: "Current Plan Year Renewal",
    isComplete: false,
    tags: "existing_renewal_notices",
  },
  {
    title: "Existing Rates",
    isComplete: false,
    tags: "existing_rates",
  },
  {
    title: "Most Recent Carrier Invoice",
    isComplete: false,
    tags: "existing_recent_invoices",
  },
  {
    title: "Plan Document",
    isComplete: false,
    tags: "existing_plan_documents",
  },
  {
    title: "Summary of Benefits and Coverage",
    isComplete: false,
    tags: "existing_summary_of_benefits",
  },
  {
    title: "Upcoming Renewal",
    isComplete: false,
    tags: "existing_upcoming_renewal",
  },
  {
    title: "Summary Plan Description",
    isComplete: false,
    tags: "existing_summary_plan_description",
  },
];

export const optionalChecklist = [
  {
    title: "Other",
    isComplete: false,
    tags: "other",
  },
];

export function mapStoreToState(
  store: IPlanDocuments[],
  state: IChecklist[]
): IChecklist[] {
  if (store) {
    return state.map((item) => {
      item.isComplete = store.some((document) => document.tags === item.tags);
      return item;
    });
  }
  return state;
}

export function getChecklistProgress(store: IPlanDocuments[]): number {
  const checklistValue = mapStoreToState(
    store,
    requiredChecklist.concat(optionalChecklist)
  );
  return checklistValue.filter((document) => document.isComplete).length;
}

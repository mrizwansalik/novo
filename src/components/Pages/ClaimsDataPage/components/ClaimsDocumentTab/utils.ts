import { IClaimsDocuments } from "src/interfaces/prospects";

export interface IChecklist {
  title: string;
  isComplete: boolean;
  tags: string;
}

export const previousYearChecklist = [
  {
    title: "Detailed Large Claimant Report",
    isComplete: false,
    tags: "claims_large",
  },
  {
    title: "Monthly Premium vs. Claims Report",
    isComplete: false,
    tags: "claims_monthly_paid",
  },
  {
    title: "Additional Claims Reports",
    isComplete: false,
    tags: "claims_additional",
  },
];

export const currentYearChecklist = [
  {
    title: "Detailed Large Claimant Report",
    isComplete: false,
    tags: "claims_large",
  },
  {
    title: "Monthly Premium vs. Claims Report",
    isComplete: false,
    tags: "claims_monthly_paid",
  },
  {
    title: "Monthly Enrollment Report",
    isComplete: false,
    tags: "claims_schedule_of_benefits",
  },
  {
    title: "Additional Claims Reports",
    isComplete: false,
    tags: "claims_additional",
  },
];

export function mapStoreToState(
  store: IClaimsDocuments[],
  state: IChecklist[],
  year: number
): IChecklist[] {
  if (store) {
    return state.map((item) => {
      item.isComplete = store.some(
        (document) => document.tags === item.tags && document.year === year
      );
      return item;
    });
  }
  return state;
}

export function getChecklistProgress(store: IClaimsDocuments[]): number {
  const previousYear = mapStoreToState(
    store,
    previousYearChecklist,
    new Date().getFullYear() - 1
  );
  const currentYear = mapStoreToState(
    store,
    currentYearChecklist,
    new Date().getFullYear()
  );

  return previousYear
    .concat(currentYear)
    .filter(
      (document) => document.isComplete && document.tags !== "claims_additional"
    ).length;
}

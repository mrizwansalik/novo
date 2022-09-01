import { PROSPECT_SORT_BY } from "../../../../constants";
import { IOption } from "../../../../types/form";

export const sortOptions: IOption[] = [
  {
    value: PROSPECT_SORT_BY.NAME,
    label: "Sorted by name",
  },
  {
    value: PROSPECT_SORT_BY.CREATED,
    label: "Sorted by date added",
  },
  {
    value: PROSPECT_SORT_BY.EFFECTIVE_DATE,
    label: "Sorted by effective date",
  },
  {
    value: PROSPECT_SORT_BY.PRIMARY_ADVISOR,
    label: "Sorted by primary advisor",
  },
];

import moment from "moment";
import { IOption } from "../../../../interfaces/common";

export function getCategoryTypeOptions(): IOption[] {
  const options: IOption[] = [
    {
      label: "Detailed Large Claimant Report",
      value: "claims_large",
    },
    {
      label: "Monthly Premium vs. Claims Report",
      value: "claims_monthly_paid",
    },
    {
      label: "Monthly Enrollment Report",
      value: "claims_schedule_of_benefits",
    },
    {
      label: "Additional Claims Reports",
      value: "claims_additional",
    },
  ];
  return options;
}

export function getYearOptions(): IOption[] {
  const years: IOption[] = [
    {
      label: moment().toDate().getFullYear().toString(),
      value: moment().toDate().getFullYear(),
    },
    {
      label: moment().subtract(1, "year").toDate().getFullYear().toString(),
      value: moment().subtract(1, "year").toDate().getFullYear(),
    },
    {
      label: moment().subtract(2, "year").toDate().getFullYear().toString(),
      value: moment().subtract(2, "year").toDate().getFullYear(),
    },
    {
      label: moment().subtract(3, "year").toDate().getFullYear().toString(),
      value: moment().subtract(3, "year").toDate().getFullYear(),
    },
    {
      label: moment().subtract(4, "year").toDate().getFullYear().toString(),
      value: moment().subtract(4, "year").toDate().getFullYear(),
    },
  ];
  return years;
}

export function getLastYears(numberOfYear: number): number[] {
  const years = Array.from({
    length: numberOfYear - 1,
  }).map((_, index: number) =>
    moment()
      .subtract(index + 1, "year")
      .toDate()
      .getFullYear()
  );
  return [moment().toDate().getFullYear(), ...years];
}

import moment from "moment";
import { SpecialTime } from "src/constants";
import { IOption } from "src/interfaces/common";
import { monthsOptions } from "../constants";

export function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate();
}

export function getYearOptions(): IOption[] {
  const year = new Date();
  const options: IOption[] = [
    {
      label: year.getFullYear().toString(),
      value: year.getFullYear().toString(),
    },
  ];

  return options;
}

export function getMonthOptions(): IOption[] {
  return monthsOptions;
}

export function getDateOptions(month: number = 1): IOption[] {
  const year = new Date().getFullYear();
  const numberOfDays = getDaysInMonth(month, year);
  const options = Array.from(
    { length: numberOfDays },
    (_, index: number) => index + 1
  ).map((day: number) => ({
    label: day.toString(),
    value: day,
  }));

  return options;
}

export function getEffectiveYearOptions(selectedYear: string): IOption[] {
  const lastYear = moment()
    .subtract(1, "year")
    .toDate()
    .getFullYear()
    .toString();
  const options: IOption[] = [
    {
      label: selectedYear === SpecialTime.LAST_YEAR ? lastYear : selectedYear,
      value: selectedYear === SpecialTime.LAST_YEAR ? lastYear : selectedYear,
    },
  ];

  return options;
}

export function getPlanTypeOptions(): IOption[] {
  const options: IOption[] = [
    {
      label: "Traditional (w/ copays)",
      value: "ppo",
    },
    {
      label: "HSA",
      value: "hsa",
    },
  ];

  return options;
}

export function getAverageRxPlan(): IOption[] {
  const options: IOption[] = [
    {
      label: "Ded / Coins",
      value: "Ded/Coins",
    },
    {
      label: "$0 / $35 / $50",
      value: "$0/$35/$50",
    },
    {
      label: "$15 / $45 / $60",
      value: "$15/$45/$60",
    },
    {
      label: "$20 / $50 / $75",
      value: "$20/$50/$75",
    },
    {
      label: "50% / 50% / 50%",
      value: "50%/50%/50%",
    },
  ];

  return options;
}

export function getPaidStatus(): IOption[] {
  const options: IOption[] = [
    {
      label: "Paid",
      value: "paid",
    },
    {
      label: "Paid and Incurred",
      value: "paid_and_incurred",
    },
  ];

  return options;
}

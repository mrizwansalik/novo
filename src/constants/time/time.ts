import get from "lodash/get";

export function getMonthName(monthIndex: number): string {
  const monthNames: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return get(monthNames, `[${monthIndex}]`, "");
}

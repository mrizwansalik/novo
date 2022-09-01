import { IClaimsData } from "src/interfaces/benefit";
export function thousandSeparatorByComma(number: number = 0): string {
  return number.toString()
    ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "";
}

const chartColors: string[] = [
  "#1FB2FF",
  "#FA39E8",
  "#FFB42E",
  "#4B27E6",
  "#D92B91",
  "#C3A867",
  "#494EA5",
  "#A2D7A5",
];

export function getChartColor(index: number): string {
  if (index >= chartColors.length) {
    return chartColors[index - chartColors.length];
  }
  return chartColors[index];
}

export function createEmptyClaimsData(year: number): IClaimsData {
  return {
    year: year,
    files_skipped: false,
    generic_field_responses: {
      claims_documents: [],
    },
    start_date: null,
    contract_length: 12,
    assumed_discount: null,
    experience_average_employees: 0,
    experience_plan_type: "",
    experience_deductible: 0,
    experience_coinsurance: 0,
    experience_oop_max: 0,
    experience_rx: "",
    paid_through_date: null,
    monthly_claims: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    stop_loss_claims: [],
    paid_status: "paid",
  };
}

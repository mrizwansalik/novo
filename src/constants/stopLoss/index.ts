import { IStopLoss } from "src/interfaces/orgRecipes";

export const emptyStopLossContract: IStopLoss = {
  name: "",
  is_blended: false,
  number_of_tiers: 4,
  run_in: 0,
  contract_length: "12/18",
  contract_length_spec: "",
  contract_length_agg: "",
  run_out: 6,
  specific_deductible: 20000,
  aggregate_attachment_percent: 1.25,
  aggregating_specific_deductible: null,
  specific_tlo: false,
  aggregate_tlo: false,
  has_agg_accommodation: false,
  has_advanced_specific_funding: false,
  notes: "",
};

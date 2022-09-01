import { ICarrierPlan, ITpa } from "./benefit";
import { ISubNetwork } from "./network";

export interface IPlanSet {
  id: string;
  name: string;
  plan?: any[];
}

export interface IOrgRecipesFee {
  amount: number;
  amount_children: number;
  amount_employee: number;
  amount_family: number;
  amount_number: number;
  amount_spouse: number;
  amount_text: string;
  amount_type: string;
  fee_type: string;
  id: string;
  name: string;
  org_recipe: string;
}

export interface INetworkIngredient {
  default_fee: IOrgRecipesFee;
  description: string;
  estimated_savings: number;
  id: string;
  is_standard: boolean;
  maximum_group_size: number;
  minimum_group_size: number;
  name: string;
  network_ingredient_id: string;
  network_ingredient_sub_type: string;
  network_ingredient_type: string;
  type: string;
}

export interface IOrgRecipesTPA {
  id: string;
  network_ingredients: INetworkIngredient[];
  tpa: ITpa;
}

export interface IOrgRecipes {
  bulk: boolean;
  fees: IOrgRecipesFee[];
  id: string;
  org: string;
  plan_sets: IPlanSet[];
  sub_networks: ISubNetwork[];
  pbms: ISubNetwork[];
  cost_containment_vendors: ISubNetwork[];
  tpas: IOrgRecipesTPA[];
  stop_loss_contracts?: IStopLoss[];
}

export interface IMedicalPlan {
  id: string;
  medical_plan: ICarrierPlan;
  participation_estimation_employee?: number;
  participation_estimation_employee_child?: number;
  participation_estimation_employee_family?: number;
  participation_estimation_employee_spouse?: number;
  plan_set: string;
}

export interface IStopLoss {
  id?: string;
  name: string;
  display_name?: string;
  is_blended: boolean;
  number_of_tiers: number;
  run_in: number;
  contract_length: string;
  contract_length_spec?: string;
  contract_length_agg?: string;
  run_out: number;
  specific_deductible: number;
  aggregate_attachment_percent: number;
  aggregating_specific_deductible?: number;
  specific_tlo: boolean;
  aggregate_tlo: boolean;
  has_agg_accommodation: boolean;
  has_advanced_specific_funding: boolean;
  notes?: string;
  org_recipes?: string[];
}

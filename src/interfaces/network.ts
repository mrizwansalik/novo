import { NetworkCategory } from "src/constants";
import { ITpa } from "./benefit";
import { IOrganization } from "./organization";

export interface INetworkDefaultValue {
  id: string;
  name: string;
  amount_type: string;
  fee_type: string;
  amount_text: string;
  amount: number;
  amount_employee: number;
  amount_spouse: number;
  amount_children: number;
  amount_family: number;
  amount_number: number;
  custom_text: string;
  group_size_amount: [];
}

export interface ISubNetwork {
  id?: string;
  name?: string;
  type?: NetworkCategory;
  sub_type?: NetworkCategory;
  is_standard?: boolean;
  description?: string;
  default_fee?: INetworkDefaultValue;
  excluded_ingredients?: [];
  org?: {
    name: string;
    picture: string;
    picture_thumbnail_64: string;
    picture_thumbnail_128: string;
    picture_thumbnail_256: string;
    picture_thumbnail_512: string;
    filestack_picture: string;
  };
}

export type ISubNetworksTree = Record<string, ISubNetwork[]>;
export interface INetworkIngredient {
  description: string;
  name: string;
  sub_type: string;
  type: string;
  default_fee: INetworkDefaultValue;
}

export interface IPharmacyBenefitManager {
  suite_number: string;
  address: string;
  postal: string;
  city: string;
  desc: string;
  website: string;
  twitter: string;
  name: string;
  picture: string;
  filestack_picture: string;
  facebook: string;
  linkedin: string;
  phone: string;
  fax: string;
  blog: string;
  default_fee: INetworkDefaultValue;
  is_standard: false;
}

export interface INetworkIngredientWithTPAs {
  client_org: unknown;
  default_fee: unknown;
  description: string;
  estimated_savings: unknown;
  excluded_ingredients: unknown;
  id: string;
  is_standard: boolean;
  name: string;
  org: IOrganization;
  recommendations: unknown;
  sub_type: string;
  tpas: ITpa[];
  type: NetworkCategory;
}

export interface IOrgRecipesWithTPAs {
  brokerage_id: string;
  network_ingredients: string[];
  tpa: string;
}

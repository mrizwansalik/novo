export interface IProgramIngredients {
  client_org: string;
  default_fee: string;
  description: string;
  estimated_savings: string;
  excluded_ingredients: any[];
  id: string;
  is_standard: boolean;
  name: string;
  org: {
    filestack_picture: string;
    name: string;
    picture: string;
    picture_thumbnail_64: string;
    picture_thumbnail_128: string;
    picture_thumbnail_256: string;
    picture_thumbnail_512: string;
  };
  recommendations: any[];
  sub_type: string;
  tpas: any[];
  type: string;
}

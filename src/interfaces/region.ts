import { IOption } from "src/types";

export interface IRegion extends IOption {
  id: number;
  alternate_names: string;
  geoname_id: number;
  geoname_code: string;
  zip_prefixes?: string;
}

export interface ILocation {
  id: string | number;
  name: string;
  alternate_names?: string;
  geoname_id?: number;
  geoname_code?: string;
  zip_prefixes?: string;
}

export interface ICountry {
  id: number;
  name: string;
  value?: number;
  label?: string;
}

export interface IRegion {
  id: number;
  name: string;
  value?: number;
  label?: string;
  geoname_code?: string;
  zip_prefixes?: string;
  code?: string;
}

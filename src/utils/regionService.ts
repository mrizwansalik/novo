import { AvailableCountry, canadaProvinces, usStates } from "src/constants";
import { IRegion } from "src/interfaces/region";

export function getRegionsByCountry(countryName: string): IRegion[] {
  if (!countryName) {
    return [];
  }

  if (countryName.toLowerCase() === AvailableCountry.CANADA) {
    return canadaProvinces;
  }

  if (countryName.toLowerCase() === AvailableCountry.UNITED_STATE) {
    return usStates;
  }
}

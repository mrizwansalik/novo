import { get } from "lodash";
import moment from "moment";
import { IndustryCodeType } from "src/constants";
import { canadaProvinces } from "src/constants";
import { usStates } from "src/constants";
import { IIndustryCode } from "src/interfaces/industryCode";
import { ILocation, IRegion } from "src/interfaces/location";
import { IOrg } from "src/interfaces/org";
import { IOption } from "src/types";
export interface IFormValues {
  name: string;
  address: string;
  region: IRegion;
  city: IRegion;
  postal: string;
  codeType: string;
  effectiveMonth: IOption;
  effectiveYear: IOption;
  industryCode: IIndustryCode;
}

export function getYearOptions(): IOption[] {
  const currentYear = moment().format("YYYY");
  const nextYear = (Number(currentYear) + 1).toString();

  return [
    {
      label: currentYear,
      value: currentYear,
    },
    {
      label: nextYear,
      value: nextYear,
    },
  ];
}

export const allMonthOptions: IOption[] = [
  {
    label: "Jan",
    value: 1,
  },
  {
    label: "Feb",
    value: 2,
  },
  {
    label: "Mar",
    value: 3,
  },
  {
    label: "Apr",
    value: 4,
  },
  {
    label: "May",
    value: 5,
  },
  {
    label: "Jun",
    value: 6,
  },
  {
    label: "Jul",
    value: 7,
  },
  {
    label: "Aug",
    value: 8,
  },
  {
    label: "Sep",
    value: 9,
  },
  {
    label: "Oct",
    value: 10,
  },
  {
    label: "Nov",
    value: 11,
  },
  {
    label: "Dec",
    value: 12,
  },
];

export function getCurrentMonthOption(
  month: number,
  year: string | number
): IOption {
  const currentMonthOptions = getMonthOptions(year);
  const currentMonthOption = currentMonthOptions.find(
    (item) => item.value === month
  );
  return currentMonthOption;
}

export function getMonthOptions(year: string | number): IOption[] {
  const currentYear = moment().format("YYYY");
  const currentMonth = Number(moment().format("MM"));
  if (currentYear === year) {
    return allMonthOptions.slice(currentMonth - 1, 12);
  }

  return allMonthOptions.slice(0, currentMonth);
}

export function formatFormData(data: IFormValues, country: ILocation) {
  const codeType = get(data, "codeType");
  const isNaicsCode = codeType === IndustryCodeType.NAICS;
  const naics_code = isNaicsCode
    ? Number(get(data, "industryCode.code", null))
    : null;
  const naics_description = isNaicsCode
    ? get(data, "industryCode.description", "")
    : "";
  const sic_code = !isNaicsCode ? get(data, "industryCode.code", "") : "";
  const sic_description = !isNaicsCode
    ? get(data, "industryCode.description", "")
    : "";
  const effectiveYear = get(data, "effectiveYear.value");
  const effectiveMonth = get(data, "effectiveMonth.value");
  const effective_date = moment(`${effectiveYear}-${effectiveMonth}-01`).format(
    "YYYY-MM-DD"
  );
  const city_region_postal_code = `${get(data, "city.label")}, ${get(
    data,
    "region.name"
  )}, ${get(data, "postal")}`;
  let state_abbreviation = "";
  if (get(country, "name") === "United States") {
    state_abbreviation = usStates.find(
      (state) => state.id === get(data, "region.id")
    ).geoname_code;
  } else if (get(country, "name") === "Canada") {
    state_abbreviation = canadaProvinces.find(
      (state) => state.id === get(data, "region.id")
    ).geoname_code;
  }
  const formattedData = {
    effective_date,
    country: {
      id: get(country, "id"),
      name: get(country, "name"),
    },
    region: {
      id: get(data, "region.id"),
      name: get(data, "region.name"),
    },
    city: {
      id: get(data, "city.value"),
      name: get(data, "city.label"),
    },
    name: get(data, "name"),
    postal: get(data, "postal"),
    address: get(data, "address"),
    naics_code,
    naics_description,
    sic_code,
    sic_description,
    city_region_postal_code,
    state_abbreviation,
  };

  return formattedData;
}

export function formatRequestData(
  data: IFormValues,
  currentProspect: IOrg,
  country: ILocation
): IOrg {
  currentProspect.sic_code = "";
  currentProspect.sic_description = "";
  currentProspect.naics_code = null;
  currentProspect.naics_description = "";
  const formattedData = formatFormData(data, country);
  const requestData = {
    ...currentProspect,
    ...formattedData,
  };
  return requestData;
}

export function getOptionHeightDesktop(option): number {
  if (option.option.label.length <= 50) {
    return 50;
  }
  if (option.option.label.length <= 100) {
    return 75;
  }
  return 100;
}

export function getOptionHeightMobile(option): number {
  if (option.option.label.length <= 30) {
    return 50;
  }
  if (option.option.label.length <= 75) {
    return 85;
  }
  if (option.option.label.length <= 100) {
    return 100;
  }
  return 150;
}

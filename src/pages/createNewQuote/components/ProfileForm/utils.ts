import { get } from "lodash";
import moment from "moment";
import { addOrgToBrokerage } from "src/api/broker";
import { IndustryCodeType } from "src/constants";
import { IIndustryCode } from "src/interfaces/industryCode";
import { IOrg } from "src/interfaces/org";
import { IRegion } from "src/interfaces/region";
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

const allMonthOptions: IOption[] = [
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

export function getMonthOptions(year: string | number): IOption[] {
  const currentYear = moment().format("YYYY");
  const currentMonth = Number(moment().format("MM"));

  if (currentYear === year) {
    return allMonthOptions.slice(currentMonth - 1, 12);
  }

  return allMonthOptions.slice(0, currentMonth);
}

//TODO: suppose to send brokerageId to api, but not sure what the logic is, modify later
export async function upsertClientProfile(data: IFormValues, orgDetail: IOrg) {
  const country = get(orgDetail, "country.id", "");
  const censusData = get(orgDetail, "census_data");

  const orgData = formatFormData(data, country, censusData);
  const newOrg = await addOrgToBrokerage(orgData, get(orgDetail, "id"));
  return newOrg;
}

export function formatFormData(data: IFormValues, country: string, censusData) {
  const codeType = get(data, "codeType");
  const naicsCode =
    codeType === IndustryCodeType.NAICS
      ? Number(get(data, "industryCode.code"))
      : "";

  const effectiveYear = get(data, "effectiveYear.value");
  const effectiveMonth = get(data, "effectiveMonth.value");
  const effective_date = moment(`${effectiveYear}-${effectiveMonth}-01`).format(
    "YYYY-MM-DD"
  );

  const formattedData = {
    effective_date,
    country,
    region: get(data, "region.value"),
    city: get(data, "city.value"),
    name: get(data, "name"),
    postal: get(data, "postal"),
    address: get(data, "address"),
    census_data: censusData,
    naics_code: naicsCode,
    naics_description:
      codeType === IndustryCodeType.NAICS
        ? get(data, "industryCode.description")
        : "",
    sic_code:
      codeType === IndustryCodeType.SIC ? get(data, "industryCode.code") : "",
    sic_description:
      codeType === IndustryCodeType.SIC
        ? get(data, "industryCode.description")
        : "",
  };

  if (!naicsCode) {
    delete formattedData.naics_code;
  }

  return formattedData;
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

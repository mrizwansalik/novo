import { useEffect, useState } from "react";
import { get } from "lodash";
import { useForm, useWatch } from "react-hook-form";
import { getNaicsCodes, getSicCodes } from "src/api/industryCode";
import { getCities } from "src/api/region";
import { IndustryCodeType } from "src/constants";
import { IOption } from "src/types";
import { getRegionsByCountry } from "src/utils/regionService";
import { getMonthOptions, IFormValues } from "./utils";

function useProfileForm(countryName: string) {
  const [cityOptions, setCityOptions] = useState<IOption[]>([]);

  const [monthOptions, setMonthOptions] = useState<IOption[]>([]);

  const [sicCodes, setSicCodes] = useState<IOption[]>([]);
  const [naicsCodes, setNaicsCodes] = useState<IOption[]>([]);
  const [industryCodeOptions, setIndustryCodeOptions] = useState<IOption[]>([]);

  const formControl = useForm<IFormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { control, trigger, setValue } = formControl;

  const regionOptions = getRegionsByCountry(countryName);
  const selectedRegion = useWatch({
    control,
    name: "region",
  });

  const selectedYear = useWatch({
    control,
    name: "effectiveYear",
  });

  const selectedCodeType = useWatch({
    control,
    name: "codeType",
    defaultValue: "",
  });

  async function handleCityOptions(region: string, country: string) {
    const cities = await getCities("", region, country);
    const options =
      (Array.isArray(cities) &&
        cities.map((city) => ({ label: city.name, value: city.id }))) ||
      [];
    setCityOptions(options);
  }

  async function fetchIndustryCodeOptions(codeType: string) {
    if (codeType === IndustryCodeType.SIC && sicCodes.length === 0) {
      const fetchedCodes = await getSicCodes();
      const codeOptions = fetchedCodes.map((code) => ({
        ...code,
        label: `${code.description} ${code.code}`,
        value: `${code.code} ${code.description}`,
      }));
      setSicCodes(codeOptions);
    }

    if (codeType === IndustryCodeType.NAICS && naicsCodes.length === 0) {
      const fetchedCodes = await getNaicsCodes();
      const codeOptions = fetchedCodes.map((code) => ({
        ...code,
        label: `${code.description} ${code.code}`,
        value: `${code.code} ${code.description}`,
      }));
      setNaicsCodes(codeOptions);
    }
  }

  useEffect(() => {
    trigger();
  }, []);

  useEffect(() => {
    const regionName = get(selectedRegion, "name");
    if (!regionName) {
      setCityOptions([]);
    } else {
      handleCityOptions(regionName, countryName);
    }
  }, [selectedRegion]);

  useEffect(() => {
    setValue("effectiveMonth", null);
    trigger("effectiveMonth");
    const year = get(selectedYear, "value");
    if (year) {
      setMonthOptions(getMonthOptions(year));
    }
  }, [selectedYear]);

  useEffect(() => {
    if (selectedCodeType) {
      setValue("industryCode", null);
      trigger("industryCode");
      fetchIndustryCodeOptions(selectedCodeType);
    }
  }, [selectedCodeType]);

  useEffect(() => {
    if (selectedCodeType === IndustryCodeType.SIC) {
      setIndustryCodeOptions(sicCodes);
    } else {
      setIndustryCodeOptions(naicsCodes);
    }
  }, [selectedCodeType, sicCodes, naicsCodes]);

  return {
    formControl,
    regionOptions,
    cityOptions,
    monthOptions,
    selectedCodeType,
    industryCodeOptions,
  };
}

export default useProfileForm;

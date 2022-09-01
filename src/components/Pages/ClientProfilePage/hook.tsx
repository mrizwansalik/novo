import { useEffect, useState } from "react";
import { get } from "lodash";
import moment from "moment";
import { useForm, useWatch, useFormState } from "react-hook-form";
import { getNaicsCodes, getSicCodes } from "src/api/industryCode";
import { getCities } from "src/api/region";
import { IndustryCodeType } from "src/constants";
import { IOption } from "src/types";
import { getRegionsByCountry } from "src/utils/regionService";
import useStore from "src/utils/useStore";
import { getMonthOptions, IFormValues, getCurrentMonthOption } from "./utils";
function useProfileForm(countryName: string) {
  const { brokerProspectsListStore } = useStore();
  const { currentProspect } = brokerProspectsListStore;
  const [cityOptions, setCityOptions] = useState<IOption[]>([]);
  const [monthOptions, setMonthOptions] = useState<IOption[]>([]);
  const [sicCodes, setSicCodes] = useState<IOption[]>([]);
  const [naicsCodes, setNaicsCodes] = useState<IOption[]>([]);
  const [industryCodeOptions, setIndustryCodeOptions] = useState<IOption[]>([]);

  const currentRegion = get(currentProspect, "region", null);
  const currentCity = get(currentProspect, "city", null);
  const currentEffectiveDate = get(currentProspect, "effective_date", "");
  const currentEffectiveYear = moment(currentEffectiveDate).format("YYYY");
  const currentMonthOption = getCurrentMonthOption(
    Number(moment(currentEffectiveDate).format("MM")),
    currentEffectiveYear
  );
  const currentRegionOption = currentRegion
    ? {
        ...currentRegion,
        value: currentRegion.id,
        label: currentRegion.name,
      }
    : null;
  const currentCityOption = currentCity
    ? {
        ...currentCity,
        value: currentCity.id,
        label: currentCity.name,
      }
    : null;
  const industryCodeType = get(currentProspect, "sic_code", "")
    ? IndustryCodeType.SIC
    : IndustryCodeType.NAICS;
  const currentIndustryCode =
    industryCodeType === IndustryCodeType.SIC
      ? get(currentProspect, "sic_code", "")
      : get(currentProspect, "naics_code", "");
  const currentIndustryCodeDescription =
    industryCodeType === IndustryCodeType.SIC
      ? get(currentProspect, "sic_description", "")
      : get(currentProspect, "naics_description", "");
  const currentIndustryCodeOption = {
    value: `${currentIndustryCode} ${currentIndustryCodeDescription}`,
    label: `${currentIndustryCodeDescription} ${currentIndustryCode}`,
    code: currentIndustryCode,
    description: currentIndustryCodeDescription,
  };
  const formControl = useForm<IFormValues>({
    defaultValues: {
      name: get(currentProspect, "name", ""),
      address: get(currentProspect, "address", ""),
      region: currentRegionOption,
      city: currentCityOption,
      postal: get(currentProspect, "postal", ""),
      codeType: industryCodeType,
      effectiveYear: {
        value: currentEffectiveYear,
        label: currentEffectiveYear,
      },
      effectiveMonth: currentMonthOption ? currentMonthOption : null,
      industryCode: currentIndustryCodeOption,
    },
  });

  const { control, trigger, setValue } = formControl;
  const { dirtyFields } = useFormState({ control });
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
    if (dirtyFields.region) {
      setValue("city", null);
      trigger("city");
      if (selectedRegion.id === currentRegion.id) {
        setValue("city", currentCityOption);
      }
    }
    if (!regionName) {
      setCityOptions([]);
    } else {
      handleCityOptions(regionName, countryName);
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (dirtyFields.effectiveYear) {
      setValue("effectiveMonth", null);
      trigger("effectiveMonth");
    } else {
      if (selectedYear.value === currentEffectiveYear) {
        setValue("effectiveMonth", currentMonthOption);
      }
    }
    const year = get(selectedYear, "value");
    if (year) {
      setMonthOptions(getMonthOptions(year));
    }
  }, [selectedYear]);

  useEffect(() => {
    if (dirtyFields.codeType || dirtyFields.industryCode) {
      setValue("industryCode", null);
      trigger("industryCode");
    } else {
      if (selectedCodeType === industryCodeType) {
        setValue("industryCode", currentIndustryCodeOption);
      }
    }
    if (selectedCodeType) {
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

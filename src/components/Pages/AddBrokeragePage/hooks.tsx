import { useEffect, useState } from "react";
import { get } from "lodash";
import { useForm, useWatch } from "react-hook-form";
import { getCities, getRegions } from "src/api/region";
import { IOption } from "src/types";
import { IBroker } from "../../../interfaces/broker";
import { INewOrgFormValues } from "../../../interfaces/org";

function useAddBrokerageForm() {
  const [cityOptions, setCityOptions] = useState<IOption[]>([]);
  const [regionOptions, setRegionOptions] = useState<IOption[]>([]);

  const formControl = useForm<IBroker & INewOrgFormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { control, trigger, setValue } = formControl;

  const selectedCountry = useWatch({
    control,
    name: "country",
  });

  const selectedRegion = useWatch({
    control,
    name: "region",
  });

  async function handleRegionOptions(country: string) {
    const regions = await getRegions(country);
    const options =
      (Array.isArray(regions) &&
        regions.map((region) => ({
          label: region.name,
          value: region.id,
          ...region,
        }))) ||
      [];
    setValue("region", null);
    setValue("city", null);
    setRegionOptions(options);
  }

  async function handleCityOptions(country: string, region: string) {
    const cities = await getCities("", region, country);
    const options =
      (Array.isArray(cities) &&
        cities.map((city) => ({
          label: city.name,
          value: city.id,
          ...city,
        }))) ||
      [];
    setValue("city", null);
    setCityOptions(options);
  }

  useEffect(() => {
    trigger();
  }, []);

  useEffect(() => {
    const countryName = get(selectedCountry, "name");
    if (!countryName) {
      setRegionOptions([]);
    } else {
      handleRegionOptions(countryName);
    }
  }, [selectedCountry]);

  useEffect(() => {
    const countryName = get(selectedCountry, "name");
    const regionName = get(selectedRegion, "name");
    if (!countryName || !regionName) {
      setCityOptions([]);
    } else {
      handleCityOptions(countryName, regionName);
    }
  }, [selectedRegion]);

  return {
    formControl,
    regionOptions,
    cityOptions,
  };
}

export default useAddBrokerageForm;

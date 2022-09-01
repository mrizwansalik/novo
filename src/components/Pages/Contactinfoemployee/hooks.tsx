import { useEffect, useState } from "react";
import { get } from "lodash";
import { useForm, useWatch } from "react-hook-form";
import { getCities } from "src/api/region";
import { IEmployeeDetail } from "src/interfaces/employee";
import { IOption } from "src/types";

function useEmployeeDetailForm() {
  const [cityOptions, setCityOptions] = useState<IOption[]>([]);

  const formControl = useForm<IEmployeeDetail>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { control, trigger, setValue } = formControl;

  const selectedstate = useWatch({
    control,
    name: "state_abbreviation",
  });

  async function handleCityOptions(region: string) {
    const country = "United States";
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
    const stateName = get(selectedstate, "name");
    if (!stateName) {
      setCityOptions([]);
    } else {
      handleCityOptions(stateName);
    }
  }, [selectedstate]);

  return {
    formControl,
    cityOptions,
  };
}

export default useEmployeeDetailForm;

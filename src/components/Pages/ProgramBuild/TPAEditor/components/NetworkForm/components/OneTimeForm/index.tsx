import { Controller, useFormContext } from "react-hook-form";
import { handleNumberSeparatorInput } from "src/utils/form";
import { SubNetworkFormValues } from "../../../../constants";
import {
  RelativeBlock,
  InputWithPrefix,
  CommonInput,
  PercentageSymbol,
} from "./oneTimeForm.styles";

const OneTimeForm = () => {
  const { control } = useFormContext();

  return (
    <RelativeBlock>
      <InputWithPrefix>
        <Controller
          name={SubNetworkFormValues.AMOUNT_NUMBER}
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <CommonInput
              {...field}
              defaultValue={0}
              onInput={handleNumberSeparatorInput}
            />
          )}
        />
      </InputWithPrefix>
      <PercentageSymbol>%</PercentageSymbol>
    </RelativeBlock>
  );
};

export default OneTimeForm;

import { Controller, useFormContext } from "react-hook-form";
import { handleNumberSeparatorInput } from "src/utils/form";
import { PharmacyBenefitFormValues } from "../../../../constants";
import {
  RelativeBlock,
  InputWithPrefix,
  CommonInput,
  PercentageSymbol,
} from "./pepmForm.styles";

const PEPMForm = () => {
  const { control } = useFormContext();

  return (
    <RelativeBlock>
      <InputWithPrefix>
        <Controller
          name={PharmacyBenefitFormValues.AMOUNT_NUMBER}
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
      <PercentageSymbol>$</PercentageSymbol>
    </RelativeBlock>
  );
};

export default PEPMForm;

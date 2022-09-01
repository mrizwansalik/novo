import get from "lodash/get";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import ErrorMessage from "src/components/ErrorMessage";
import { ClaimsHistoryFormValues } from "src/pages/createNewQuote/HealthClaimsHistoryPage/constant";
import { handleNumberSeparatorInput } from "src/utils/form";
import {
  Container,
  CheckboxWithLabel,
  Checkbox,
  Label,
  CommonInput,
  RelativeBlock,
  InputWithPrefix,
  PrefixSymbol,
} from "./inputCheckbox.styles";

interface IInputWithCheckboxProps {
  label: string;
  order: number;
}

const InputWithCheckbox = (props: IInputWithCheckboxProps) => {
  const { label, order } = props;
  const { control, formState } = useFormContext();
  const { errors } = formState;
  const monthClaims = useWatch({
    control,
    name: ClaimsHistoryFormValues.MONTHLY_CLAIM,
  });

  return (
    <Container>
      <CheckboxWithLabel>
        <Controller
          name={`${ClaimsHistoryFormValues.MONTHLY_CLAIM}[${order}].checked`}
          control={control}
          render={({ field }) => (
            <Checkbox
              checked={get(monthClaims, `[${order}].checked`, true)}
              {...field}
              type="checkbox"
            />
          )}
        />
        <Label>{label}</Label>
      </CheckboxWithLabel>
      <RelativeBlock>
        <InputWithPrefix>
          <Controller
            name={`${ClaimsHistoryFormValues.MONTHLY_CLAIM}[${order}].amount`}
            control={control}
            render={({ field }) => (
              <CommonInput
                {...field}
                disabled={!get(monthClaims, `[${order}].checked`, true)}
                onInput={handleNumberSeparatorInput}
              />
            )}
          />
        </InputWithPrefix>
        <PrefixSymbol>$</PrefixSymbol>
        <ErrorMessage>
          {get(
            errors,
            `${ClaimsHistoryFormValues.MONTHLY_CLAIM}[${order}].message`,
            ""
          )}
        </ErrorMessage>
      </RelativeBlock>
    </Container>
  );
};

export default InputWithCheckbox;

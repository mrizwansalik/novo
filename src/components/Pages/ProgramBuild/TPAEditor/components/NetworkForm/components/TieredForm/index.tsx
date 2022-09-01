import { Controller, useFormContext } from "react-hook-form";
import { handleNumberSeparatorInput } from "src/utils/form";
import { SubNetworkFormValues } from "../../../../constants";
import {
  Container,
  RelativeBlock,
  InputWithPrefix,
  CommonInput,
  PercentageSymbol,
  TextFieldLayout,
  CommonTitle,
} from "./tieredForm.styles";

const TieredForm = () => {
  const { control } = useFormContext();

  return (
    <Container>
      <TextFieldLayout xl="3">
        <CommonTitle>EE</CommonTitle>
        <RelativeBlock>
          <InputWithPrefix>
            <Controller
              name={SubNetworkFormValues.AMOUNT_EMPLOYEE}
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
      </TextFieldLayout>
      <TextFieldLayout xl="3">
        <CommonTitle>ES</CommonTitle>
        <RelativeBlock>
          <InputWithPrefix>
            <Controller
              name={SubNetworkFormValues.AMOUNT_SPOUSE}
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
      </TextFieldLayout>
      <TextFieldLayout xl="3">
        <CommonTitle>EC</CommonTitle>
        <RelativeBlock>
          <InputWithPrefix>
            <Controller
              name={SubNetworkFormValues.AMOUNT_CHILDREN}
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
      </TextFieldLayout>
      <TextFieldLayout xl="3">
        <CommonTitle>EF</CommonTitle>
        <RelativeBlock>
          <InputWithPrefix>
            <Controller
              name={SubNetworkFormValues.AMOUNT_FAMILY}
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
      </TextFieldLayout>
    </Container>
  );
};

export default TieredForm;

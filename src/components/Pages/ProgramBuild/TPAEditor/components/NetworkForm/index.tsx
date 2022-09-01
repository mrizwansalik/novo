import { Controller, useFormContext, useWatch } from "react-hook-form";
import ColNoSpacing from "src/components/ColNoSpacing";
import { NetworkAmountType } from "src/constants/enum/network";
import { SubNetworkFormValues } from "../../constants";
import CustomForm from "./components/CustomForm";
import OneTimeForm from "./components/OneTimeForm";
import PEPMForm from "./components/PEPMForm";
import TieredForm from "./components/TieredForm";
import { getAmountTypeOptions } from "./constants";
import {
  Container,
  CommonTitle,
  CommonInput,
  CommonSelect,
  NameInput,
  LargeSpacing,
} from "./networkForm.styles";

const NetworkForm = () => {
  const { control } = useFormContext();
  const amountType: NetworkAmountType =
    useWatch({
      control,
      name: SubNetworkFormValues.SUB_NETWORK_AMOUNT_TYPE,
    })?.value || getAmountTypeOptions()[0]?.value;

  return (
    <Container>
      <NameInput xl="12" lg="12" md="12" sm="12" xs="12">
        <CommonTitle>Name</CommonTitle>
        <Controller
          name={SubNetworkFormValues.NAME}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CommonInput {...field} defaultValue="" underline />
          )}
        />
      </NameInput>
      <ColNoSpacing xl="12" lg="12" md="12" sm="12" xs="12">
        <LargeSpacing>
          <Controller
            name={SubNetworkFormValues.SUB_NETWORK_AMOUNT_TYPE}
            control={control}
            defaultValue={getAmountTypeOptions()[0]}
            render={({ field }) => (
              <CommonSelect
                {...field}
                options={getAmountTypeOptions()}
                defaultValue={getAmountTypeOptions()[0]}
              />
            )}
          />
        </LargeSpacing>
        {amountType === NetworkAmountType.FIXED_PER_EMPLOYEE_PER_MONTH && (
          <LargeSpacing>
            <PEPMForm />
          </LargeSpacing>
        )}
        {amountType ===
          NetworkAmountType.FOUR_TIER_FIXED_PER_EMPLOYEE_PER_MONTH && (
          <LargeSpacing>
            <TieredForm />
          </LargeSpacing>
        )}
        {amountType === NetworkAmountType.ONE_TIME_FEE && (
          <LargeSpacing>
            <OneTimeForm />
          </LargeSpacing>
        )}
        {amountType === NetworkAmountType.CUSTOM_TEXT && (
          <LargeSpacing>
            <CustomForm />
          </LargeSpacing>
        )}
      </ColNoSpacing>
    </Container>
  );
};

export default NetworkForm;

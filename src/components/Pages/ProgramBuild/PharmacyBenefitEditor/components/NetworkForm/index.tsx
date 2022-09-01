import { Controller, useFormContext } from "react-hook-form";
import ColNoSpacing from "src/components/ColNoSpacing";
import { PharmacyBenefitFormValues } from "../../constants";
import PEPMForm from "./components/PEPMForm";
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

  return (
    <Container>
      <NameInput xl="12" lg="12" md="12" sm="12" xs="12">
        <CommonTitle>Name</CommonTitle>
        <Controller
          name={PharmacyBenefitFormValues.NAME}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CommonInput {...field} defaultValue="" underline />
          )}
        />
      </NameInput>
      <ColNoSpacing xl="12" lg="12" md="12" sm="12" xs="12">
        <LargeSpacing />
        <LargeSpacing>
          <Controller
            name={PharmacyBenefitFormValues.SUB_NETWORK_AMOUNT_TYPE}
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
        <LargeSpacing>
          <PEPMForm />
        </LargeSpacing>
      </ColNoSpacing>
    </Container>
  );
};

export default NetworkForm;

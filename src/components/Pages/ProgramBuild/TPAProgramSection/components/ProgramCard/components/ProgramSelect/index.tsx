import { Fragment } from "react";
import { observer } from "mobx-react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import {
  NetworkCategory,
  ThirdPartyAdministratorFormValues,
} from "src/constants";
import { ITpa } from "src/interfaces/benefit";
import { INetworkIngredientWithTPAs } from "src/interfaces/network";
import { IOption } from "src/types";
import useStore from "src/utils/useStore";
import {
  extractProgramByCategory,
  getThirdPartyAdministratorOptions,
} from "../../../../../../../../pages/createNewQuote/ProgramBuildThirdPartyAdministratorsPage/utils";
import { Container, Option, ScrollWrapper } from "./programSection.styles";

interface IProgramSelectProps {
  tpaOrder: number;
  tpa: ITpa;
}

const ProgramSelect = (props: IProgramSelectProps) => {
  const { tpaOrder, tpa } = props;
  const options = getThirdPartyAdministratorOptions();
  const { control } = useFormContext();
  const { programBuildStore } = useStore();
  const programSelect: NetworkCategory =
    useWatch({
      control,
      name: `${ThirdPartyAdministratorFormValues.PROGRAM_SELECT}[${tpaOrder}].category`,
    }) || options[0].value;

  return (
    <Container>
      <ScrollWrapper>
        {Array.isArray(options) &&
          options?.map((option: IOption, index: number) => {
            const networkIngredients: INetworkIngredientWithTPAs[] = extractProgramByCategory(
              programBuildStore?.networkIngredientWithTPAs,
              {},
              tpa,
              [option?.value as NetworkCategory]
            );

            return (
              <Fragment key={index}>
                {Array.isArray(networkIngredients) &&
                  networkIngredients?.length > 0 && (
                    <Controller
                      name={`${ThirdPartyAdministratorFormValues.PROGRAM_SELECT}[${tpaOrder}].category`}
                      control={control}
                      defaultValue={options[0].value}
                      render={({ field }) => (
                        <Option
                          isActive={programSelect === option.value}
                          onClick={() => field.onChange(option.value)}
                          key={index}
                        >
                          {option?.label}
                        </Option>
                      )}
                    />
                  )}
              </Fragment>
            );
          })}
      </ScrollWrapper>
    </Container>
  );
};

export default observer(ProgramSelect);

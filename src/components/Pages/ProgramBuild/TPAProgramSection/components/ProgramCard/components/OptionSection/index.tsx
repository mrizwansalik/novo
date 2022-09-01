import { useMemo } from "react";
import get from "lodash/get";
import { observer } from "mobx-react";
import { useFormContext, useWatch, Controller } from "react-hook-form";
import { useParams } from "react-router";
import {
  NetworkTPAType,
  ThirdPartyAdministratorFormValues,
} from "src/constants";
import { ITpa } from "src/interfaces/benefit";
import { INetworkIngredientWithTPAs } from "src/interfaces/network";
import {
  extractProgramByCategory,
  getNetworkTpaType,
} from "src/pages/createNewQuote/ProgramBuildThirdPartyAdministratorsPage/utils";
import { handleSelectSubTPA } from "src/pages/createNewQuote/ProgramBuildThirdPartyAdministratorsPage/utils/form";
import useStore from "src/utils/useStore";
import { NetworkCategory } from "../../../../../../../../constants/enum";
import { getThirdPartyAdministratorOptions } from "../../../../../../../../pages/createNewQuote/ProgramBuildThirdPartyAdministratorsPage/utils";
import {
  Container,
  OptionContainer,
  Checkbox,
  Title,
  ScrollWrapper,
} from "./optionAccess.styles";

interface IOptionSectionProps {
  tpa: ITpa;
  tpaOrder: number;
}

const OptionSection = (props: IOptionSectionProps) => {
  const { tpa, tpaOrder } = props;
  const { programBuildStore } = useStore();
  const { control, getValues } = useFormContext();
  const options = getThirdPartyAdministratorOptions();
  const params = useParams();
  const orgId: string = get(params, "orgId", "");
  const prospectId: string = get(params, "prospectId", "");
  const recipeId: string = get(params, "recipeId", "");

  const programCategory: NetworkCategory =
    useWatch({
      name: `${ThirdPartyAdministratorFormValues.PROGRAM_SELECT}[${tpaOrder}].category`,
      control,
    }) || options[0].value;

  const vendorSelects = useWatch({
    name: `${ThirdPartyAdministratorFormValues.VENDOR_SELECT}[${tpaOrder}]`,
    control,
  });

  const tpaSelect: boolean = useWatch({
    control,
    name: `${ThirdPartyAdministratorFormValues.TPA_SELECT}[${tpaOrder}]`,
  });

  const networkIngredients: INetworkIngredientWithTPAs[] = useMemo(
    () =>
      extractProgramByCategory(
        programBuildStore?.networkIngredientWithTPAs,
        {},
        tpa,
        [programCategory]
      ),
    [programBuildStore?.networkIngredientWithTPAs, tpa, programCategory]
  );

  return (
    <Container>
      <Title>Options</Title>
      <ScrollWrapper>
        {Array.isArray(networkIngredients) &&
          networkIngredients?.map(
            (networkIngredient: INetworkIngredientWithTPAs, index: number) => {
              const networkTpaType: NetworkTPAType = getNetworkTpaType(
                networkIngredient?.tpas
              );

              const isDefaultOption: boolean =
                !tpa?.minimum_group_size &&
                programCategory === NetworkCategory.PROVIDER_ACCESS
                  ? false
                  : networkTpaType === NetworkTPAType.DEFAULT;

              return (
                <Controller
                  key={networkIngredient?.id}
                  name={`${
                    ThirdPartyAdministratorFormValues.VENDOR_SELECT
                  }[${tpaOrder}].${`${tpa?.id}+join+${networkIngredient?.id}`}`}
                  control={control}
                  defaultValue={
                    get(
                      vendorSelects,
                      `${tpa?.id}+join+${networkIngredient?.id}`,
                      false
                    ) || networkTpaType === NetworkTPAType.MANDATORY
                  }
                  render={({ field }) => {
                    return (
                      <OptionContainer isBold={isDefaultOption} key={index}>
                        <Checkbox
                          {...field}
                          value={field?.value || isDefaultOption}
                          checked={
                            get(
                              vendorSelects,
                              `${tpa?.id}+join+${networkIngredient?.id}`,
                              false
                            ) || networkTpaType === NetworkTPAType.MANDATORY
                          }
                          onChange={(event) => {
                            field.onChange(event?.target?.checked);
                            if (tpaSelect) {
                              handleSelectSubTPA(
                                programBuildStore,
                                tpa,
                                getValues,
                                tpaOrder,
                                orgId,
                                prospectId,
                                recipeId
                              );
                            }
                          }}
                          type="checkbox"
                          disabled={networkTpaType === NetworkTPAType.MANDATORY}
                        />
                        {`${networkIngredient?.name}${
                          isDefaultOption ? " (Default)" : ""
                        }`}
                      </OptionContainer>
                    );
                  }}
                />
              );
            }
          )}
      </ScrollWrapper>
    </Container>
  );
};

export default observer(OptionSection);

import { useMemo, useRef } from "react";
import get from "lodash/get";
import { observer } from "mobx-react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import { useParams } from "react-router";
import Icon from "src/components/Icon";
import {
  NetworkCategory,
  ThirdPartyAdministratorFormValues,
} from "src/constants";
import { ITpa } from "src/interfaces/benefit";
import {
  checkSelectedTPAs,
  countProgramByCategory,
} from "src/pages/createNewQuote/ProgramBuildThirdPartyAdministratorsPage/utils";
import { handleSelectTPA } from "src/pages/createNewQuote/ProgramBuildThirdPartyAdministratorsPage/utils/form";
import useStore from "src/utils/useStore";
import {
  Container,
  TitleContainer,
  RequestSection,
  RequestLabel,
  ArrowSection,
  Checkbox,
  TextWrapper,
  TitleText,
  WarningText,
  LabelWrapper,
  CheckboxWrapper,
  TooltipContainer,
  TooltipContent,
} from "./header.styles";

interface IHeaderProps {
  isCollapse: boolean;
  setIsCollapse: (isCollapse: boolean) => void;
  tpa: ITpa;
  tpaOrder: number;
  totalOfProviderAccesses: number;
  totalOfPharmacyBenefitManager: number;
  totalOfOthers: number;
}

const Header = (props: IHeaderProps) => {
  const {
    isCollapse,
    setIsCollapse,
    tpa,
    tpaOrder,
    totalOfProviderAccesses,
    totalOfPharmacyBenefitManager,
    totalOfOthers,
  } = props;
  const { control, getValues } = useFormContext();
  const { programBuildStore } = useStore();
  const params = useParams();
  const orgId: string = get(params, "orgId", "");
  const prospectId: string = get(params, "prospectId", "");
  const recipeId: string = get(params, "recipeId", "");
  const tooltipRef = useRef();
  const isDefaultChecked: boolean = checkSelectedTPAs(programBuildStore, tpa);
  const tpaSelectValue: boolean =
    useWatch({
      control,
      name: `${ThirdPartyAdministratorFormValues.TPA_SELECT}[${tpaOrder}]`,
    }) || false;

  const networkCategoryTree = useWatch({
    control,
    name: `${ThirdPartyAdministratorFormValues.NETWORK_CATEGORY_TREE}[${tpaOrder}]`,
  });

  const numberOfProviderAccesses = useMemo(
    () =>
      countProgramByCategory(programBuildStore, tpa, [
        NetworkCategory.PROVIDER_ACCESS,
      ]),
    [programBuildStore?.networkIngredientWithTPAs]
  );

  const numberOfPBMsAccesses = useMemo(
    () =>
      countProgramByCategory(programBuildStore, tpa, [
        NetworkCategory.PHARMACY_BENEFIT_MANAGER,
      ]),
    [programBuildStore?.networkIngredientWithTPAs]
  );

  const numberOfOthers = useMemo(
    () =>
      countProgramByCategory(programBuildStore, tpa, [
        NetworkCategory.NAVIGATION,
        NetworkCategory.MEDICAL_MANAGEMENT,
        NetworkCategory.VIRTUAL_PRIMARY_CARE,
        NetworkCategory.TELE_HEALTH,
        NetworkCategory.RX_SOLUTIONS,
        NetworkCategory.BUNDLED_SERVICES,
        NetworkCategory.MISC,
      ]),
    [programBuildStore?.networkIngredientWithTPAs]
  );

  const displayProviderAccessTooltip: boolean =
    !networkCategoryTree?.providerAccessTpas?.provider_access?.length &&
    tpa?.minimum_group_size > 0 &&
    isDefaultChecked;

  const displayPBMsTooltip: boolean =
    !networkCategoryTree?.pbmTpas?.pharmacy_benefit_manager?.length &&
    tpa?.minimum_group_size > 0 &&
    isDefaultChecked;

  const isDisabledOption: boolean =
    !tpa?.minimum_group_size ||
    !networkCategoryTree?.rawProviderAccessTpas?.provider_access?.length ||
    !networkCategoryTree?.rawPbmTpas?.pharmacy_benefit_manager?.length;

  return (
    <Container>
      <TitleContainer xl="4" lg="12" md="12" sm="12" xs="12">
        <CheckboxWrapper>
          <Controller
            control={control}
            name={`${ThirdPartyAdministratorFormValues.TPA_SELECT}[${tpaOrder}]`}
            defaultValue={isDefaultChecked}
            render={({ field }) => {
              return (
                <Checkbox
                  innerRef={tooltipRef}
                  onChange={(event) => {
                    handleSelectTPA(
                      programBuildStore,
                      tpa,
                      getValues,
                      tpaOrder,
                      orgId,
                      prospectId,
                      recipeId,
                      event?.target?.checked
                    );
                    field.onChange(event?.target?.checked);
                  }}
                  type="checkbox"
                  disabled={isDisabledOption}
                  checked={tpaSelectValue}
                />
              );
            }}
          />
        </CheckboxWrapper>
        <TextWrapper>
          <TitleText>{tpa?.name}</TitleText>
          {isDisabledOption && (
            <WarningText>Insufficient supporting ingredients</WarningText>
          )}
        </TextWrapper>
      </TitleContainer>
      {tooltipRef?.current && !isDisabledOption && (
        <TooltipContainer
          isOpen={displayProviderAccessTooltip || displayPBMsTooltip}
          placement="left"
          target={tooltipRef}
        >
          <TooltipContent>
            {displayProviderAccessTooltip
              ? "Please Select a Provider Access"
              : displayPBMsTooltip
              ? "Please Select a PBM"
              : ""}
          </TooltipContent>
        </TooltipContainer>
      )}
      <RequestSection xl="7" lg="12" md="12" sm="12" xs="12">
        <LabelWrapper>
          <RequestLabel>{`${numberOfProviderAccesses} of ${totalOfProviderAccesses} requested`}</RequestLabel>
          <RequestLabel>{`${numberOfPBMsAccesses} of ${totalOfPharmacyBenefitManager} requested`}</RequestLabel>
          <RequestLabel>{`${numberOfOthers} of ${totalOfOthers} requested`}</RequestLabel>
        </LabelWrapper>
      </RequestSection>
      <ArrowSection
        xl="1"
        lg="12"
        md="12"
        sm="12"
        xs="12"
        onClick={() => {
          setIsCollapse(!isCollapse);
        }}
      >
        <Icon
          iconName={
            !isCollapse
              ? "upChevronArrow64px-blue.png"
              : "downChevronArrow64px-blue.png"
          }
        />
      </ArrowSection>
    </Container>
  );
};

export default observer(Header);

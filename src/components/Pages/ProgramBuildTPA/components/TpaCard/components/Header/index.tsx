import React, { useEffect, useRef, useState } from "react";
import { get } from "lodash";
import { observer } from "mobx-react";
import { useParams } from "react-router";
import Icon from "src/components/Icon";
import {
  getNetworkCount,
  getPbmCount,
  getVendorCount,
  onChangeTpaSelection,
  supportsAnyPBMandNetwork,
} from "src/components/Pages/ProgramBuildTPA/utils";
import { NETWORK_INGREDIENT_TYPE } from "src/constants";

import { ITpa } from "src/interfaces/benefit";
import { IParamTypes } from "src/types";
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
  tpa: ITpa;
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
}

const Header = (props: IHeaderProps) => {
  const { brokerageId, prospectId, recipeId } = useParams<IParamTypes>();
  const { isExpanded, setIsExpanded, tpa } = props;
  const { programStore, programBuildTpaStore } = useStore();
  const { orgRecipe } = programStore;
  const [toolTipReady, setToolTipReady] = useState(false);
  const tooltipRef = useRef();

  const subNetworkCount = get(orgRecipe, "sub_networks", []).length;
  const pbmsCount = get(orgRecipe, "pbms", []).length;
  const costContainmentVendorsCount = get(
    orgRecipe,
    "cost_containment_vendors",
    []
  ).length;

  const tpaIngredients = get(tpa, "ingredients", []);
  const pbmSelected = tpaIngredients.filter((ingredient) => {
    if (
      ingredient.type === NETWORK_INGREDIENT_TYPE.PBM &&
      ingredient.selected === true
    ) {
      return true;
    }
    return false;
  });
  const ingredientSelected = tpaIngredients.filter((ingredient) => {
    if (
      ingredient.type === NETWORK_INGREDIENT_TYPE.SUB_NET &&
      ingredient.selected === true
    ) {
      return true;
    }
    if (
      ingredient.type === NETWORK_INGREDIENT_TYPE.RBP &&
      ingredient.selected === true
    ) {
      return true;
    }
    return false;
  });
  const hasPbmError = tpa.selected && pbmSelected.length === 0;
  const hasProviderAccessError =
    tpa.selected && ingredientSelected.length === 0;

  function handleClickTpaCheckbox() {
    if (!tpa.selected) {
      setIsExpanded(true);
    }
    const tpaData = {
      ...tpa,
      selected: !tpa.selected,
    };
    onChangeTpaSelection(
      tpaData,
      orgRecipe,
      programBuildTpaStore,
      brokerageId,
      prospectId,
      recipeId,
      undefined
    );
  }

  useEffect(() => {
    if (tooltipRef.current) {
      setToolTipReady(true);
    }
  }, [tooltipRef.current]);

  return (
    <Container>
      <TitleContainer xl="4" lg="12" md="12" sm="12" xs="12">
        <CheckboxWrapper ref={tooltipRef} id={tpa.id}>
          <Checkbox
            type="checkbox"
            checked={tpa.selected}
            disabled={!supportsAnyPBMandNetwork(tpa)}
            onClick={handleClickTpaCheckbox}
          />
        </CheckboxWrapper>
        <TextWrapper>
          <TitleText>{tpa?.name}</TitleText>
          {!supportsAnyPBMandNetwork(tpa) && (
            <WarningText>Insufficient supporting ingredients</WarningText>
          )}
        </TextWrapper>
      </TitleContainer>
      {toolTipReady && hasPbmError && !hasProviderAccessError && (
        <TooltipContainer
          isOpen={hasPbmError}
          placement="left"
          target={tooltipRef.current}
        >
          <TooltipContent>Please Select a PBM</TooltipContent>
        </TooltipContainer>
      )}
      {toolTipReady && hasProviderAccessError && (
        <TooltipContainer
          isOpen={hasProviderAccessError}
          placement="left"
          target={tooltipRef.current}
        >
          <TooltipContent>Please Select a Provider Access</TooltipContent>
        </TooltipContainer>
      )}
      <RequestSection xl="7" lg="12" md="12" sm="12" xs="12">
        <LabelWrapper>
          <RequestLabel>{`${getNetworkCount(
            tpa,
            orgRecipe
          )} of ${subNetworkCount} requested`}</RequestLabel>
          <RequestLabel>{`${getPbmCount(
            tpa,
            orgRecipe
          )} of ${pbmsCount} requested`}</RequestLabel>
          <RequestLabel>{`${getVendorCount(
            tpa,
            orgRecipe
          )} of ${costContainmentVendorsCount} requested`}</RequestLabel>
        </LabelWrapper>
      </RequestSection>
      <ArrowSection
        xl="1"
        lg="12"
        md="12"
        sm="12"
        xs="12"
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <Icon
          iconName={
            isExpanded
              ? "upChevronArrow64px-blue.png"
              : "downChevronArrow64px-blue.png"
          }
        />
      </ArrowSection>
    </Container>
  );
};

export default observer(Header);

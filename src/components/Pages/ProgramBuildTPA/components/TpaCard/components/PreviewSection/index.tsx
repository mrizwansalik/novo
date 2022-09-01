import React from "react";
import { get } from "lodash";
import { observer } from "mobx-react";
import { tpaIngredientTypes } from "src/constants/tpa";
import { ITpa } from "src/interfaces/benefit";

import {
  Container,
  NameWrapper,
  SpaceBottomDiv,
  SummarySection,
} from "./previewSection.styles";
import {
  getNetworkIngredientTypeNameByCode,
  groupIngredientsBySubTypes,
  groupIngredientsByTypes,
  tpaHasIngredientsSelectedOfType,
} from "./utils";

interface IPreviewSectionProps {
  tpa: ITpa;
}

const randomColors = [
  "#90ee90",
  "#f1c40f",
  "#d500f9",
  "#2ecc71",
  "#ffc107",
  "#8bc34a",
  "#d15030",
  "#7d240e",
];

const PreviewSection = (props: IPreviewSectionProps) => {
  const { tpa } = props;
  const ingredients = get(tpa, "ingredients", []);
  const selectedIngredientsByTypes = tpaIngredientTypes.filter((item) =>
    tpaHasIngredientsSelectedOfType(tpa, item)
  );
  const {
    subNetwork,
    referenceBasedPricing,
    pharmacyBenefitManager,
  } = groupIngredientsByTypes(ingredients);

  const providerIngredients = [...subNetwork, ...referenceBasedPricing];

  return (
    <Container>
      <h3>Summary</h3>
      <SpaceBottomDiv>
        <h3>Required (at least one or more Networks & PBMs are required)</h3>
        <SummarySection color="#0097f5">
          <p>Provider Access:</p>
          <div>
            {Array.isArray(providerIngredients) &&
              providerIngredients.map((item, index) => {
                return (
                  <NameWrapper>
                    {index > 0 && <span>, &nbsp;</span>}
                    <span>{item.name}</span>
                  </NameWrapper>
                );
              })}
          </div>
        </SummarySection>
      </SpaceBottomDiv>
      <SpaceBottomDiv>
        <SummarySection color="#4127fb">
          <p>PBMs:</p>
          <div>
            {Array.isArray(pharmacyBenefitManager) &&
              pharmacyBenefitManager.map((item, index) => {
                return (
                  <NameWrapper>
                    {index > 0 && <span>, &nbsp;</span>}
                    <span>{item.name}</span>
                  </NameWrapper>
                );
              })}
          </div>
        </SummarySection>
      </SpaceBottomDiv>
      {selectedIngredientsByTypes.map((tpaIngredientType) => {
        const ingredientMapping = groupIngredientsBySubTypes(
          ingredients,
          tpaIngredientType
        );
        return (
          <SpaceBottomDiv>
            <h3>{tpaIngredientType.label}</h3>
            {Object.keys(ingredientMapping).map((category, index) => {
              return (
                <SummarySection color={randomColors[index]}>
                  <p>{getNetworkIngredientTypeNameByCode(category)}:</p>
                  <div>
                    {Array.isArray(ingredientMapping[category]) &&
                      ingredientMapping[category].map((item, index) => {
                        return (
                          <span>
                            {index > 0 && <span>, &nbsp;</span>}
                            <span>{item.name}</span>
                          </span>
                        );
                      })}
                  </div>
                </SummarySection>
              );
            })}
          </SpaceBottomDiv>
        );
      })}
    </Container>
  );
};

export default observer(PreviewSection);

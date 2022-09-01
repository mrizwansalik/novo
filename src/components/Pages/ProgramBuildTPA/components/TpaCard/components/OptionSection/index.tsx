import React from "react";
import { get } from "lodash";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import {
  filterActiveIngredients,
  onChangeTpaSelection,
} from "src/components/Pages/ProgramBuildTPA/utils";
import { ITpa } from "src/interfaces/benefit";
import { IParamTypes } from "src/types";
import useStore from "src/utils/useStore";
import {
  Container,
  Title,
  ScrollWrapper,
  OptionContainer,
  Checkbox,
} from "./optionAccess.styles";

interface IOptionSectionProps {
  tpa: ITpa;
  activeTab: string;
}

const OptionSection = (props: IOptionSectionProps) => {
  const { tpa, activeTab } = props;
  const { brokerageId, prospectId, recipeId } = useParams<IParamTypes>();
  const { programStore, programBuildTpaStore } = useStore();
  const { orgRecipe } = programStore;

  const tpaIngredients = get(tpa, "ingredients", []);
  const ingredients = tpaIngredients.filter((ingredient) =>
    filterActiveIngredients(activeTab)(ingredient)
  );

  function handleOnClickIngredientCheckbox(ingredient) {
    const ingredientData = {
      ...ingredient,
      selected: !ingredient.selected,
    };
    onChangeTpaSelection(
      tpa,
      orgRecipe,
      programBuildTpaStore,
      brokerageId,
      prospectId,
      recipeId,
      ingredientData
    );
  }

  return (
    <Container>
      <Title>Options</Title>
      <ScrollWrapper>
        {Array.isArray(ingredients) &&
          ingredients.map((ingredient, index) => {
            return (
              <OptionContainer
                isBold={ingredient.network_ingredient_tpa_type === "default"}
                key={index}
              >
                <Checkbox
                  type="checkbox"
                  checked={ingredient.selected}
                  disabled={
                    ingredient.network_ingredient_tpa_type === "mandatory"
                  }
                  onClick={() => handleOnClickIngredientCheckbox(ingredient)}
                />
                {ingredient.name}{" "}
                {ingredient.network_ingredient_tpa_type === "default"
                  ? "(Default)"
                  : ""}
              </OptionContainer>
            );
          })}
      </ScrollWrapper>
    </Container>
  );
};

export default observer(OptionSection);

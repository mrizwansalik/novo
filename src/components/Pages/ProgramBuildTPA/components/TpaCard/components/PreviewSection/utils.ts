import { find, get, groupBy } from "lodash";
import { NETWORK_INGREDIENT_TYPE } from "src/constants";
import { networkIngredientTypes } from "src/constants/tpa";

export function groupIngredientsByTypes(ingredients) {
  const subNetwork = [];
  const referenceBasedPricing = [];
  const pharmacyBenefitManager = [];
  const costContainmentVendor = [];

  ingredients.forEach((ingredient) => {
    const { type, selected, network_ingredient_tpa_type } = ingredient;
    if (type === NETWORK_INGREDIENT_TYPE.SUB_NET && selected) {
      subNetwork.push(ingredient);
    }
    if (type === NETWORK_INGREDIENT_TYPE.RBP && selected) {
      referenceBasedPricing.push(ingredient);
    }
    if (type === NETWORK_INGREDIENT_TYPE.PBM && selected) {
      pharmacyBenefitManager.push(ingredient);
    }
  });

  return { subNetwork, referenceBasedPricing, pharmacyBenefitManager };
}

export function groupIngredientsBySubTypes(ingredients, tpaIngredientType) {
  const grouped = groupBy(
    ingredients.filter((ingredient) => {
      const { type, selected, network_ingredient_tpa_type } = ingredient;
      if (
        type === NETWORK_INGREDIENT_TYPE.COST_CONTAINMENT &&
        selected &&
        network_ingredient_tpa_type === tpaIngredientType.key
      ) {
        return true;
      }
      return false;
    }),
    "sub_type"
  );
  return grouped;
}

export function tpaHasIngredientsSelectedOfType(tpa, tpaIngredientType) {
  return (
    tpa.ingredients.filter(function (ingredient) {
      return (
        ingredient.network_ingredient_tpa_type === tpaIngredientType.key &&
        ingredient.selected &&
        ingredient.type === NETWORK_INGREDIENT_TYPE.COST_CONTAINMENT
      );
    }).length > 0
  );
}

export function getNetworkIngredientTypeNameByCode(ingredientTypeCode) {
  return get(
    find(networkIngredientTypes, { code: ingredientTypeCode }),
    "name",
    ""
  );
}

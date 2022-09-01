/* eslint-disable max-lines */
import { get } from "lodash";
import { toast } from "react-toastify";
import { listOrgThirdPartyAdministrators } from "src/api/benefits";
import { getNetworkIngredientWithTPAs } from "src/api/network";
import { addOrgRecipeTpa, removeOrgRecipeTpa } from "src/api/orgRecipes";
import { NETWORK_INGREDIENT_TYPE } from "src/constants";
import { networkIngredientTypes } from "src/constants/tpa";
import { ITpa } from "src/interfaces/benefit";
import { ICensusHuman } from "src/interfaces/census";
import { INetworkIngredientWithTPAs } from "src/interfaces/network";
import { IOrgRecipes } from "src/interfaces/orgRecipes";
import ProgramBuildTpaStore from "src/stores/programBuildTpaStore";

export async function initializeFromRecipe(
  brokerageId: string,
  prospectId: string,
  census: ICensusHuman[],
  orgRecipe: IOrgRecipes,
  programBuildTpaStore: ProgramBuildTpaStore
) {
  const networkIngredientsWithTpa: INetworkIngredientWithTPAs[] = await getNetworkIngredientWithTPAs(
    prospectId
  );
  let tpas: ITpa[] = await listOrgThirdPartyAdministrators(brokerageId);
  const tpasMapping = {};
  const loading = {};
  const tpaDisplaySettings = {};

  tpas = tpas
    .filter((tpa) => {
      loading[tpa.id] = true;
      if (census.length < tpa.custom_plan_minimum_group_size) {
        return false;
      }
      if (
        tpa.custom_plan_maximum_group_size &&
        census.length > tpa.custom_plan_maximum_group_size
      ) {
        return false;
      }
      //Do not show TPAs that only work with pre-packaged plans
      if (!tpa.can_customize_program) {
        return false;
      }
      return true;
    })
    .map((tpa) => {
      const calculatedTpa = {
        selected: checkTpaSelected(tpa, orgRecipe),
        groupSizeValid: isGroupSizeValid(tpa, census),
        ...tpa,
      };
      tpasMapping[tpa.id] = calculatedTpa;
      tpasMapping[tpa.id].ingredients = [];
      return calculatedTpa;
    });

  const customTpas = tpas.filter((tpa) => !tpa.is_standard);

  /*
  the following lines creates an array of TPA's with their related network ingredients.
  for custom TPAs, all the custom ingredients and pbms will be related.
  */
  networkIngredientsWithTpa.forEach((ingredient) => {
    ingredient.tpas.forEach((tpa) => {
      const copyIngredient = {
        ...ingredient,
        network_ingredient_tpa_id: tpa.network_ingredient_tpa_id,
        network_ingredient_tpa_type: tpa.type,
        selected:
          checkTpaNetworkIngredientSelected(tpa, ingredient.id, orgRecipe) ||
          tpa.type === "mandatory",
      };
      if (tpasMapping[tpa.id]) {
        tpasMapping[tpa.id].ingredients.push(copyIngredient);
      }
    });

    if (!ingredient.is_standard) {
      customTpas.forEach(function (custom_tpa) {
        const copyIngredient = {
          ...ingredient,
          selected: checkTpaNetworkIngredientSelected(
            custom_tpa,
            ingredient.id,
            orgRecipe
          ),
          network_ingredient_tpa_type: "optional",
        };
        //if we have not added the ingredient to custom TPA in the previous step, do it now
        //this applies to the network ingredients that are custom and yet dont have any NetworkIngredientTPA relation
        if (
          tpasMapping[custom_tpa.id] &&
          tpasMapping[custom_tpa.id].ingredients.findIndex(function (
            addedIngredient
          ) {
            return addedIngredient.id === ingredient.id;
          }) < 0
        ) {
          tpasMapping[custom_tpa.id].ingredients.push(copyIngredient);
        }
      });
    }
  });

  tpas = [];
  Object.keys(tpasMapping).forEach((key) => {
    if (tpasMapping.hasOwnProperty(key)) {
      tpas.push(tpasMapping[key]);
    }
  });

  tpas.forEach(function (tpa) {
    tpaDisplaySettings[tpa.id] = {
      expanded: false,
      activeTab: networkIngredientTypes[0].short_name,
    };

    if (!tpa.selected) {
      resetTpaIngredientSelection(tpa, orgRecipe);
    }

    if (!supportsAnyPBMandNetwork(tpa)) {
      tpa.selected = false;
    }

    loading[tpa.id] = false;
  });

  programBuildTpaStore.setTpas(tpas);
  programBuildTpaStore.setFilteredTpas(tpas);
  programBuildTpaStore.setTpaDisplaySettings(tpaDisplaySettings);
  return tpas;
}

export function checkTpaSelected(tpa: ITpa, orgRecipe: IOrgRecipes) {
  const tpas = get(orgRecipe, "tpas", []);
  return (
    tpas.findIndex(function (orgRecipTpa) {
      return orgRecipTpa.tpa.id === tpa.id;
    }) > -1
  );
}

export function isGroupSizeValid(tpa: ITpa, census: ICensusHuman[]) {
  if (census.length < tpa.custom_plan_minimum_group_size) {
    return false;
  }
  if (
    tpa.custom_plan_maximum_group_size !== null &&
    census.length > tpa.custom_plan_maximum_group_size
  ) {
    return false;
  }
  return true;
}

export function checkTpaNetworkIngredientSelected(
  tpa: ITpa,
  tpaNetworkIngredientId: string,
  orgRecipe: IOrgRecipes
) {
  const orgRecipeTpa = getOrgRecipeTpaByTpaId(tpa, orgRecipe);
  return (
    orgRecipeTpa &&
    orgRecipeTpa.network_ingredients.findIndex(function (tpaNetworkIngredient) {
      return tpaNetworkIngredient.id === tpaNetworkIngredientId;
    }) > -1
  );
}

export function getOrgRecipeTpaByTpaId(tpa: ITpa, orgRecipe: IOrgRecipes) {
  const index = get(orgRecipe, "tpas", []).findIndex(function (orgRecipTpa) {
    return orgRecipTpa.tpa.id === tpa.id;
  });
  if (index > -1) {
    return orgRecipe.tpas[index];
  }
  return null;
}

export function resetTpaIngredientSelection(tpa: ITpa, orgRecipe: IOrgRecipes) {
  tpa.ingredients.forEach(function (ingredient) {
    const existsInRecipeNetworks =
      get(orgRecipe, "sub_networks", []).findIndex(function (sub_network) {
        return sub_network.id === ingredient.id;
      }) > -1;
    const existsInRecipeVendors =
      get(orgRecipe, "cost_containment_vendors", []).findIndex(function (
        cost_containment_vendor
      ) {
        return cost_containment_vendor.id === ingredient.id;
      }) > -1;
    const existsInRecipePBMs =
      get(orgRecipe, "pbms", []).findIndex(function (pharmacy_benefit_manager) {
        return pharmacy_benefit_manager.id === ingredient.id;
      }) > -1;
    if (
      existsInRecipeNetworks ||
      existsInRecipeVendors ||
      existsInRecipePBMs ||
      ingredient.network_ingredient_tpa_type === "default" ||
      ingredient.network_ingredient_tpa_type === "mandatory"
    ) {
      ingredient.selected = true;
    } else {
      ingredient.selected = false;
    }
  });
}

export function supportsAnyPBMandNetwork(tpa: ITpa) {
  let pbmResult = false;
  let networkResult = false;
  tpa.ingredients.forEach(function (ingredient) {
    if (
      ingredient.type === "sub_network" ||
      ingredient.type === "reference_based_pricing"
    ) {
      networkResult = true;
    }
    if (ingredient.type === "pharmacy_benefit_manager") {
      pbmResult = true;
    }
  });

  return pbmResult && networkResult;
}

export async function onChangeTpaSelection(
  tpa: ITpa,
  orgRecipe: IOrgRecipes,
  programBuildTpaStore: ProgramBuildTpaStore,
  brokerageId: string,
  prospectId: string,
  recipeId: string,
  ingredient?
) {
  if (ingredient) {
    const updatedIngredients = get(tpa, "ingredients", []).map((item) => {
      if (item.name === ingredient.name) {
        return ingredient;
      }
      return item;
    });
    tpa.ingredients = updatedIngredients;
  }
  //tpa has been unselected (the click has been on the tpa, if no ingredient is passed )
  if (!tpa.selected && !ingredient) {
    resetTpaIngredientSelection(tpa, orgRecipe);
    await saveTpa(tpa, orgRecipe, brokerageId, prospectId, recipeId);
  } else if (tpa.selected) {
    //tpa is selected and the click has been on either the ingredient or the tpa
    await saveTpa(tpa, orgRecipe, brokerageId, prospectId, recipeId);
  }
  const { filteredTpas } = programBuildTpaStore;
  const updatedFilteredTpas = filteredTpas.map((item) => {
    if (item.id === tpa.id) {
      return tpa;
    }
    return item;
  });
  programBuildTpaStore.setFilteredTpas(updatedFilteredTpas);
  //if the click has been on the ingredient(ingredient is passed) while the tpa is not selected
  //do nothing
}

export async function saveTpa(
  tpa: ITpa,
  orgRecipe: IOrgRecipes,
  brokerageId: string,
  prospectId: string,
  recipeId: string
) {
  if (tpa.selected || (getOrgRecipeTpaId(tpa, orgRecipe) && !tpa.selected)) {
    try {
      await onUpdateTpa(tpa, orgRecipe, brokerageId, prospectId, recipeId);
      toast.success("TPA saved");
    } catch (e) {
      toast.error("There was an error saving the TPA");
    }
  }
}

export function getOrgRecipeTpaId(tpa: ITpa, orgRecipe: IOrgRecipes) {
  const orgRecipeTpaIndex = orgRecipe.tpas.findIndex(function (orgRecipTpa) {
    return orgRecipTpa.tpa.id === tpa.id;
  });
  if (orgRecipeTpaIndex > -1) {
    return orgRecipe.tpas[orgRecipeTpaIndex].id;
  }
  return null;
}

export async function onUpdateTpa(
  tpa: ITpa,
  orgRecipe: IOrgRecipes,
  brokerageId: string,
  prospectId: string,
  recipeId: string
) {
  const tpa_network_ingredients = getTpaSelectedVendors(tpa)
    .concat(
      getTpaSelectedSubNetworks(tpa).concat(
        getTpaSelectedPharmacyBenefitManagers(tpa)
      )
    )
    .map(function (networkIngredient) {
      return networkIngredient.id;
    });

  const tpaData = {
    tpa: tpa.id,
    brokerage_id: brokerageId,
    network_ingredients: tpa_network_ingredients,
  };

  if (tpa.selected) {
    await addOrgRecipeTpa(prospectId, recipeId, tpaData);
    return;
  }

  await removeOrgRecipeTpa(
    prospectId,
    recipeId,
    getOrgRecipeTpaId(tpa, orgRecipe)
  );
}

export function getTpaSelectedVendors(tpa: ITpa) {
  return tpa.ingredients.filter(function (ingredient) {
    return (
      ingredient.selected &&
      ingredient.type === NETWORK_INGREDIENT_TYPE.COST_CONTAINMENT
    );
  });
}

export function getTpaSelectedSubNetworks(tpa: ITpa) {
  return tpa.ingredients.filter(function (ingredient) {
    return (
      ingredient.selected &&
      (ingredient.type === NETWORK_INGREDIENT_TYPE.SUB_NET ||
        ingredient.type === NETWORK_INGREDIENT_TYPE.RBP)
    );
  });
}

export function getTpaSelectedPharmacyBenefitManagers(tpa: ITpa) {
  return tpa.ingredients.filter(function (ingredient) {
    return (
      ingredient.selected && ingredient.type === NETWORK_INGREDIENT_TYPE.PBM
    );
  });
}

export function getNetworkCount(tpa: ITpa, orgRecipe: IOrgRecipes) {
  const matchingIngredients = tpa.ingredients.filter((ingredient) => {
    if (
      ingredient.type === NETWORK_INGREDIENT_TYPE.SUB_NET ||
      ingredient.type === NETWORK_INGREDIENT_TYPE.RBP
    ) {
      const matches = orgRecipe.sub_networks.filter((subNetwork) => {
        if (subNetwork.id === ingredient.id) {
          return true;
        }
        return false;
      });
      return matches.length;
    }
    return false;
  });
  return matchingIngredients.length;
}

export function getPbmCount(tpa: ITpa, orgRecipe: IOrgRecipes) {
  const matchingIngredients = tpa.ingredients.filter((ingredient) => {
    if (ingredient.type === NETWORK_INGREDIENT_TYPE.PBM) {
      const matches = orgRecipe.pbms.filter((subNetwork) => {
        if (subNetwork.id === ingredient.id) {
          return true;
        }
        return false;
      });
      return matches.length;
    }
    return false;
  });
  return matchingIngredients.length;
}

export function getVendorCount(tpa: ITpa, orgRecipe: IOrgRecipes) {
  const matchingIngredients = tpa.ingredients.filter((ingredient) => {
    if (ingredient.type === NETWORK_INGREDIENT_TYPE.COST_CONTAINMENT) {
      const matches = orgRecipe.cost_containment_vendors.filter(
        (subNetwork) => {
          if (subNetwork.id === ingredient.id) {
            return true;
          }
          return false;
        }
      );
      return matches.length;
    }
    return false;
  });
  return matchingIngredients.length;
}

export function tpaHasIngredientsOfType(tpa: ITpa, types: any[]) {
  return (
    tpa.ingredients.filter(function (ingredient) {
      return (
        types.findIndex(function (type) {
          return ingredient.sub_type === type.code;
        }) > -1
      );
    }).length > 0
  );
}

export function filterActiveIngredients(activeTab: string) {
  const activeIngredientTypes = networkIngredientTypes.filter((type) => {
    return type.short_name === activeTab;
  });

  return function (ingredient) {
    if (
      activeIngredientTypes.findIndex((activeIngredientType) => {
        return activeIngredientType.code === ingredient.sub_type;
      }) > -1
    ) {
      return ingredient;
    }
  };
}

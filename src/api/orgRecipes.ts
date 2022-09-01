import { IOrgRecipes, IStopLoss } from "src/interfaces/orgRecipes";
import { api, getAuthHeader } from "./index";

export async function getOrgRecipes(
  prospectId: string
): Promise<IOrgRecipes[]> {
  try {
    const response = await api.get(
      `/api/v1/org/${prospectId}/org-recipes/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function createOrgRecipe(
  prospectId: string
): Promise<IOrgRecipes> {
  try {
    const response = await api.post(
      `/api/v1/org/${prospectId}/org-recipes/`,
      {},
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function createOrgRecipes(
  prospectId: string
): Promise<IOrgRecipes[]> {
  try {
    const response = await api.post(
      `/api/v1/org/${prospectId}/org-recipes/`,
      {},
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function getOrgRecipeById(
  prospectId: string,
  recipeId: string
): Promise<IOrgRecipes> {
  try {
    const response = await api.get(
      `/api/v1/org/${prospectId}/org-recipes/${recipeId}/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function createNetworkIngredient(
  prospectId: string,
  recipeId: string,
  networkIngredient: { network_ingredient: string }
) {
  try {
    const response = await api.post(
      `/api/v1/org/${prospectId}/org-recipes/${recipeId}/network-ingredients/`,
      networkIngredient,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function deleteNetworkIngredient(
  prospectId: string,
  recipeId: string,
  networkIngredientId: string
) {
  try {
    const response = await api.delete(
      `/api/v1/org/${prospectId}/org-recipes/${recipeId}/network-ingredients/${networkIngredientId}/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function addOrgRecipeTpa(
  prospectId: string,
  recipeId: string,
  tpaData
) {
  try {
    const response = await api.post(
      `/api/v1/org/${prospectId}/org-recipes/${recipeId}/tpas/`,
      tpaData,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function removeOrgRecipeTpa(
  prospectId: string,
  recipeId: string,
  orgRecipeTpaId: string
) {
  try {
    const response = await api.delete(
      `/api/v1/org/${prospectId}/org-recipes/${recipeId}/tpas/${orgRecipeTpaId}/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function addStopLossContract(
  orgId: string,
  orgRecipeId: string,
  stopLossContract: IStopLoss
) {
  try {
    const response = await api.post(
      `/api/v1/org/${orgId}/org-recipes/${orgRecipeId}/stop-loss-contracts/`,
      stopLossContract,
      getAuthHeader()
    );
    return response.data;
  } catch (e) {
    return e.message;
  }
}

export async function updateOrgRecipeStopLoss(
  orgId: string,
  orgRecipeId: string,
  stopLossId: string,
  stopLossContract: IStopLoss
) {
  try {
    const stopLossData = { ...stopLossContract };
    delete stopLossData.id;
    const response = await api.put(
      `/api/v1/org/${orgId}/org-recipes/${orgRecipeId}/stop-loss-contracts/${stopLossId}/`,
      stopLossData,
      getAuthHeader()
    );
    return response.data;
  } catch (e) {
    return e.message;
  }
}

export async function deleteOrgRecipeStopLoss(
  orgId: string,
  orgRecipeId: string,
  stopLossId: string
) {
  try {
    const response = await api.delete(
      `/api/v1/org/${orgId}/org-recipes/${orgRecipeId}/stop-loss-contracts/${stopLossId}/`,
      getAuthHeader()
    );
    return response.data;
  } catch (e) {
    return e.message;
  }
}

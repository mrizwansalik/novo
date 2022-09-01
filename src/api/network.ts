import { NetworkAPIType } from "src/constants";
import { ITpa } from "src/interfaces/benefit";
import {
  INetworkIngredient,
  INetworkIngredientWithTPAs,
  IOrgRecipesWithTPAs,
  IPharmacyBenefitManager,
  ISubNetwork,
} from "src/interfaces/network";
import { api, getAuthHeader } from ".";

export async function getSubNetworks(
  prospectId: string
): Promise<ISubNetwork[]> {
  try {
    const response = await api.get(
      `/api/v1/org/${prospectId}/benefits/sub-networks/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function getPharmacyBenefitManagers(
  prospectId: string
): Promise<ISubNetwork[]> {
  try {
    const response = await api.get(
      `/api/v1/org/${prospectId}/benefits/pharmacy-benefit-managers/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function getSubNetworksByType(
  prospectId: string,
  networkAPIType: NetworkAPIType
): Promise<ISubNetwork[]> {
  try {
    const response = await api.get(
      `/api/v1/org/${prospectId}/benefits/${networkAPIType}/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function getThirdPartyAdministrators(
  prospectId: string
): Promise<ITpa[]> {
  try {
    const response = await api.get(
      `/api/v1/org/${prospectId}/benefits/tpas/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function getNetworkIngredientWithTPAs(
  prospectId: string
): Promise<INetworkIngredientWithTPAs[]> {
  try {
    const response = await api.get(
      `/api/v1/org/${prospectId}/benefits/network-ingredients-with-tpas/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function createNetworkIngredient(
  prospectId: string,
  networkIngredient: INetworkIngredient
): Promise<INetworkIngredient> {
  try {
    const response = await api.post(
      `/api/v1/org/${prospectId}/benefits/network-ingredients/`,
      networkIngredient,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function createBenefitTPAs(
  prospectId: string,
  networkIngredient: INetworkIngredient
): Promise<INetworkIngredient> {
  try {
    const response = await api.post(
      `/api/v1/org/${prospectId}/benefits/tpas/`,
      networkIngredient,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function createPharmacyBenefitManager(
  prospectId: string,
  pharmacyBenefitManager: IPharmacyBenefitManager
): Promise<IPharmacyBenefitManager> {
  try {
    const response = await api.post(
      `/api/v1/org/${prospectId}/benefits/pharmacy-benefit-managers/`,
      pharmacyBenefitManager,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function createOrgRecipesTPAs(
  prospectId: string,
  recipeId: string,
  orgRecipesWithTPAs: IOrgRecipesWithTPAs
): Promise<IPharmacyBenefitManager> {
  try {
    const response = await api.post(
      `/api/v1/org/${prospectId}/org-recipes/${recipeId}/tpas/`,
      orgRecipesWithTPAs,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function deleteOrgRecipesTPAs(
  prospectId: string,
  recipeId: string,
  tpaId: string
): Promise<IPharmacyBenefitManager> {
  try {
    const response = await api.delete(
      `/api/v1/org/${prospectId}/org-recipes/${recipeId}/tpas/${tpaId}/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function generateProgram(
  prospectId: string,
  recipeId: string,
  data: any
) {
  try {
    const response = await api.post(
      `/api/v1/org/${prospectId}/org-recipes/${recipeId}/program-versions/`,
      data,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

import { IFee } from "src/interfaces/benefit";
import { api, getAuthHeader } from ".";

export async function getOrgRecipe(
  orgId: string,
  orgRecipeId: string
): Promise<any> {
  try {
    const response = await api.get(
      `/api/v1/org/${orgId}/org-recipes/${orgRecipeId}/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function addExpense(
  orgId: string,
  orgRecipeId: string,
  fee: IFee
): Promise<any> {
  try {
    const response = await api.post(
      `/api/v1/org/${orgId}/org-recipes/${orgRecipeId}/fees/`,
      fee,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function updateExpense(
  orgId: string,
  orgRecipeId: string,
  fee: IFee
): Promise<any> {
  try {
    const response = await api.put(
      `/api/v1/org/${orgId}/org-recipes/${orgRecipeId}/fees/${fee.id}/`,
      fee,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function removeExpense(
  orgId: string,
  orgRecipeId: string,
  expenseId: string
): Promise<any> {
  try {
    const response = await api.delete(
      `/api/v1/org/${orgId}/org-recipes/${orgRecipeId}/fees/${expenseId}/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

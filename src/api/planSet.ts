import { AxiosResponse } from "axios";
import { IMedicalPlan, IPlanSet } from "src/interfaces/orgRecipes";
import { api, getAuthHeader } from ".";

export async function getMedicalPlansInPlanSet(
  orgId: string,
  planSetId: string
): Promise<IMedicalPlan[]> {
  try {
    const response = await api.get(
      `/api/v1/org/${orgId}/plan-sets/${planSetId}/medical-plans/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function updateMedicalPlanInPlanSet(
  orgId: string,
  planSetId: string,
  planId: string,
  updatePlanData: IMedicalPlan
): Promise<IMedicalPlan> {
  let planData = Object.assign(updatePlanData, { plan_set: planSetId });
  const response: AxiosResponse = await api.patch(
    `/api/v1/org/${orgId}/plan-sets/${planSetId}/medical-plans/${planId}/`,
    planData,
    getAuthHeader()
  );
  return response?.data;
}

export async function createMedicalPlanInPlanSet(
  orgId: string,
  planSetId: string,
  createPlanData: IMedicalPlan
) {
  let planData = Object.assign(createPlanData, { plan_set: planSetId });
  const response: AxiosResponse = await api.post(
    `/api/v1/org/${orgId}/plan-sets/${planSetId}/medical-plans/`,
    planData,
    getAuthHeader()
  );
  return response?.data;
}

export async function removeMedicalPlanFromPlanSet(
  orgId: string,
  planSetId: string,
  planId: string
) {
  const response: AxiosResponse = await api.delete(
    `/api/v1/org/${orgId}/plan-sets/${planSetId}/medical-plans/${planId}/`,
    getAuthHeader()
  );
  return response?.data;
}

export async function createPlanSet(
  orgId: string,
  recipeId: string,
  planSetData
): Promise<IPlanSet> {
  const response: AxiosResponse = await api.post(
    `/api/v1/org/${orgId}/org-recipes/${recipeId}/plan-sets/`,
    planSetData,
    getAuthHeader()
  );
  return response?.data;
}

export async function removePlanSet(
  orgId: string,
  recipeId: string,
  planSetId: string
): Promise<IPlanSet> {
  const response: AxiosResponse = await api.delete(
    `/api/v1/org/${orgId}/org-recipes/${recipeId}/plan-sets/${planSetId}`,
    getAuthHeader()
  );
  return response?.data;
}

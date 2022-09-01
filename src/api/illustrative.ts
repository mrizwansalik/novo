import { api, getAuthHeader } from ".";

export async function illustrativeDetail(orgId: string, planId: string) {
  try {
    const response = await api.get(
      `/api/v1/org/${orgId}/benefits/plan-comparisons/${planId}/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

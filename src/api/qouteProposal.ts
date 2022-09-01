import { api, getAuthHeader } from ".";

export async function addProposal(orgId: string, data) {
  try {
    const response = await api.post(
      `/api/v1/org/${orgId}/benefits/rfps/`,
      data,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}
export async function underwriters() {
  try {
    const response = await api.get(
      `api/v1/benefits/underwriters/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

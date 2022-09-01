import { api, getAuthHeader } from ".";

export async function getCensusReportUrl(
  prospectId: string
): Promise<{ url: string }> {
  try {
    const response = await api.post(
      `/api/v1/org/${prospectId}/benefits/phq/census-report/`,
      {},
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function getHealthReportUrl(
  prospectId: string
): Promise<{ url: string }> {
  try {
    const response = await api.post(
      `/api/v1/org/${prospectId}/benefits/phq/health-report/`,
      {},
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

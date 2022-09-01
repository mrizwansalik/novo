import { AxiosResponse } from "axios";
import { api, getAuthHeader } from ".";

export async function savedProgramsList(id): Promise<any[]> {
  const response: AxiosResponse = await api.get(
    `/api/v1/org/${id}/benefits/template-plan-comparisons/`,
    getAuthHeader()
  );
  return response?.data;
}

export async function deleteSavedProgram(orgId, programId): Promise<any[]> {
  const response: AxiosResponse = await api.delete(
    `/api/v1/org/${orgId}/benefits/plan-comparisons/${programId}/`,
    getAuthHeader()
  );
  return response?.data;
}

export async function partialUpdateSavedProgram(
  orgId,
  programId,
  data
): Promise<any[]> {
  const response: AxiosResponse = await api.patch(
    `/api/v1/org/${orgId}/benefits/plan-comparisons/${programId}/`,
    data,
    getAuthHeader()
  );
  return response?.data;
}

export async function getSingleSavedProgram(orgId: string, programId: string) {
  const response = await api.get(
    `/api/v1/org/${orgId}/benefits/template-plan-comparisons/${programId}/`,
    getAuthHeader()
  );
  return response?.data;
}

export async function duplicateVersion(
  orgId: string,
  programId: string,
  versionId,
  data
) {
  const response = await api.post(
    `/api/v1/org/${orgId}/benefits/plan-comparisons/${programId}/versions/${versionId}/duplicate/`,
    data,
    getAuthHeader()
  );
  return response?.data;
}

export async function deleteVersion(
  orgId: string,
  programId: string,
  versionId: string
) {
  const response = await api.delete(
    `/api/v1/org/${orgId}/benefits/plan-comparisons/${programId}/versions/${versionId}/`,
    getAuthHeader()
  );
  return response?.data;
}

export async function updateVersion(
  orgId: string,
  programId: string,
  versionId: string,
  data
) {
  const response = await api.patch(
    `/api/v1/org/${orgId}/benefits/plan-comparisons/${programId}/versions/${versionId}/`,
    data,
    getAuthHeader()
  );
  return response?.data;
}

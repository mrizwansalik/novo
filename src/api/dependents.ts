import { IDependentDetail } from "src/interfaces/dependent";
import { api, getAuthHeader } from ".";

export async function getDependents(workerId): Promise<any> {
  try {
    const response = await api.get(
      `/api/v1/worker/${workerId}/humans/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function addDependents(workerId, dependent: any): Promise<any> {
  try {
    const response = await api.post(
      `/api/v1/worker/${workerId}/humans/`,
      dependent,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function updateDependents(workerId, dependent: any): Promise<any> {
  try {
    const response = await api.patch(
      `/api/v1/worker/${workerId}/humans/${dependent.id}/`,
      dependent,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}
export async function removeDependent(workerId, dependentId): Promise<any> {
  try {
    const response = await api.delete(
      `/api/v1/worker/${workerId}/humans/${dependentId}/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function getDependent(
  workerId: string,
  dependentId: string
): Promise<IDependentDetail> {
  try {
    const response = await api.get(
      `/api/v1/worker/${workerId}/humans/${dependentId}/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

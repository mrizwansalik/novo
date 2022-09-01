import { IOrg } from "src/interfaces/org";
import { IProspectProgress } from "src/interfaces/prospects";
import { api, getAuthHeader } from ".";

export async function getBrokerageProspects(
  orgId: string,
  prospectListType: string
): Promise<IOrg[]> {
  try {
    const response = await api.get(
      `/api/v1/org/${orgId}/brokerage/prospects/${prospectListType}`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function getProspectDetails(prospectId: string): Promise<IOrg> {
  try {
    const response = await api.get(
      `api/v1/org/${prospectId}/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function updateProspectDetails(
  prospectData: IOrg,
  prospectId: string
): Promise<IOrg> {
  try {
    const response = await api.patch(
      `api/v1/org/${prospectId}/`,
      prospectData,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function getProspectProgress(
  prospectId: string
): Promise<IProspectProgress> {
  try {
    const response = await api.get(
      `/api/v1/org/${prospectId}/benefits/prospect-progress/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

import { AxiosResponse } from "axios";
import { IWorkerSignUpToken } from "src/interfaces/authentication";
import {
  IClaimsData,
  IPhqDocument,
  ICarrier,
  IStopLossClaims,
  ITpa,
  IWaivedUser,
} from "src/interfaces/benefit";
import { api, getAuthHeader } from "./index";

export async function getClaimsData(
  prospectId: string
): Promise<IClaimsData[]> {
  try {
    const response = await api.get(
      `/api/v1/org/${prospectId}/benefits/claims-data/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function createClaimsData(
  prospectId: string,
  claimDocuments: IClaimsData
): Promise<IClaimsData> {
  const response = await api.post(
    `/api/v1/org/${prospectId}/benefits/claims-data/`,
    claimDocuments,
    getAuthHeader()
  );
  return response.data;
}

export async function updateClaimsData(
  prospectId: string,
  documentId: string,
  claimDocuments: IClaimsData
): Promise<IClaimsData> {
  const response = await api.patch(
    `/api/v1/org/${prospectId}/benefits/claims-data/${documentId}/`,
    claimDocuments,
    getAuthHeader()
  );
  return response.data;
}

export async function deleteClaimsData(
  prospectId: string,
  documentId: string
): Promise<void> {
  await api.delete(
    `/api/v1/org/${prospectId}/benefits/claims-data/${documentId}/`,
    getAuthHeader()
  );
}

export async function getWorkerSignUpToken(
  orgId: string
): Promise<IWorkerSignUpToken> {
  try {
    const response = await api.post(
      `/api/v1/org/${orgId}/worker-signup-token/`,
      {},
      getAuthHeader()
    );
    return response?.data;
  } catch (err) {
    return { token: "" };
  }
}

export async function createStopLossClaims(
  prospectId: string,
  documentId: string,
  stopLossClaims: IStopLossClaims
): Promise<IStopLossClaims> {
  const response: AxiosResponse = await api.post(
    `/api/v1/org/${prospectId}/benefits/claims-data/${documentId}/stop-loss-claims/`,
    stopLossClaims,
    getAuthHeader()
  );

  return response?.data;
}

export async function updateStopLossClaims(
  prospectId: string,
  documentId: string,
  stopLossClaimsId: string,
  stopLossClaims: IStopLossClaims
): Promise<void> {
  await api.patch(
    `/api/v1/org/${prospectId}/benefits/claims-data/${documentId}/stop-loss-claims/${stopLossClaimsId}/`,
    stopLossClaims,
    getAuthHeader()
  );
}

export async function deleteStopLossClaims(
  prospectId: string,
  documentId: string,
  stopLossClaimsId: string
): Promise<void> {
  await api.delete(
    `/api/v1/org/${prospectId}/benefits/claims-data/${documentId}/stop-loss-claims/${stopLossClaimsId}/`,
    getAuthHeader()
  );
}

export async function getPhqDocuments(): Promise<IPhqDocument[]> {
  const response: AxiosResponse = await api.get(
    `/api/v1/phq-documents/`,
    getAuthHeader()
  );
  return response?.data;
}

export async function listOrgThirdPartyAdministrators(
  orgId: string
): Promise<ITpa[]> {
  const response: AxiosResponse = await api.get(
    `/api/v1/org/${orgId}/benefits/tpas/`,
    getAuthHeader()
  );
  return response?.data;
}

export async function listThirdPartyAdministrators(): Promise<ITpa[]> {
  const response: AxiosResponse = await api.get(
    `/api/v1/benefits/tpas/`,
    getAuthHeader()
  );
  return response?.data;
}

export async function listStopLossCarriers(): Promise<ICarrier[]> {
  const response: AxiosResponse = await api.get(
    `/api/v1/benefits/stop-loss-carriers/`,
    getAuthHeader()
  );
  return response?.data;
}

export async function createOrgThirdPartyAdministrator(
  orgId: string,
  tpa
): Promise<ITpa> {
  const response: AxiosResponse = await api.post(
    `/api/v1/org/${orgId}/benefits/tpas/`,
    tpa,
    getAuthHeader()
  );
  return response?.data;
}

export async function createOrgStopLossCarrier(
  orgId: string,
  stopLossCarrier: ICarrier
): Promise<ICarrier> {
  const response: AxiosResponse = await api.post(
    `/api/v1/org/${orgId}/benefits/stop-loss-carriers/`,
    stopLossCarrier,
    getAuthHeader()
  );
  return response?.data;
}

export async function getWaivedUsers(
  prospectId: string
): Promise<IWaivedUser[]> {
  try {
    const response = await api.get(
      `/api/v1/org/${prospectId}/benefits/phq/waived-users/`,
      getAuthHeader()
    );
    return response?.data;
  } catch (err) {
    return err.message;
  }
}

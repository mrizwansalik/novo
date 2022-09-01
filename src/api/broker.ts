import { IProspectProgress } from "src/interfaces/onboarding";
import { IBroker, IUpdateProspectPhqStatusRequest } from "../interfaces/broker";
import { api, getAuthHeader } from ".";

export async function listBrokerageBrokerByOrgId(
  orgId: string
): Promise<IBroker> {
  try {
    const response = await api.get(
      `/api/v1/org/${orgId}/brokerage/brokers/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function listBrokerageBroker(): Promise<IBroker> {
  try {
    const response = await api.get(
      `/api/v1/org/brokerage/brokers/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function createOrgBroker(
  orgId: string,
  broker: IBroker
): Promise<IBroker[]> {
  const response = await api.post(
    `/api/v1/org/${orgId}/brokerage/brokers/`,
    broker,
    getAuthHeader()
  );
  return response.data;
}

/**
 * addOrgToBrokerage - Adds an org to the brokerage and create org admin
 * @param  {obj} org - Org to add
 * @param  {obj} brokerage - Brokerage to add the org to
 */
export async function addOrgToBrokerage(org, brokerageId: string) {
  if (!brokerageId) {
    const response = await api.post(
      `/api/v1/org/${brokerageId}/brokerage/orgs/`,
      org,
      getAuthHeader()
    );
    return response.data;
  }

  const response = await api.post(
    `/api/v1/org/brokerage/orgs/`,
    org,
    getAuthHeader()
  );
  return response.data;
}

export async function getProspectProgress(
  orgId: string
): Promise<IProspectProgress> {
  try {
    const response = await api.get(
      `/api/v1/org/${orgId}/benefits/prospect-progress/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function updateProspectPhqStatus(
  prospectId: string,
  phqStatus: IUpdateProspectPhqStatusRequest
): Promise<void> {
  try {
    const response = await api.patch(
      `/api/v1/org/brokerage/orgs/${prospectId}/`,
      { ...phqStatus },
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function createOrgWorkerBroker(orgId: any, user_id: any) {
  try {
    const response = await api.post(
      `/api/v1/org/${orgId}/brokerage/brokers/`,
      { user_id },
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

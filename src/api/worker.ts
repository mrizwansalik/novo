import moment from "moment";
import { IWorkerDocument } from "src/interfaces/document";
import { IWorker } from "../interfaces/worker";
import { api, getAuthHeader } from ".";

export async function getOrgWorkers(orgId: string): Promise<IWorker[]> {
  try {
    const response = await api.get(
      `/api/v1/org/${orgId}/workers/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function createOrgWorker(
  orgId: string,
  worker: IWorker
): Promise<IWorker> {
  const requestData: IWorker = {
    ...worker,
    custom_field_responses: [],
    name: "",
    worker_type: "",
  };
  const response = await api.post(
    `/api/v1/org/${orgId}/workers/`,
    worker,
    getAuthHeader()
  );
  return response.data;
}

export async function sendInvite(userId: string): Promise<void> {
  const response = await api.get(
    `/api/v1/worker/${userId}/invites/`,
    getAuthHeader()
  );
  return response.data;
}

export async function deleteWorker(workerId: string): Promise<void> {
  try {
    const response = await api.delete(
      `/api/v1/worker/${workerId}/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function getProspectWorkers(
  prospectId: string
): Promise<IWorker[]> {
  try {
    const response = await api.get(
      `/api/v1/org/${prospectId}/workers/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function getWorkerDocument(
  workerId: string,
  documentId: string
): Promise<IWorkerDocument> {
  try {
    const response = await api.get(
      `/api/v1/worker/${workerId}/documents/${documentId}/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function updateWorkerDocument(
  workerId: string,
  documentId: string,
  workerDocument: IWorkerDocument
): Promise<IWorkerDocument> {
  try {
    const response = await api.patch(
      `/api/v1/worker/${workerId}/documents/${documentId}/`,
      workerDocument,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function resetWorkerDocumentSignature(
  workerId: string,
  keepSignatures: boolean = true
): Promise<void> {
  await api.post(
    `/api/v1/worker/${workerId}/documents/reset-all/`,
    { keep_signatures: keepSignatures },
    getAuthHeader()
  );
}

export async function updateWorkerDocumentStatus(
  workerId: string,
  documentId: string,
  status: string
): Promise<void> {
  try {
    const response = await api.patch(
      `/api/v1/worker/${workerId}/documents/${documentId}/`,
      { status: status },
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function inviteWorker(workerId: string): Promise<void> {
  try {
    const response = await api.post(
      `/api/v1/worker/${workerId}/invites/`,
      { time: moment.now() },
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function getAllDocumentsOfWorker(
  workerId: string
): Promise<IWorkerDocument[]> {
  try {
    const response = await api.get(
      `/api/v1/worker/${workerId}/documents/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function addEmployeeDetail(
  workerId: string,
  employee: any
): Promise<any> {
  try {
    const requestData = {
      ...employee,
    };
    const response = await api.patch(
      `/api/v1/worker/${workerId}/`,
      requestData,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function updateWorker(workerId: string, worker): Promise<any> {
  try {
    const response = await api.patch(
      `/api/v1/worker/${workerId}/`,
      worker,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

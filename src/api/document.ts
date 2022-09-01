import { IPhqDocument } from "src/interfaces/benefit";
import { IDocument } from "src/interfaces/document";
import { api, getAuthHeader } from "./index";

export async function getDocuments(
  prospectId: string
): Promise<IPhqDocument[]> {
  try {
    const response = await api.get(
      `/api/v1/org/${prospectId}/documents/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return [];
  }
}

export async function createDocument(
  prospectId: string,
  phqDocument: IDocument
): Promise<void> {
  await api.post(
    `/api/v1/org/${prospectId}/documents/`,
    phqDocument,
    getAuthHeader()
  );
}

export async function deleteDocument(
  prospectId: string,
  documentId: string
): Promise<void> {
  await api.delete(
    `/api/v1/org/${prospectId}/documents/${documentId}/`,
    getAuthHeader()
  );
}

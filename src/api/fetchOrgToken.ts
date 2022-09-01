import { IWorker } from "src/interfaces/worker";
import { api } from ".";

export async function fetchOrganisationToken(id: string): Promise<any> {
  try {
    const response = await api.get(`/api/v1/org-token-info/${id}/`);
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function addPhqWorker(worker, id: string): Promise<IWorker> {
  try {
    const response = await api.post(`/api/v1/signup/${id}/`, worker);
    return response.data;
  } catch (err) {
    return err.message;
  }
}

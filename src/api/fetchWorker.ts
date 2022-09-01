import { IWorker } from "../interfaces/worker";
import { api, getAuthHeader } from ".";

export async function fetchCurrentWorker(): Promise<IWorker> {
  try {
    const response = await api.get("/api/v1/worker/", getAuthHeader());
    return response.data;
  } catch (err) {
    return err.message;
  }
}

import { IBrokerage } from "src/interfaces/broker";
import { api, getAuthHeader } from ".";

export async function getBrokerage(): Promise<IBrokerage> {
  try {
    const response = await api.get("/api/v1/worker/", getAuthHeader());
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function getBrokerageList(): Promise<IBrokerage[]> {
  try {
    const response = await api.get("/api/v1/brokerages/", getAuthHeader());
    return response.data;
  } catch (err) {
    return err.message;
  }
}
export async function addBrokerage(id: any): Promise<IBrokerage[]> {
  try {
    const response = await api.post(
      `api/v1/org/${id}/brokerage/`,
      "",
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

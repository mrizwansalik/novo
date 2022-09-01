import { AxiosResponse } from "axios";
import { api, getAuthHeader } from ".";

export async function rfpList(): Promise<any[]> {
  const response: AxiosResponse = await api.get(
    `/api/v1/benefits/rfp-sets/`,
    getAuthHeader()
  );
  return response?.data;
}

import { api, getAuthHeader } from ".";

export async function GetProductlist(): Promise<any> {
  try {
    const response = await api.get(
      "/api/v1/metrics/quotes/?from_date=2014-01-09&to_date=2022-01-11",
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

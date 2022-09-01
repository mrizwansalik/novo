import { IStopLossCarrier } from "src/interfaces/carrier";
import { api, getAuthHeader } from ".";

export async function getStopLossCarrier(): Promise<any> {
  try {
    const response = await api.get(
      "/api/v1/benefits/stop-loss-carriers/",
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}
export async function getCarrier(): Promise<any> {
  try {
    const response = await api.get(
      "/api/v1/benefits/carriers/",
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function createStopLossCarrier(
  carrier
): Promise<IStopLossCarrier> {
  try {
    const response = await api.post(
      "/api/v1/benefits/stop-loss-carriers/",
      carrier,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function updateStopLossCarrier(
  carrier
): Promise<IStopLossCarrier> {
  try {
    const response = await api.patch(
      `/api/v1/benefits/stop-loss-carriers/${carrier.id}/`,
      carrier,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function deleteStopLossCarrier(
  carrierId
): Promise<IStopLossCarrier> {
  try {
    const response = await api.delete(
      `/api/v1/benefits/stop-loss-carriers/${carrierId}/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

import { api } from ".";

export async function getSicCodes(): Promise<any[]> {
  try {
    const response = await api.get(`/api/v1/sic-codes/`);
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function getNaicsCodes(): Promise<any[]> {
  try {
    const response = await api.get(`/api/v1/industry-codes/`);
    return response.data;
  } catch (err) {
    return err.message;
  }
}

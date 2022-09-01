import { ITPA } from "src/interfaces/tpa";
import { api, getAuthHeader } from ".";

export async function getTPA(): Promise<any> {
  try {
    const response = await api.get("/api/v1/benefits/tpas/", getAuthHeader());
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function getSingleTPA(Id: string): Promise<any> {
  try {
    const response = await api.get(
      `/api/v1/benefits/tpas/${Id}`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function createTPA(tpa: any): Promise<ITPA> {
  try {
    const response = await api.post(
      "/api/v1/benefits/tpas/",
      tpa,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err;
  }
}

export async function updateTPA(tpa): Promise<ITPA> {
  try {
    const response = await api.patch(
      `/api/v1/benefits/tpas/${tpa.id}/`,
      tpa,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function deleteTPA(tpaId): Promise<ITPA> {
  try {
    const response = await api.delete(
      `/api/v1/benefits/tpas/${tpaId}/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function getTPAPrograms(tpaId: string): Promise<any[]> {
  try {
    const response = await api.get(
      `/api/v1/benefits/tpas/${tpaId}/network-ingredients/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}
export async function addTpaProgram(tpaId: string, data: any): Promise<any[]> {
  try {
    const response = await api.post(
      `/api/v1/benefits/tpas/${tpaId}/network-ingredients/`,
      data,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}
export async function deleteTpaProgram(
  tpaId: string,
  programId: string
): Promise<any[]> {
  try {
    const response = await api.delete(
      `/api/v1/benefits/tpas/${tpaId}/network-ingredients/${programId}/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}
export async function updateTpaProgram(
  tpaId: string,
  data: any
): Promise<any[]> {
  try {
    const response = await api.patch(
      `/api/v1/benefits/tpas/${tpaId}/network-ingredients/${data.id}/`,
      data,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function getSingleTpaProgram(
  tpaId: string,
  programId: string
): Promise<any[]> {
  try {
    const response = await api.get(
      `/api/v1/benefits/tpas/${tpaId}/network-ingredients/${programId}/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

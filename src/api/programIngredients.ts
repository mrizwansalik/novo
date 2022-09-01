import { IProgramIngredients } from "src/interfaces/programIngredients";
import { api, getAuthHeader } from ".";

// export async function getStopLossCarrier(): Promise<any> {
//   try {
//     const response = await api.get(
//       "/api/v1/benefits/stop-loss-carriers/",
//       getAuthHeader()
//     );
//     return response.data;
//   } catch (err) {
//     return err.message;
//   }
// }
export async function getProgramIngredient(id): Promise<IProgramIngredients[]> {
  try {
    const response = await api.get(
      `/api/v1/org/${id}/benefits/network-ingredients-with-tpas/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function createProgramIngredient(
  id,
  program
): Promise<IProgramIngredients> {
  try {
    const response = await api.post(
      `/api/v1/org/${id}/benefits/network-ingredients/`,
      program,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function updateProgramIngredient(
  id,
  program
): Promise<IProgramIngredients> {
  try {
    const response = await api.patch(
      `/api/v1/org/${id}/benefits/network-ingredients/${program.id}/`,
      program,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function deleteProgramIngredient(
  id,
  programId
): Promise<IProgramIngredients> {
  try {
    const response = await api.delete(
      `/api/v1/org/${id}/benefits/network-ingredients/${programId}/`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

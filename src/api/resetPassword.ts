import {
  IResetPasswordRequest,
  IResetPasswordResponse,
} from "../interfaces/worker";
import { api, getAuthHeader } from ".";

export async function resetPassword(
  data: IResetPasswordRequest
): Promise<IResetPasswordResponse> {
  try {
    const response = await api.post(
      "/api/v1/worker/reset-password/",
      { password: data.password },
      getAuthHeader()
    );
    return response;
  } catch (err) {
    return err.message;
  }
}

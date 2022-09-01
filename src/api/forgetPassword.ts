import {
  IForgetPasswordRequest,
  IForgetPasswordResponse,
} from "../interfaces/forgetPassword";
import { api } from ".";
export async function forgetPassword(
  forgetPasswordData: IForgetPasswordRequest
): Promise<IForgetPasswordResponse> {
  try {
    const response = await api.post(
      "/api/v1/request-reset-password/",
      forgetPasswordData
    );
    return response;
  } catch (err) {
    return err.message;
  }
}

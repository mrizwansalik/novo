import { ILoginRequest, ILoginResponse } from "../interfaces/authentication";
import { api, getAuthHeader } from ".";

export async function login(loginData: ILoginRequest): Promise<ILoginResponse> {
  try {
    const response = await api.post("/api/v1/token-auth/", loginData);
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function refreshToken(token: string) {
  try {
    const response = await api.post(
      "/api/v1/token-refresh/",
      { token },
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
}

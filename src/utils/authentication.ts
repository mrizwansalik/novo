import { get } from "lodash";
import {
  login as loginApi,
  refreshToken as refreshTokenApi,
} from "src/api/authentication";
import { AuthTokenStatus } from "src/constants";
import { ILoginRequest, ILoginResponse } from "src/interfaces/authentication";
import { getTokenStatus } from "src/utils/jwtHelper";

export function getUserToken(): string {
  const authenticationToken = localStorage.getItem("authToken");
  return authenticationToken;
}

export async function login(loginData: ILoginRequest) {
  const loginResponse: ILoginResponse = await loginApi(loginData);
  const authenticationToken = get(loginResponse, "token");
  if (authenticationToken) {
    localStorage.setItem("authToken", authenticationToken);
    return;
  }
  return loginResponse;
}

export function logout() {
  localStorage.removeItem("authToken");
}

export function checkAndResetToken(token: string) {
  const tokenStatus: AuthTokenStatus = getTokenStatus(token);

  if (tokenStatus === AuthTokenStatus.NEED_REFRESH) {
    refreshToken(token);
  }

  if (tokenStatus === AuthTokenStatus.EXPIRED) {
    logout();
  }
}

export async function refreshToken(token: string) {
  const response = await refreshTokenApi(token);
  const authToken = get(response, "token");
  if (authToken) {
    localStorage.setItem("authToken", authToken);
  }
}

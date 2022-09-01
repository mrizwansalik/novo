import { AuthTokenStatus } from "src/constants";

const AUTH_REFRESH_TOKEN_TIME = 7200000;

export function decodeUrlBase64(string: string) {
  let output = string.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0: {
      break;
    }
    case 2: {
      output += "==";
      break;
    }
    case 3: {
      output += "=";
      break;
    }
    default: {
      throw new Error("Illegal base64url string!");
    }
  }
  return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
}

export function decodeToken(token: string) {
  const parts = token.split(".");

  if (parts.length !== 3) {
    throw new Error("JWT must have 3 parts");
  }

  const decoded = decodeUrlBase64(parts[1]);
  if (!decoded) {
    throw new Error("Cannot decode the token");
  }

  return JSON.parse(decoded);
}

export function getTokenExpirationDate(token: string) {
  const decoded = decodeToken(token);

  if (!decoded.exp) {
    return null;
  }

  const d = new Date(0); // The 0 here is the key, which sets the date to the epoch
  d.setUTCSeconds(decoded.exp);

  return d;
}

export function getTokenStatus(token): AuthTokenStatus {
  const now = new Date();
  const expireDate = getTokenExpirationDate(token);

  if (!expireDate) {
    return AuthTokenStatus.EXPIRED;
  }

  const expiredTimeValue = expireDate.getTime();
  const nowValue = now.getTime();

  if (expiredTimeValue < nowValue) {
    return AuthTokenStatus.EXPIRED;
  }

  const lifeTime = expiredTimeValue - nowValue;

  //TODO: Not able to make it works, check later
  if (lifeTime < AUTH_REFRESH_TOKEN_TIME) {
    return AuthTokenStatus.NEED_REFRESH;
  }
  return AuthTokenStatus.ACTIVE;
}

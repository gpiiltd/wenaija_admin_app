import apiRoutes from "../../config";
import { post } from "../../network/https";

export class LoginService {
  static async signin(data: Record<string, string>) {
    LoginService._deleteToken();
    const response = await post({
      url: apiRoutes.login,
      data: { ...data },
    });
    if (response.status === "error") {
      throw new Error(response.message as string);
    }
    if (response.status === "success") {
      LoginService._saveToken(
        response?.results?.access_credentials.access_token
      );
      return response;
    }
  }
  static _saveToken(data: string) {
    localStorage.setItem("nssf_user_token", JSON.stringify(data));
  }
  static _deleteToken() {
    localStorage.removeItem("nssf_user_token");
  }
}

export class OTPService {
  static async otp(data: Record<string, string>) {
    const yourAccessToken = localStorage.getItem("nssf_user_token");
    const response = await post({
      url: apiRoutes.login2FA,
      data: { ...data },
      headers: {
        Authorization: `Bearer ${yourAccessToken}`,
      },
    });
    if (response.status === "error") {
      throw new Error(response.message as string);
    }
    if (response.status === "success") {
      OTPService._saveToken(response?.results?.access_credentials.access_token);
      return response;
    }
  }
  static _saveToken(data: string) {
    localStorage.setItem("nssf_user_token", JSON.stringify(data));
  }

}

export class AdminInviteService {
  static async admin_invite(data: Record<string, string>) {
    const yourAccessToken = localStorage.getItem("nssf_user_token");
    const response = await post({
      url: apiRoutes.adminInvite,
      data: { ...data },
      headers: {
        Authorization: `Bearer ${yourAccessToken}`,
      },
    });
    if (response.status === "error") {
      throw new Error(response.message as string);
    }
    if (response.status === "success") {
      console.log("AUTH RESPONSE", response);
      return response;
    }
  }
}

export class PasswordResetService {
  static async password_reset(data: Record<string, string>) {
    const yourAccessToken = localStorage.getItem("nssf_user_token");
    const response = await post({
      url: apiRoutes.passwordReset,
      data: { ...data },
      headers: {
        Authorization: `Bearer ${yourAccessToken}`,
      },
    });
    if (response.status === "error") {
      throw new Error(response.message as string);
    }
    if (response.status === "success") {
      console.log("AUTH RESPONSE", response);
      return response;
    }
  }
}

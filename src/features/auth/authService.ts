import apiRoutes from "../../config";
import { post, put } from "../../network/https";

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
      OTPService._saveEmail(response?.results?.email);
      return response;
    }
  }
  static _saveToken(data: string) {
    localStorage.setItem("nssf_user_token", JSON.stringify(data));
  }
  static _saveEmail(data: string) {
    localStorage.setItem("nssf_user_email", JSON.stringify(data));
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
      return response;

    }
  }
}

export class VerificationService {
  static async email_verification(data: Record<string, string>) {
    const yourAccessToken = localStorage.getItem("nssf_user_token");
    const response = await post({
      url: apiRoutes.emailVerification,
      data: { ...data },
      headers: {
        Authorization: `Bearer ${yourAccessToken}`,
      },
    });
    if (response.status === "error") {
      console.log("VERIFY RESPONSE****", response);
      return Promise.reject({
        message: response.message,
        status_code: response.status_code,
        results: response.results, 
      });

    }
    if (response.status === "success") {
      console.log("VERIFY RESPONSE", response);

      VerificationService._saveToken(response?.results?.access_credentials.token);
      return response;
    }
  }
  static _saveToken(data: string) {
    localStorage.setItem("nssf_user_token", JSON.stringify(data));
  }

}

export class CreateNewPasswordService {
  static async create_new_password(data: Record<string, string>) {
    const yourAccessToken = localStorage.getItem("nssf_user_token");
    const response = await put({
      url: apiRoutes.createNewPassword,
      data: { ...data },
      headers: {
        Authorization: `Bearer ${yourAccessToken}`,
      },
    });
    if (response.status === "error") {
      console.log("VERIFY RESPONSE****", response);
      return Promise.reject({
        message: response.message,
        status_code: response.status_code,
        results: response.results, 
      });
    }
    if (response.status === "success") {
      console.log("VERIFY RESPONSE", response);
      VerificationService._saveToken(response?.results?.access_credentials.access_token);
      return response;
    }
  }
  static _saveToken(data: string) {
    localStorage.setItem("nssf_user_token", JSON.stringify(data));
  }

}
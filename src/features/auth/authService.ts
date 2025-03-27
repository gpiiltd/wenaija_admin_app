import apiRoutes from "../../config";
import { post } from "../../network/https";

export  class LoginService {
  static async signin(data: Record<string, string>) {
    LoginService._deleteToken()
    const response = await post({
      url: apiRoutes.login,
      data: { ...data },
    });
    if (response.status === 'error') {
      throw new Error(response.message as string);
    }
    if (response.status === 'success') {
      console.log('LOGIN RESPONSE',response.message)
      LoginService._saveToken(response?.results?.access_credentials.access_token);
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

export  class OTPService {
  static async otp(data: Record<string, string>) {
    console.log("Stored Token:", localStorage.getItem("nssf_user_token"));
const yourAccessToken = localStorage.getItem("nssf_user_token")
    const response = await post({
      url: apiRoutes.login2FA,
      data: { ...data },
      headers: {
        Authorization: `Bearer ${yourAccessToken}`
      },
    });
    if (response.status === 'error') {
      throw new Error(response.message as string);
    }
    if (response.status === 'success') {
      console.log('AUTH RESPONSE',response)
      return response
    }
  }
}

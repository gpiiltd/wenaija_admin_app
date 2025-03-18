import apiRoutes from "../../config";
import { post } from "../../network/https";

export default class LoginService {
  static async signin(data: Record<string, string>) {
    LoginService._deleteToken()
    const response = await post({
      url: apiRoutes.login,
      data: { ...data },

    });
    console.log('service res',response)
    if (response.status === 'error') {
      console.log('ERROR',response.status)
      throw new Error(response.message as string);
    }
    if (response.status === 'success') {
      console.log('RESPONSE',response.results)
      LoginService._saveToken(response?.results?.access_credentials.access_token);
      return response.results as Record<string, string>;
    }
  }
  static _saveToken(data: string) {
    localStorage.setItem("nssf_user_token", JSON.stringify(data));
  }
  static _deleteToken() {
    localStorage.removeItem("nssf_user_token");
  }
}

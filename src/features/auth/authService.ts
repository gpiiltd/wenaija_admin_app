import apiRoutes from "../../config";
import { post } from "../../network/https";

export default class LoginService {
  static async signin(data: Record<string, string>) {
    const response = await post({
      url: apiRoutes.login,
      data: { ...data },
    });
    if (response.data.error) {
      throw new Error(response.data.data as string);
    }
    if (response.data) {
      LoginService._saveToken(response.data.token_string);
      return response.data as Record<string, string>;
    }
  }

  static _saveToken(data: string) {
    localStorage.setItem("nssf_user_token", JSON.stringify(data));
  }
}

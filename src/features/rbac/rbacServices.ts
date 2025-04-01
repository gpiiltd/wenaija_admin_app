import apiRoutes from "../../config";
import { get, post } from "../../network/https";


export class ListAllAccounts {
    static async list_all_accounts(data: Record<string, string>) {
      const response = await get({
        url: apiRoutes.allAccount,
        data: { ...data },
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
        console.log("ACCOUNTS", response);
        return response;
      }
    }
  
  }
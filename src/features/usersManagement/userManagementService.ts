import apiRoutes from "../../config";
import { get, patch} from "../../network/https";

export class ListAllUsersWithPendingKyc {
    static async list_pending_kyc_accounts(data: Record<string, string>) {
      const response = await get({
        url: apiRoutes.users,
        data: { ...data },
      });
      if (response.status === "error") {
        return Promise.reject({
          message: response.message,
          status_code: response.status_code,
          results: response.results,
        });
      }
      if (response.status === "success") {
        console.log('USERS',response)
        return response;
      }
      if(response.results) {
        console.log('USERS***',response)
        return response;
      }
    }
  }

  export class ViewUserByID {
    static async get_a_user(id: string) {
      const response = await get({
        url: `${apiRoutes.users}/${id}/`,
      });
      if (response.status === "error") {
        return Promise.reject({
          message: response.message,
          status_code: response.status_code,
          results: response.results,
        });
      }
      if (response.status === "success") {
        return response;
      }
    }
  }

  export class UpdataKycStatus {
    static async update_kyc_status(id: string, data: Record<string, string>) {
      const response = await patch({
        url: `${apiRoutes.users}/${id}/`,
        data,
      });
      if (response.status === "error") {
        return Promise.reject({
          message: response.message,
          status_code: response.status_code,
          results: response.results,
        });
      }
      if (response.status === "success") {
        return response;
      }
    }
  }

  export class GetuserManagementMetrics {
    static async user_management_metrics(data: Record<string, string>) {
      const response = await get({
        url: apiRoutes.userManagementMetrics,
        data: { ...data },
      });
      if (response.status === "error") {
        return Promise.reject({
          message: response.message,
          status_code: response.status_code,
          results: response.results,
        });
      }
      if (response.status === "success") {
        return response;
      }
    }
  }
import apiRoutes from "../../config";
import { post} from "../../network/https";


export class AddInstitution {
    static async add_institution(data: Record<string, string | number[]>) {
      const response = await post({
        url: apiRoutes.institutions,
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




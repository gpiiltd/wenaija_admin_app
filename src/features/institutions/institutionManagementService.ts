import apiRoutes from "../../config";
import { post} from "../../network/https";


export class AddInstitution {
    static async add_institution(data: Record<string, string | any>) {
      const response = await post({
        url: apiRoutes.institutions,
        data,
      });
      if (response.status === "error") {
        console.log('Err response',response)
        return Promise.reject({
          message: response.message,
          status_code: response.status_code,
          results: response.results,
        });
      }
      if (response.status === "success") {
        console.log('response', response)
        return response;
      }
    }
  }




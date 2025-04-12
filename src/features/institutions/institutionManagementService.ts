import apiRoutes from "../../config";
import { get, post} from "../../network/https";


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

  export class GetInstitutions {
    static async get_institutions(data: Record<string, string>) {
      const response = await get({
        url: apiRoutes.getAllInstitution,
        data,
      });
      if (response.status === "error") {
        console.log('Err get institutions response',response)
        return Promise.reject({
          message: response.message,
          status_code: response.status_code,
          results: response.results,
        });
      }
      if (response.status === "success") {
        console.log('get institution response', response)
        return response;
      }
    }
  }
  
  export class ViewInstitute {
    static async view_institute(id: string) {
      const response = await get({
        url: `${apiRoutes.institutions}/${id}`,
      });
      if (response.status === "error") {
        console.log('Err Response GI',response)

        return Promise.reject({
          message: response.message,
          status_code: response.status_code,
          results: response.results,
        });
      }
      if (response.status === "success") {
        console.log('Response GI',response)
        return response;
      }
    }
  }



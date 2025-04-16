import apiRoutes from "../../../config";
import { get, post } from "../../../network/https";

export class GetSurveyQuesitions {
    static async survey_questions(data: Record<string, string>) {
      const response = await get({
        url: apiRoutes.getSurveyQuestions,
        data: { ...data }
      });
      if (response.status === "error") {
        console.log("SURVEY QUESTIONS ERR", response);
        return Promise.reject({
          message: response.message,
          status_code: response.status_code,
          results: response.results,
        });
      }
      if (response.status === "success") {
        console.log("SURVEY QUESTIONS", response);
        return response;
  
      }
    }
  }

  export class GetCategories {
    static async categories(data: Record<string, string>) {
      const response = await get({
        url: apiRoutes.getCategories,
        data: { ...data }
      });
      if (response.status === "error") {
        console.log("CATEGORIES ERR", response);
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

  export class CreateCategories {
    static async create_categories(data: Record<string, string>) {
      const response = await post({
        url: apiRoutes.createCategories,
        data: { ...data }
      });
      if (response.status === "error") {
        console.log("ERR CREATING CATEGORY", response);
        return Promise.reject({
          message: response.message,
          status_code: response.status_code,
          results: response.results,
        //   errors: response.data, // ← include the validation errors here

        });
      }
      if (response.status === "success") {
        console.log("CATEGORY CREATED", response);
        return response;
  
      }
    }
  }

  export class GetCategoryByID {
    static async get_a_category(id: string) {
      console.log('Getting category by ID...'); // Add this line
      const response = await get({
        url: `${apiRoutes.getCategories}/${id}`,
      });
      console.log('Response:', response); // Add this line
      if (response.status === "error") {
        console.log('ERR CATEGORY', response);
        return Promise.reject({
          message: response.message,
          status_code: response.status_code,
          results: response.results,
        });
      }
      if (response.status === "success") {
        console.log('CATEGORY SEEN', response);
        return response;
      }
    }
  }

  export class CreateIndicators {
    static async create_indicators(data: Record<string, string>) {
      const response = await post({
        url: apiRoutes.createIndicators,
        data: { data }
      });
      if (response.status === "error") {
        console.log("ERR CREATING INDICATOR", response);
        return Promise.reject({
          message: response.message,
          status_code: response.status_code,
          results: response.results,
        });
      }
      if (response.status === "success") {
        console.log("INDICATOR CREATED", response);
        return response;
  
      }
    }
  }


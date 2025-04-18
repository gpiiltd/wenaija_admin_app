import apiRoutes from "../../../config";
import { get, post } from "../../../network/https";

export type QuestionPayload = {
    indicator: string;
    title: string;
    options: {
      text: string;
      weight: number;
      requires_comment: boolean;
      requires_image: boolean;
    }[];
  };
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

  export class GetSurveyCategories {
    static async survey_categories(data: Record<string, string>) {
      const response = await get({
        url: `${apiRoutes.getCategories}?category_type=survey`,
        data: { ...data }
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

  export class CreateCategories {
    static async create_categories(data: Record<string, string>) {
      const response = await post({
        url: apiRoutes.createCategories,
        data: { ...data }
      });
      if (response.status === "error") {
        return Promise.reject({
          message: response.message,
          status_code: response.status_code,
          results: response.results,
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
      const response = await get({
        url: `${apiRoutes.getCategories}/${id}`,
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

  export class CreateIndicators {
    static async create_indicators(data: Record<string, string>) {
      const response = await post({
        url: apiRoutes.createIndicators,
        data

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

  export class CreateQuestions {
    static async create_questions(data:QuestionPayload) {
      const response = await post({
        url: apiRoutes.createQuestions,
        data: { ...data }
      });
      if (response.status === "error") {
        return Promise.reject({
          message: response.message,
          status_code: response.status_code,
          results: response.results,
        });
      }
      if (response.status === "success") {
        console.log("QUESTION CREATED", response);
        return response;
  
      }
    }
  }


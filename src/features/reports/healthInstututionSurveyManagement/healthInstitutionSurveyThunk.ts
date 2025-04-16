import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateCategories, CreateIndicators, GetCategories, GetCategoryByID, GetSurveyQuesitions } from "./healthInstitutionSurveyService";

interface ErroResponseData {
    message: string;
    status_code?: number;
    results?: Record<string, string[]>;
    errors?:any
  }

export const triggerGetSurveyQuesitions = createAsyncThunk<
  any, 
  Record<string, string>, 
  { rejectValue: ErroResponseData } 
>(
  "healthInstitutionSurveyManagementy/survey_questions",
  async (params, thunkAPI) => {
    try {
      return await GetSurveyQuesitions.survey_questions(params);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? "Something went wrong",
        status_code: e.status_code,
        results: e.results, 
      });
    }
  }
);

export const triggerGetCategories = createAsyncThunk<
  any, 
  Record<string, string>, 
  { rejectValue: ErroResponseData } 
>(
  "healthInstitutionSurveyManagementy/categories",
  async (params, thunkAPI) => {
    try {
      return await GetCategories.categories(params);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? "Something went wrong",
        status_code: e.status_code,
        results: e.results, 
      });
    }
  }
);

export const triggerCreateCategories = createAsyncThunk<
  any, 
  Record<string, string>, 
  { rejectValue: ErroResponseData } 
>(
  "healthInstitutionSurveyManagementy/create_categories",
  async (params, thunkAPI) => {
    try {
      return await CreateCategories.create_categories(params);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? "Something went wrong",
        status_code: e.status_code,
        results: e.results, 
      });
    }
  }
);

export const triggerCreateIndicators = createAsyncThunk<
  any, 
  Record<string, string>, 
  { rejectValue: ErroResponseData } 
>(
  "healthInstitutionSurveyManagementy/create_indicators",
  async (params, thunkAPI) => {
    try {
      return await CreateIndicators.create_indicators(params);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? "Something went wrong",
        status_code: e.status_code,
        results: e.results, 
        errors: e.errors,

      });
    }
  }
);

export const triggerGetACategory = createAsyncThunk<
  any,
  string,
  { rejectValue: ErroResponseData } 
>(
  "healthInstitutionSurveyManagementy/get_a_category",
  async (params, thunkAPI) => {
    try {
      return await GetCategoryByID.get_a_category(params);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? "Something went wrong",
        status_code: e.status_code,
        results: e.results, 
      });
    }
  }
);
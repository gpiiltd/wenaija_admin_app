import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddInstitution, GetInstitutions, ViewInstitute } from "./institutionManagementService";


interface ErroResponseData {
    message: string;
    status_code?: number;
    results?: Record<string, string[]>;
  }

export const triggerAddInstitution = createAsyncThunk<
  any, 
  Record<string, string | any>
, 
  { rejectValue: ErroResponseData } 
>(
  "institutionManagement/add_institution",
  async (params, thunkAPI) => {
    try {
      return await AddInstitution.add_institution(params);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? "Something went wrong",
        status_code: e.status_code,
        results: e.results, 
      });
    }
  }
);

export const triggerListAllInstitutions = createAsyncThunk<
  any, 
  Record<string, string>, 
  { rejectValue: ErroResponseData } 
>(
  "institutionManagement/get_institutions",
  async (params, thunkAPI) => {
    try {
      return await GetInstitutions.get_institutions(params);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? "Something went wrong",
        status_code: e.status_code,
        results: e.results, 
      });
    }
  }
);

export const triggerListASingleInstitute = createAsyncThunk<
  any,
  string,
  { rejectValue: ErroResponseData } 
>(
  "institutionManagement/view_institute",
  async (params, thunkAPI) => {
    try {
      return await ViewInstitute.view_institute(params);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? "Something went wrong",
        status_code: e.status_code,
        results: e.results, 
      });
    }
  }
);
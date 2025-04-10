import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddInstitution } from "./institutionManagementService";


interface ErroResponseData {
    message: string;
    status_code?: number;
    results?: Record<string, string[]>;
  }

export const triggerAddInstitution = createAsyncThunk<
  any, 
  Record<string, string | number[]>
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
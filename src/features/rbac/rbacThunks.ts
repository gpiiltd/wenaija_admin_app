import { createAsyncThunk } from "@reduxjs/toolkit";
import { ListAllAccounts } from "./rbacServices";

interface ErroResponseData {
    message: string;
    status_code?: number;
    results?: Record<string, string[]>;
  }

export const triggerListAllAccounts = createAsyncThunk<
  any, 
  Record<string, string>, 
  { rejectValue: ErroResponseData } 
>(
  "rbac/list_all_accounts",
  async (params, thunkAPI) => {
    try {
      return await ListAllAccounts.list_all_accounts(params);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? "Something went wrong",
        status_code: e.status_code,
        results: e.results, 
      });
    }
  }
);
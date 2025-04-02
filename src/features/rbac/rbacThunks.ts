import { createAsyncThunk } from "@reduxjs/toolkit";
import { DeactivateUser, GetRoles, GetUserByID, ListAllAccounts } from "./rbacServices";

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

export const triggerListASingleUser = createAsyncThunk<
  any,
  string,
  { rejectValue: ErroResponseData } 
>(
  "rbac/get_a_user",
  async (params, thunkAPI) => {
    try {
      return await GetUserByID.get_a_user(params);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? "Something went wrong",
        status_code: e.status_code,
        results: e.results, 
      });
    }
  }
);

export const triggerDeactivateUser = createAsyncThunk<
  any,
  { id: string; reason: string },  
  { rejectValue: ErroResponseData }
>(
  "rbac/deactivate_user",
  async ({ id, reason }, thunkAPI) => {
    try {
      return await DeactivateUser.deactivate_user(id, { reason }); 
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? "Something went wrong",
        status_code: e.status_code,
        results: e.results, 
      });
    }
  }
);

export const triggerGetAllRoles = createAsyncThunk<
  any, 
  Record<string, string>, 
  { rejectValue: ErroResponseData } 
>(
  "rbac/get_roles",
  async (params, thunkAPI) => {
    try {
      return await GetRoles.get_roles(params);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? "Something went wrong",
        status_code: e.status_code,
        results: e.results, 
      });
    }
  }
);
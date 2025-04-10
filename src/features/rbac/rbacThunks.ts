import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddRole, DeactivateUser, editRolesAndPermissions, GetPermissions, GetRoles, GetUserByID, ListAllAccounts, reactivateUser } from "./rbacServices";

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

export const triggerreactivateUser = createAsyncThunk<
  any,
  { id: string; reason: string },  
  { rejectValue: ErroResponseData }
>(
  "rbac/reactivate_user",
  async ({ id, reason }, thunkAPI) => {
    try {
      return await reactivateUser.reactivate_user(id, { reason }); 
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

export const triggerAddRole = createAsyncThunk<
  any, 
  Record<string, string | number[]>
, 
  { rejectValue: ErroResponseData } 
>(
  "rbac/add_role",
  async (params, thunkAPI) => {
    try {
      return await AddRole.add_role(params);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? "Something went wrong",
        status_code: e.status_code,
        results: e.results, 
      });
    }
  }
);

export const triggerGetPermissions = createAsyncThunk<
  any, 
  Record<string, string | any>, 
  { rejectValue: ErroResponseData } 
>(
  "rbac/get_permissions",
  async (params, thunkAPI) => {
    try {
      return await GetPermissions.get_permissions(params);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? "Something went wrong",
        status_code: e.status_code,
        results: e.results, 
      });
    }
  }
);

export const triggerEditRolesAndPermissions = createAsyncThunk<
  any,
  { id: number; data: Record<string, any> },
  { rejectValue: ErroResponseData }
>(
  "rbac/edit_roles_permissions",
  async ({ id, data }, thunkAPI) => {
    try {
      return await editRolesAndPermissions.edit_roles_permissions(id, data);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? "Something went wrong",
        status_code: e.status_code,
        results: e.results,
      });
    }
  }
);

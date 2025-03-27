import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AdminInviteService,
  CreateNewPasswordService,
  LoginService,
  OTPService,
  PasswordResetService,
  VerificationService,
} from "./authService";

interface EmailVerificationError {
  message: string;
  status_code?: number;
  results?: Record<string, string[]>;
}

export const triggerSignin = createAsyncThunk(
  "auth/signin",
  async (params: Record<string, string>, thunkAPI) => {
    try {
      return await LoginService.signin(params);
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const triggerAuth = createAsyncThunk(
  "auth/otp",
  async (params: Record<string, string>, thunkAPI) => {
    try {
      return await OTPService.otp(params);
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const triggerAdminInvite = createAsyncThunk(
  "auth/admin_invite",
  async (params: Record<string, string>, thunkAPI) => {
    try {
      return await AdminInviteService.admin_invite(params);
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const triggerPasswordReset = createAsyncThunk(
  "auth/password_reset",
  async (params: Record<string, string>, thunkAPI) => {
    try {
      return await PasswordResetService.password_reset(params);
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const triggerEmailVerification = createAsyncThunk<
  any, 
  Record<string, string>, 
  { rejectValue: EmailVerificationError } 
>(
  "auth/email_verification",
  async (params, thunkAPI) => {
    try {
      return await VerificationService.email_verification(params);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? "Something went wrong",
        status_code: e.status_code,
        results: e.results, 
      });
    }
  }
);

export const triggerCreateNewPassword = createAsyncThunk<
  any, 
  Record<string, string>, 
  { rejectValue: EmailVerificationError } 
>(
  "auth/create_new_password",
  async (params, thunkAPI) => {
    try {
      return await CreateNewPasswordService.create_new_password(params);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? "Something went wrong",
        status_code: e.status_code,
        results: e.results, 
      });
    }
  }
);

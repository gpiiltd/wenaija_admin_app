import { createAsyncThunk} from '@reduxjs/toolkit';
import { AdminInviteService, LoginService, OTPService, PasswordResetService } from './authService';

export const triggerSignin = createAsyncThunk('auth/signin', async (params: Record<string, string>, thunkAPI) => {
    try {
      return await LoginService.signin(params);
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  });

  export const triggerAuth = createAsyncThunk('auth/otp', async (params: Record<string, string>, thunkAPI) => {
    try {
      return await OTPService.otp(params);
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  });

  export const triggerAdminInvite = createAsyncThunk('auth/admin_invite', async (params: Record<string, string>, thunkAPI) => {
    try {
      return await AdminInviteService.admin_invite(params);
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  });

  export const triggerPasswordReset = createAsyncThunk('auth/password_reset', async (params: Record<string, string>, thunkAPI) => {
    try {
      return await PasswordResetService.password_reset(params);
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  });
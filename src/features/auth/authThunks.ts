import { createAsyncThunk} from '@reduxjs/toolkit';
import { LoginService, OTPService } from './authService';

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
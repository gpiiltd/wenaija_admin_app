import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  AdminInviteService,
  ChangePasswordService,
  CreateNewPasswordService,
  LoginService,
  OTPService,
  PasswordResetService,
  PinSetUpService,
  SignUpViaInviteService,
  VerificationService,
} from './authService'

interface EmailVerificationError {
  message: string
  status_code?: number
  results?: Record<string, string[]>
}

export const triggerSignin = createAsyncThunk(
  'auth/signin',
  async (params: Record<string, string>, thunkAPI) => {
    try {
      return await LoginService.signin(params)
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

export const triggerAuth = createAsyncThunk(
  'auth/otp',
  async (params: Record<string, string>, thunkAPI) => {
    try {
      console.log('AUTH THUNK', params)
      return await OTPService.otp(params)
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

export const triggerAdminInvite = createAsyncThunk(
  'auth/admin_invite',
  async (params: Record<string, string>, thunkAPI) => {
    try {
      return await AdminInviteService.admin_invite(params)
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

export const triggerPasswordReset = createAsyncThunk(
  'auth/password_reset',
  async (params: Record<string, string>, thunkAPI) => {
    try {
      return await PasswordResetService.password_reset(params)
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

export const triggerEmailVerification = createAsyncThunk<
  any,
  Record<string, string>,
  { rejectValue: EmailVerificationError }
>('auth/email_verification', async (params, thunkAPI) => {
  try {
    return await VerificationService.email_verification(params)
  } catch (e: any) {
    return thunkAPI.rejectWithValue({
      message: e.message ?? 'Something went wrong',
      status_code: e.status_code,
      results: e.results,
    })
  }
})

export const triggerCreateNewPassword = createAsyncThunk<
  any,
  Record<string, string>,
  { rejectValue: EmailVerificationError }
>('auth/create_new_password', async (params, thunkAPI) => {
  try {
    return await CreateNewPasswordService.create_new_password(params)
  } catch (e: any) {
    return thunkAPI.rejectWithValue({
      message: e.message ?? 'Something went wrong',
      status_code: e.status_code,
      results: e.results,
    })
  }
})

export const triggerPinSetUp = createAsyncThunk<
  any,
  Record<string, string>,
  { rejectValue: EmailVerificationError }
>('auth/pin_set_up', async (params, thunkAPI) => {
  try {
    return await PinSetUpService.pin_set_up(params)
  } catch (e: any) {
    return thunkAPI.rejectWithValue({
      message: e.message ?? 'Something went wrong',
      status_code: e.status_code,
      results: e.results,
    })
  }
})

export const triggerSignUpViaInvite = createAsyncThunk<
  any,
  Record<string, string>,
  { rejectValue: EmailVerificationError }
>('auth/suvi', async (params, thunkAPI) => {
  try {
    return await SignUpViaInviteService.suvi(params)
  } catch (e: any) {
    return thunkAPI.rejectWithValue({
      message: e.message ?? 'Something went wrong',
      status_code: e.status_code,
      results: e.results,
    })
  }
})

export const triggerChangePassword = createAsyncThunk<
  any,
  Record<string, string>,
  { rejectValue: EmailVerificationError }
>('auth/change_password', async (params, thunkAPI) => {
  try {
    return await ChangePasswordService.change_password(params)
  } catch (e: any) {
    return thunkAPI.rejectWithValue({
      message: e.message ?? 'Something went wrong',
      status_code: e.status_code,
      results: e.results,
    })
  }
})

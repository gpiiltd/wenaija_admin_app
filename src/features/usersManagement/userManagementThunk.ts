import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  GetuserManagementMetrics,
  ListAllUsersWithPendingKyc,
  UpdataKycStatus,
  ViewUserByID,
} from './userManagementService'

interface ErroResponseData {
  message: string
  status_code?: number
  results?: Record<string, string[]>
}

export const triggerListUsersWithPendingKyc = createAsyncThunk<
  any,
  Record<string, string | any>,
  { rejectValue: ErroResponseData }
>('userManagement/list_pending_kyc_accounts', async (params, thunkAPI) => {
  try {
    return await ListAllUsersWithPendingKyc.list_pending_kyc_accounts(params)
  } catch (e: any) {
    return thunkAPI.rejectWithValue({
      message: e.message ?? 'Something went wrong',
      status_code: e.status_code,
      results: e.results,
    })
  }
})

export const triggerViewUserProfile = createAsyncThunk<
  any,
  string,
  { rejectValue: ErroResponseData }
>('userManagement/get_a_user', async (params, thunkAPI) => {
  try {
    return await ViewUserByID.get_a_user(params)
  } catch (e: any) {
    return thunkAPI.rejectWithValue({
      message: e.message ?? 'Something went wrong',
      status_code: e.status_code,
      results: e.results,
    })
  }
})

export const triggerUpdateKycStatus = createAsyncThunk<
  any,
  {
    id: string
    kyc_status?: string
    rejection_reason?: string
    comment?: string
  },
  { rejectValue: ErroResponseData }
>(
  'userManagement/update_kyc_status',
  async ({ id, kyc_status, rejection_reason, comment }, thunkAPI) => {
    try {
      return await UpdataKycStatus.update_kyc_status(id, {
        kyc_status,
        rejection_reason,
        comment,
      })
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? 'Something went wrong',
        status_code: e.status_code,
        results: e.results,
      })
    }
  }
)

export const triggerGetUserManagementMetrics = createAsyncThunk<
  any,
  Record<string, string | any>,
  { rejectValue: ErroResponseData }
>('userManagement/user_management_metrics', async (params, thunkAPI) => {
  try {
    return await GetuserManagementMetrics.user_management_metrics(params)
  } catch (e: any) {
    return thunkAPI.rejectWithValue({
      message: e.message ?? 'Something went wrong',
      status_code: e.status_code,
      results: e.results,
    })
  }
})

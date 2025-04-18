import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  AddInstitution,
  GetAllInstitutions,
  GetInstitutionsAnalytics,
  GetRecentlyAddedInstitutions,
  UpdateInstitute,
  ViewInstitute,
} from './institutionManagementService'

interface ErroResponseData {
  message: string
  status_code?: number
  results?: Record<string, string[]>
}

export const triggerAddInstitution = createAsyncThunk<
  any,
  Record<string, string | any>,
  { rejectValue: ErroResponseData }
>('institutionManagement/add_institution', async (params, thunkAPI) => {
  try {
    return await AddInstitution.add_institution(params)
  } catch (e: any) {
    return thunkAPI.rejectWithValue({
      message: e.message ?? 'Something went wrong',
      status_code: e.status_code,
      results: e.results,
    })
  }
})

export const triggerListAllRecentlyInstitutions = createAsyncThunk<
  any,
  Record<string, any>,
  { rejectValue: ErroResponseData }
>(
  'institutionManagement/get_recently_added_institutions',
  async (params, thunkAPI) => {
    try {
      return await GetRecentlyAddedInstitutions.get_recently_added_institutions(
        params
      )
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? 'Something went wrong',
        status_code: e.status_code,
        results: e.results,
      })
    }
  }
)

export const triggerListAllInstitutions = createAsyncThunk<
  any,
  Record<string, any>,
  { rejectValue: ErroResponseData }
>('institutionManagement/all_institutions', async (params, thunkAPI) => {
  try {
    return await GetAllInstitutions.all_institutions(params)
  } catch (e: any) {
    return thunkAPI.rejectWithValue({
      message: e.message ?? 'Something went wrong',
      status_code: e.status_code,
      results: e.results,
    })
  }
})

export const triggerListASingleInstitute = createAsyncThunk<
  any,
  string,
  { rejectValue: ErroResponseData }
>('institutionManagement/view_institute', async (params, thunkAPI) => {
  try {
    return await ViewInstitute.view_institute(params)
  } catch (e: any) {
    return thunkAPI.rejectWithValue({
      message: e.message ?? 'Something went wrong',
      status_code: e.status_code,
      results: e.results,
    })
  }
})

// GET I A
export const triggerGetInstitutionsAnalytics = createAsyncThunk<
  any,
  Record<string, string>,
  { rejectValue: ErroResponseData }
>(
  'institutionManagement/get_institutions_analytics',
  async (params, thunkAPI) => {
    try {
      return await GetInstitutionsAnalytics.get_institutions_analytics(params)
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? 'Something went wrong',
        status_code: e.status_code,
        results: e.results,
      })
    }
  }
)

//UPDATE INSTITUTE
export const triggerUpdateInstitute = createAsyncThunk<
  any,
  {
    id: string
    name: string
    email: string
    mobile_number: string
    address: string
    state: number
    local_government: number
    ward: number
    operation_days: string
    opening_time: string
    closing_time: string
    logo: string
  },
  { rejectValue: ErroResponseData }
>('institutionManagement/update_institute', async (payload, thunkAPI) => {
  const { id, ...data } = payload
  try {
    return await UpdateInstitute.update_institute(id, data)
  } catch (e: any) {
    return thunkAPI.rejectWithValue({
      message: e.message ?? 'Something went wrong',
      status_code: e.status_code,
      results: e.results,
    })
  }
})

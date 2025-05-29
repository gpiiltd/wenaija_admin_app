import { createAsyncThunk } from '@reduxjs/toolkit'
import { DashboardResponse, GetDashboardData } from './dashboardService'

interface ErrorResponseData {
  message: string
  status_code?: number
  results?: Record<string, string[]>
}

export const triggerGetDashboardData = createAsyncThunk<
  DashboardResponse,
  Record<string, string | number>,
  { rejectValue: ErrorResponseData }
>('dashboard/get_dashboard_data', async (params, thunkAPI) => {
  try {
    const response = await GetDashboardData.get_dashboard_data(params)

    return response
  } catch (e: any) {
    return thunkAPI.rejectWithValue({
      message: e.message ?? 'Something went wrong',
      status_code: e.status_code,
      results: e.results,
    })
  }
})

export const triggerGetDashboardGraphData = createAsyncThunk<
  any,
  Record<string, string | number>,
  { rejectValue: ErrorResponseData }
>('dashboard/dashboard_report_graph', async (params, thunkAPI) => {
  try {
    return await GetDashboardData.dashboard_report_graph(params)
  } catch (e: any) {
    return thunkAPI.rejectWithValue({
      message: e.message ?? 'Something went wrong',
      status_code: e.status_code,
      results: e.results,
    })
  }
})

export const triggerGetDashboardUsersGraphData = createAsyncThunk<
  any,
  Record<string, string | number>,
  { rejectValue: ErrorResponseData }
>('dashboard/dashboard_user_graph', async (params, thunkAPI) => {
  try {
    return await GetDashboardData.dashboard_user_graph(params)
  } catch (e: any) {
    return thunkAPI.rejectWithValue({
      message: e.message ?? 'Something went wrong',
      status_code: e.status_code,
      results: e.results,
    })
  }
})

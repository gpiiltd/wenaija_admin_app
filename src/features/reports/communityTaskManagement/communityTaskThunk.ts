import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  GetCommunityTaskCategories,
  GetCommunityTaskMetrics,
} from './communityTaskService'

interface ErroResponseData {
  message: string
  status_code?: number
  results?: Record<string, string[]>
  errors?: any
}

export const triggerGetCommunityTasksCategories = createAsyncThunk<
  any,
  Record<string, string>,
  { rejectValue: ErroResponseData }
>(
  'communityTaskManagementy/community_task_categories',
  async (params, thunkAPI) => {
    try {
      return await GetCommunityTaskCategories.community_task_categories(params)
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? 'Something went wrong',
        status_code: e.status_code,
        results: e.results,
      })
    }
  }
)

export const triggerGetCommunityTasksMetrics = createAsyncThunk<
  any,
  Record<string, string>,
  { rejectValue: ErroResponseData }
>(
  'communityTaskManagementy/community_task_metrics',
  async (params, thunkAPI) => {
    try {
      return await GetCommunityTaskMetrics.community_task_metrics(params)
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? 'Something went wrong',
        status_code: e.status_code,
        results: e.results,
      })
    }
  }
)

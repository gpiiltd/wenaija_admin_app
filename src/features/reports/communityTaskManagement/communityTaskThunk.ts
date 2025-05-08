import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  CommunityTaskPayload,
  CreateCommunityTask,
  GetCommunityTaskCategories,
  GetCommunityTaskMetrics,
  GetPeningTasks,
  GetReviewedTasks,
  ReviewSubmittedTask,
  ViewSubmittedTask,
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

export const triggerCreateCommunityTask = createAsyncThunk<
  any,
  CommunityTaskPayload,
  { rejectValue: ErroResponseData }
>(
  'communityTaskManagementy/create_community_task',
  async (params, thunkAPI) => {
    try {
      return await CreateCommunityTask.create_community_task(params)
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? 'Something went wrong',
        status_code: e.status_code,
        results: e.results,
      })
    }
  }
)

export const triggerGetPendingTasks = createAsyncThunk<
  any,
  Record<string, string>,
  { rejectValue: ErroResponseData }
>('communityTaskManagementy/pending_tasks', async (params, thunkAPI) => {
  try {
    return await GetPeningTasks.pending_tasks(params)
  } catch (e: any) {
    return thunkAPI.rejectWithValue({
      message: e.message ?? 'Something went wrong',
      status_code: e.status_code,
      results: e.results,
    })
  }
})
export const triggerViewSubmittedTask = createAsyncThunk<
  any,
  string,
  { rejectValue: ErroResponseData }
>('communityTaskManagementy/view_submitted_task', async (params, thunkAPI) => {
  try {
    return await ViewSubmittedTask.view_submitted_task(params)
  } catch (e: any) {
    return thunkAPI.rejectWithValue({
      message: e.message ?? 'Something went wrong',
      status_code: e.status_code,
      results: e.results,
    })
  }
})

export const triggerReviewSubmittedTask = createAsyncThunk<
  any,
  {
    id: string
    percentage: number
    feedback: string
  },
  { rejectValue: ErroResponseData }
>(
  'communityTaskManagement/review_submitted_task',
  async ({ id, percentage, feedback }, thunkAPI) => {
    try {
      return await ReviewSubmittedTask.review_submitted_task(
        id,
        percentage,
        feedback
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

export const triggerGetReviewedTasks = createAsyncThunk<
  any,
  Record<string, string>,
  { rejectValue: ErroResponseData }
>('communityTaskManagementy/reviewed_tasks', async (params, thunkAPI) => {
  try {
    return await GetReviewedTasks.reviewed_tasks(params)
  } catch (e: any) {
    return thunkAPI.rejectWithValue({
      message: e.message ?? 'Something went wrong',
      status_code: e.status_code,
      results: e.results,
    })
  }
})

export const triggerViewTask = createAsyncThunk<
  any,
  {
    taskId: string
  },
  { rejectValue: ErroResponseData }
>('communityTaskManagement/view_task', async ({ taskId }, thunkAPI) => {
  try {
    return await CreateCommunityTask.view_task(taskId)
  } catch (e: any) {
    return thunkAPI.rejectWithValue({
      message: e.message ?? 'Something went wrong',
      status_code: e.status_code,
      results: e.results,
    })
  }
})

export const triggerGetIndicator = createAsyncThunk<
  any,
  {
    indicatorId: string
  },
  { rejectValue: ErroResponseData }
>('communityTaskManagement/indicator', async ({ indicatorId }, thunkAPI) => {
  try {
    return await GetCommunityTaskCategories.indicator(indicatorId)
  } catch (e: any) {
    return thunkAPI.rejectWithValue({
      message: e.message ?? 'Something went wrong',
      status_code: e.status_code,
      results: e.results,
    })
  }
})

export const triggerDeleteTask = createAsyncThunk<
  any,
  {
    taskId: string
  },
  { rejectValue: ErroResponseData }
>('communityTaskManagement/delete_task', async ({ taskId }, thunkAPI) => {
  try {
    return await CreateCommunityTask.delete_task(taskId)
  } catch (e: any) {
    return thunkAPI.rejectWithValue({
      message: e.message ?? 'Something went wrong',
      status_code: e.status_code,
      results: e.results,
    })
  }
})

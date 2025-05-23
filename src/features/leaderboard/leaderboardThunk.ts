import { createAsyncThunk } from '@reduxjs/toolkit'
import { GetLeaderboardData, LeaderboardResponse } from './leaderboardService'

interface ErrorResponseData {
  message: string
  status_code?: number
  data?: Record<string, any>
}

export const triggerGetLeaderboardData = createAsyncThunk<
  LeaderboardResponse,
  Record<string, string | number>,
  { rejectValue: ErrorResponseData }
>('leaderboard/get_leaderboard_data', async (params, thunkAPI) => {
  try {
    const response = await GetLeaderboardData.get_leaderboard_data(params)
    return response
  } catch (e: any) {
    console.error('Error in leaderboard thunk:', e)
    return thunkAPI.rejectWithValue({
      message: e.message ?? 'Something went wrong',
      status_code: e.status_code,
      data: e.data,
    })
  }
})

export const fetchLeaderboardByUrl = createAsyncThunk<
  LeaderboardResponse,
  string, // Full URL for next/previous
  { rejectValue: ErrorResponseData }
>('leaderboard/fetch_by_url', async (url, thunkAPI) => {
  try {
    const response = await GetLeaderboardData.get_leaderboard_by_url(url)
    return response
  } catch (e: any) {
    return thunkAPI.rejectWithValue({
      message: e.message ?? 'Something went wrong',
      status_code: e.status_code,
      data: e.data,
    })
  }
})

export const triggerEditPointsAndBadges = createAsyncThunk<
  any,
  { id: number; data: Record<string, string | number> },
  { rejectValue: ErrorResponseData }
>('leaderboard/edit_points_and_badges', async ({ id, data }, thunkAPI) => {
  try {
    return await GetLeaderboardData.edit_points_and_badges(id, data)
  } catch (e: any) {
    return thunkAPI.rejectWithValue({
      message: e.message ?? 'Something went wrong',
      status_code: e.status_code,
      data: e.results,
    })
  }
})

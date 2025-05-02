import { createSlice } from '@reduxjs/toolkit'
// import { triggerGetLeaderboardData } from './leaderboardThunk'
import {
  fetchLeaderboardByUrl,
  triggerGetLeaderboardData,
} from './leaderboardThunk'

interface LeaderboardState {
  leaderboardData: {
    results: any
    loading: boolean
    error: boolean
    message?: string
    statusCode: number | null
  }
}

const initialState: LeaderboardState = {
  leaderboardData: {
    results: null,
    loading: false,
    error: false,
    message: undefined,
    statusCode: null,
  },
}

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    resetLeaderboardState: state => {
      state.leaderboardData = {
        ...initialState.leaderboardData,
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(triggerGetLeaderboardData.pending, state => {
        state.leaderboardData.loading = true
      })
      .addCase(triggerGetLeaderboardData.fulfilled, (state, action) => {
        const response = action.payload
        state.leaderboardData.loading = false
        state.leaderboardData.results = response
        state.leaderboardData.error = false
        state.leaderboardData.message = response.message
        state.leaderboardData.statusCode = response.status_code
      })
      .addCase(triggerGetLeaderboardData.rejected, (state, action) => {
        state.leaderboardData.loading = false
        state.leaderboardData.error = true
        state.leaderboardData.message =
          action.payload?.message ?? 'Something went wrong'
        state.leaderboardData.statusCode = action.payload?.status_code ?? null
      })

      // Add this block for `fetchLeaderboardByUrl`
      .addCase(fetchLeaderboardByUrl.pending, state => {
        state.leaderboardData.loading = true
      })
      .addCase(fetchLeaderboardByUrl.fulfilled, (state, action) => {
        const response = action.payload
        state.leaderboardData.loading = false
        state.leaderboardData.results = response
        state.leaderboardData.error = false
        state.leaderboardData.message = response.message
        state.leaderboardData.statusCode = response.status_code
      })
      .addCase(fetchLeaderboardByUrl.rejected, (state, action) => {
        state.leaderboardData.loading = false
        state.leaderboardData.error = true
        state.leaderboardData.message =
          action.payload?.message ?? 'Something went wrong'
        state.leaderboardData.statusCode = action.payload?.status_code ?? null
      })
  },
})

export const { resetLeaderboardState } = leaderboardSlice.actions
export default leaderboardSlice.reducer

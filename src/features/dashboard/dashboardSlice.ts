import { createSlice } from '@reduxjs/toolkit'
import { triggerGetDashboardData } from './dashboardThunk'

// Update the interface to match the actual API response structure
interface DashboardState {
  dashboardData: {
    data: any // Using any temporarily for flexibility
    loading: boolean
    error: boolean
    message: string | undefined
    statusCode?: number | null
  }
}

const initialState: DashboardState = {
  dashboardData: {
    data: null,
    loading: false,
    error: false,
    message: undefined,
    statusCode: null,
  },
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    resetDashboardState: state => {
      state.dashboardData = {
        ...initialState.dashboardData,
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(triggerGetDashboardData.pending, state => {
        state.dashboardData.loading = true
      })
      .addCase(triggerGetDashboardData.fulfilled, (state, action) => {
        state.dashboardData.loading = false

        // The critical fix: use action.payload.results instead of action.payload.data
        state.dashboardData.data = action.payload.results

        state.dashboardData.error = false
        state.dashboardData.message = action.payload.message
        state.dashboardData.statusCode = action.payload.status_code

        // Add additional debug logging directly in the reducer
        console.log('Dashboard data after update:', state.dashboardData.data)
      })
      .addCase(triggerGetDashboardData.rejected, (state, action) => {
        state.dashboardData.loading = false
        state.dashboardData.error = true
        state.dashboardData.message =
          action.payload?.message ?? 'Something went wrong'
        state.dashboardData.statusCode = action.payload?.status_code ?? null
      })
  },
})

export const { resetDashboardState } = dashboardSlice.actions
export default dashboardSlice.reducer

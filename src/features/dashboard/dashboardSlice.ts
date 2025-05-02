import { createSlice } from '@reduxjs/toolkit'
import { triggerGetDashboardData } from './dashboardThunk'

interface DashboardState {
  dashboardData: {
    data: any
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


        state.dashboardData.data = action.payload.results

        state.dashboardData.error = false
        state.dashboardData.message = action.payload.message
        state.dashboardData.statusCode = action.payload.status_code

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

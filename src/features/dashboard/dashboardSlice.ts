import { createSlice } from '@reduxjs/toolkit'
import {
  triggerGetDashboardData,
  triggerGetDashboardGraphData,
  triggerGetDashboardUsersGraphData,
} from './dashboardThunk'

interface DashboardState {
  dashboardData: {
    data: any
    loading: boolean
    error: boolean
    message: string | undefined
    statusCode?: number | null
  }
  dashboardGraphData: {
    data: any
    loading: boolean
    error: boolean
    message: string | undefined
    statusCode?: number | null
  }
  dashboardUsersGraphData: {
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
  dashboardGraphData: {
    data: null,
    loading: false,
    error: false,
    message: undefined,
    statusCode: null,
  },
  dashboardUsersGraphData: {
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

    //dashboard graph
    builder.addCase(triggerGetDashboardGraphData.pending, state => {
      state.dashboardGraphData.loading = true
      state.dashboardGraphData.error = false
      state.dashboardGraphData.data = {}
      state.dashboardGraphData.message = ''
    })
    builder.addCase(triggerGetDashboardGraphData.fulfilled, (state, action) => {
      state.dashboardGraphData.loading = false
      state.dashboardGraphData.data = action.payload
      state.dashboardGraphData.error = false
      state.dashboardGraphData.message = action.payload
        ?.message as unknown as string
      state.dashboardGraphData.statusCode = action.payload
        ?.status_code as unknown as number
    })
    builder.addCase(triggerGetDashboardGraphData.rejected, (state, action) => {
      state.dashboardGraphData.loading = false
      state.dashboardGraphData.error = true
      state.dashboardGraphData.message = action.payload
        ?.message as unknown as string
      state.dashboardGraphData.statusCode = action.payload?.status_code ?? null
    })

    //dashboard users graph
    builder.addCase(triggerGetDashboardUsersGraphData.pending, state => {
      state.dashboardUsersGraphData.loading = true
      state.dashboardUsersGraphData.error = false
      state.dashboardUsersGraphData.data = {}
      state.dashboardUsersGraphData.message = ''
    })
    builder.addCase(
      triggerGetDashboardUsersGraphData.fulfilled,
      (state, action) => {
        state.dashboardUsersGraphData.loading = false
        state.dashboardUsersGraphData.data = action.payload
        state.dashboardUsersGraphData.error = false
        state.dashboardUsersGraphData.message = action.payload
          ?.message as unknown as string
        state.dashboardUsersGraphData.statusCode = action.payload
          ?.status_code as unknown as number
      }
    )
    builder.addCase(
      triggerGetDashboardUsersGraphData.rejected,
      (state, action) => {
        state.dashboardUsersGraphData.loading = false
        state.dashboardUsersGraphData.error = true
        state.dashboardUsersGraphData.message = action.payload
          ?.message as unknown as string
        state.dashboardUsersGraphData.statusCode =
          action.payload?.status_code ?? null
      }
    )
  },
})

export const { resetDashboardState } = dashboardSlice.actions
export default dashboardSlice.reducer

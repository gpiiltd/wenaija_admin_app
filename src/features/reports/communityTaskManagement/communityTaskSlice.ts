import { createSlice } from '@reduxjs/toolkit'

import {
  triggerGetCommunityTasksCategories,
  triggerGetCommunityTasksMetrics,
} from './communityTaskThunk'

interface IinitialState {
  error: boolean
  loading: boolean
  resData: Record<string, any>
  message: string
  statusCode?: number | null

  communityTaskCategories: {
    data: Record<string, string>[] | any
    loading: boolean
    error: boolean
    message: string | undefined
    statusCode?: number | null
  }
}

const initialState: IinitialState = {
  communityTaskCategories: {
    data: [],
    loading: false,
    error: false,
    message: '',
    statusCode: null,
  },

  error: false,
  loading: false,
  resData: {},
  message: '',
  statusCode: null,
}

const communityTaskSlice = createSlice({
  name: 'communityTaskManagement',
  initialState,
  reducers: {
    resetState: state => {
      state.error = initialState.error
      state.message = initialState.message
      state.statusCode = initialState.statusCode
    },
    resetCommunityTaskState: state => {
      state.communityTaskCategories.error =
        initialState.communityTaskCategories.error
      state.communityTaskCategories.message =
        initialState.communityTaskCategories.message
      state.communityTaskCategories.statusCode =
        initialState.communityTaskCategories.statusCode
    },
  },
  extraReducers: builder => {
    //LIST ALL communityTaskCategories
    builder.addCase(triggerGetCommunityTasksCategories.pending, state => {
      state.communityTaskCategories.loading = true
      state.communityTaskCategories.error = false
      state.communityTaskCategories.data = {}
      state.communityTaskCategories.message = ''
    })
    builder.addCase(
      triggerGetCommunityTasksCategories.fulfilled,
      (state, action) => {
        state.communityTaskCategories.loading = false
        state.communityTaskCategories.data = action.payload?.results!
        state.communityTaskCategories.error = false
        state.communityTaskCategories.message = action.payload
          ?.message as unknown as string
        state.communityTaskCategories.statusCode = action.payload
          ?.status_code as unknown as number
      }
    )
    builder.addCase(
      triggerGetCommunityTasksCategories.rejected,
      (state, action) => {
        state.communityTaskCategories.loading = false
        state.communityTaskCategories.error = true
        state.communityTaskCategories.message = action.payload
          ?.message as unknown as string
        state.communityTaskCategories.statusCode =
          action.payload?.status_code ?? null
      }
    )

    //GET COMMUNITY TASK METRICS
    builder.addCase(triggerGetCommunityTasksMetrics.pending, state => {
      state.loading = true
      state.error = false
      state.resData = {}
      state.message = ''
    })
    builder.addCase(
      triggerGetCommunityTasksMetrics.fulfilled,
      (state, action) => {
        state.loading = false
        state.resData = action.payload
        state.error = false
        state.message = action.payload?.message as unknown as string
        state.statusCode = action.payload?.status_code as unknown as number
      }
    )
    builder.addCase(
      triggerGetCommunityTasksMetrics.rejected,
      (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload?.message as unknown as string
        state.statusCode = action.payload?.status_code ?? null
      }
    )
  },
})

export const { resetCommunityTaskState, resetState } =
  communityTaskSlice.actions

export default communityTaskSlice.reducer

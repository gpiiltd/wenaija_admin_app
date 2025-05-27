import { createSlice } from '@reduxjs/toolkit'

import {
  triggerCreateCommunityTask,
  triggerDeleteIndicator,
  triggerDeleteTask,
  triggerEditIndicator,
  triggerGetCommunityTasksCategories,
  triggerGetCommunityTasksMetrics,
  triggerGetIndicator,
  triggerGetPendingTasks,
  triggerGetReportGraph,
  triggerGetReviewedTasks,
  triggerReviewSubmittedTask,
  triggerViewSubmittedTask,
  triggerViewTask,
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
  createCommunityTask: {
    data: Record<string, string>[] | any
    loading: boolean
    error: boolean
    message: string | undefined
    statusCode?: number | null
  }
  pendingTasks: {
    data: Record<string, string>[] | any
    loading: boolean
    error: boolean
    message: string | undefined
    statusCode?: number | null
  }
  viewSubmittedTask: {
    data: Record<string, string>[] | any
    loading: boolean
    error: boolean
    message: string | undefined
    statusCode?: number | null
  }
  reviewSubmittedTask: {
    data: Record<string, string>[] | any
    loading: boolean
    error: boolean
    message: string | undefined
    statusCode?: number | null
  }
  reviewedTasks: {
    data: Record<string, string>[] | any
    loading: boolean
    error: boolean
    message: string | undefined
    statusCode?: number | null
  }
  viewTask: {
    data: Record<string, string>[] | any
    loading: boolean
    error: boolean
    message: string | undefined
    statusCode?: number | null
  }
  deleteTask: {
    data: Record<string, string>[] | any
    loading: boolean
    error: boolean
    message: string | undefined
    statusCode?: number | null
  }
  editIndcator: {
    data: Record<string, string>[] | any
    loading: boolean
    error: boolean
    message: string | undefined
    statusCode?: number | null
  }
  deleteIndcator: {
    data: Record<string, string>[] | any
    loading: boolean
    error: boolean
    message: string | undefined
    statusCode?: number | null
  }
  reportGraph: {
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
  createCommunityTask: {
    data: [],
    loading: false,
    error: false,
    message: '',
    statusCode: null,
  },
  pendingTasks: {
    data: [],
    loading: false,
    error: false,
    message: '',
    statusCode: null,
  },
  viewSubmittedTask: {
    data: [],
    loading: false,
    error: false,
    message: '',
    statusCode: null,
  },
  reviewSubmittedTask: {
    data: [],
    loading: false,
    error: false,
    message: '',
    statusCode: null,
  },
  reviewedTasks: {
    data: [],
    loading: false,
    error: false,
    message: '',
    statusCode: null,
  },
  viewTask: {
    data: [],
    loading: false,
    error: false,
    message: '',
    statusCode: null,
  },
  deleteTask: {
    data: [],
    loading: false,
    error: false,
    message: '',
    statusCode: null,
  },
  editIndcator: {
    data: [],
    loading: false,
    error: false,
    message: '',
    statusCode: null,
  },
  deleteIndcator: {
    data: [],
    loading: false,
    error: false,
    message: '',
    statusCode: null,
  },
  reportGraph: {
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
    resetCreateCommunityTaskState: state => {
      state.createCommunityTask.error = initialState.createCommunityTask.error
      state.createCommunityTask.message =
        initialState.createCommunityTask.message
      state.createCommunityTask.statusCode =
        initialState.createCommunityTask.statusCode
    },
    resetViewSubmittedTask: state => {
      state.viewSubmittedTask.error = initialState.viewSubmittedTask.error
      state.viewSubmittedTask.message = initialState.viewSubmittedTask.message
      state.viewSubmittedTask.statusCode =
        initialState.viewSubmittedTask.statusCode
    },
    resetReviewSubmittedTask: state => {
      state.reviewSubmittedTask.error = initialState.reviewSubmittedTask.error
      state.reviewSubmittedTask.message =
        initialState.reviewSubmittedTask.message
      state.reviewSubmittedTask.statusCode =
        initialState.reviewSubmittedTask.statusCode
    },
    resetDeleteTask: state => {
      state.deleteTask.error = initialState.deleteTask.error
      state.deleteTask.message = initialState.deleteTask.message
      state.deleteTask.statusCode = initialState.deleteTask.statusCode
    },
    resetEditIndicator: state => {
      state.editIndcator.error = initialState.editIndcator.error
      state.editIndcator.message = initialState.editIndcator.message
      state.editIndcator.statusCode = initialState.editIndcator.statusCode
    },
    resetDeleteIndicator: state => {
      state.deleteIndcator.error = initialState.deleteIndcator.error
      state.deleteIndcator.message = initialState.deleteIndcator.message
      state.deleteIndcator.statusCode = initialState.deleteIndcator.statusCode
      state.deleteIndcator.data = initialState.deleteIndcator.data
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

    //CREATE COMMUNITY TASK METRICS
    builder.addCase(triggerCreateCommunityTask.pending, state => {
      state.createCommunityTask.loading = true
      state.createCommunityTask.error = false
      state.createCommunityTask.data = {}
      state.createCommunityTask.message = ''
    })
    builder.addCase(triggerCreateCommunityTask.fulfilled, (state, action) => {
      state.createCommunityTask.loading = false
      state.createCommunityTask.data = action.payload
      state.createCommunityTask.error = false
      state.createCommunityTask.message = action.payload
        ?.message as unknown as string
      state.createCommunityTask.statusCode = action.payload
        ?.status_code as unknown as number
    })
    builder.addCase(triggerCreateCommunityTask.rejected, (state, action) => {
      state.createCommunityTask.loading = false
      state.createCommunityTask.error = true
      state.createCommunityTask.message = action.payload
        ?.message as unknown as string
      state.createCommunityTask.statusCode = action.payload?.status_code ?? null
    })

    //GET PENDING TASKS
    builder.addCase(triggerGetPendingTasks.pending, state => {
      state.pendingTasks.loading = true
      state.pendingTasks.error = false
      state.pendingTasks.data = {}
      state.pendingTasks.message = ''
    })
    builder.addCase(triggerGetPendingTasks.fulfilled, (state, action) => {
      state.pendingTasks.loading = false
      state.pendingTasks.data = action.payload
      state.pendingTasks.error = false
      state.pendingTasks.message = action.payload?.message as unknown as string
      state.pendingTasks.statusCode = action.payload
        ?.status_code as unknown as number
    })
    builder.addCase(triggerGetPendingTasks.rejected, (state, action) => {
      state.pendingTasks.loading = false
      state.pendingTasks.error = true
      state.pendingTasks.message = action.payload?.message as unknown as string
      state.pendingTasks.statusCode = action.payload?.status_code ?? null
    })

    //VIEW SUBMITTED TASK
    builder.addCase(triggerViewSubmittedTask.pending, state => {
      state.viewSubmittedTask.loading = true
      state.viewSubmittedTask.error = false
      state.viewSubmittedTask.data = {}
      state.viewSubmittedTask.message = ''
    })
    builder.addCase(triggerViewSubmittedTask.fulfilled, (state, action) => {
      state.viewSubmittedTask.loading = false
      state.viewSubmittedTask.data = action.payload
      state.viewSubmittedTask.error = false
      state.viewSubmittedTask.message = action.payload
        ?.message as unknown as string
      state.viewSubmittedTask.statusCode = action.payload
        ?.status_code as unknown as number
    })
    builder.addCase(triggerViewSubmittedTask.rejected, (state, action) => {
      state.viewSubmittedTask.loading = false
      state.viewSubmittedTask.error = true
      state.viewSubmittedTask.message = action.payload
        ?.message as unknown as string
      state.viewSubmittedTask.statusCode = action.payload?.status_code ?? null
    })
    //REVIEW SUBMITTED TASK /No DiSPATCH YET
    builder.addCase(triggerReviewSubmittedTask.pending, state => {
      state.reviewSubmittedTask.loading = true
      state.reviewSubmittedTask.error = false
      state.reviewSubmittedTask.data = {}
      state.reviewSubmittedTask.message = ''
    })
    builder.addCase(triggerReviewSubmittedTask.fulfilled, (state, action) => {
      state.reviewSubmittedTask.loading = false
      state.reviewSubmittedTask.data = action.payload
      state.reviewSubmittedTask.error = false
      state.reviewSubmittedTask.message = action.payload
        ?.message as unknown as string
      state.reviewSubmittedTask.statusCode = action.payload
        ?.status_code as unknown as number
    })
    builder.addCase(triggerReviewSubmittedTask.rejected, (state, action) => {
      state.reviewSubmittedTask.loading = false
      state.reviewSubmittedTask.error = true
      state.reviewSubmittedTask.message = action.payload
        ?.message as unknown as string
      state.reviewSubmittedTask.statusCode = action.payload?.status_code ?? null
    })

    //REVIEWED TASKS
    builder.addCase(triggerGetReviewedTasks.pending, state => {
      state.reviewedTasks.loading = true
      state.reviewedTasks.error = false
      state.reviewedTasks.data = {}
      state.reviewedTasks.message = ''
    })
    builder.addCase(triggerGetReviewedTasks.fulfilled, (state, action) => {
      state.reviewedTasks.loading = false
      state.reviewedTasks.data = action.payload
      state.reviewedTasks.error = false
      state.reviewedTasks.message = action.payload?.message as unknown as string
      state.reviewedTasks.statusCode = action.payload
        ?.status_code as unknown as number
    })
    builder.addCase(triggerGetReviewedTasks.rejected, (state, action) => {
      state.reviewedTasks.loading = false
      state.reviewedTasks.error = true
      state.reviewedTasks.message = action.payload?.message as unknown as string
      state.reviewedTasks.statusCode = action.payload?.status_code ?? null
    })

    //VIEW TASK
    builder.addCase(triggerViewTask.pending, state => {
      state.viewTask.loading = true
      state.viewTask.error = false
      state.viewTask.data = {}
      state.viewTask.message = ''
    })
    builder.addCase(triggerViewTask.fulfilled, (state, action) => {
      state.viewTask.loading = false
      state.viewTask.data = action.payload
      state.viewTask.error = false
      state.viewTask.message = action.payload?.message as unknown as string
      state.viewTask.statusCode = action.payload
        ?.status_code as unknown as number
    })
    builder.addCase(triggerViewTask.rejected, (state, action) => {
      state.viewTask.loading = false
      state.viewTask.error = true
      state.viewTask.message = action.payload?.message as unknown as string
      state.viewTask.statusCode = action.payload?.status_code ?? null
    })

    //GET INDICATOR
    builder.addCase(triggerGetIndicator.pending, state => {
      state.loading = true
      state.error = false
      state.resData = {}
      state.message = ''
    })
    builder.addCase(triggerGetIndicator.fulfilled, (state, action) => {
      state.loading = false
      state.resData = action.payload
      state.error = false
      state.message = action.payload?.message as unknown as string
      state.statusCode = action.payload?.status_code as unknown as number
    })
    builder.addCase(triggerGetIndicator.rejected, (state, action) => {
      state.loading = false
      state.error = true
      state.message = action.payload?.message as unknown as string
      state.statusCode = action.payload?.status_code ?? null
    })

    //DELETE TASK
    builder.addCase(triggerDeleteTask.pending, state => {
      state.deleteTask.loading = true
      state.deleteTask.error = false
      state.deleteTask.data = {}
      state.deleteTask.message = ''
    })
    builder.addCase(triggerDeleteTask.fulfilled, (state, action) => {
      state.deleteTask.loading = false
      state.deleteTask.data = action.payload
      state.deleteTask.error = false
      state.deleteTask.message = action.payload?.message as unknown as string
      state.deleteTask.statusCode = action.payload
        ?.status_code as unknown as number
    })
    builder.addCase(triggerDeleteTask.rejected, (state, action) => {
      state.deleteTask.loading = false
      state.deleteTask.error = true
      state.deleteTask.message = action.payload?.message as unknown as string
      state.deleteTask.statusCode = action.payload?.status_code ?? null
    })

    //EDIT INDICATOR
    builder.addCase(triggerEditIndicator.pending, state => {
      state.editIndcator.loading = true
      state.editIndcator.error = false
      state.editIndcator.data = {}
      state.editIndcator.message = ''
    })
    builder.addCase(triggerEditIndicator.fulfilled, (state, action) => {
      state.editIndcator.loading = false
      state.editIndcator.data = action.payload
      state.editIndcator.error = false
      state.editIndcator.message = action.payload?.message as unknown as string
      state.editIndcator.statusCode = action.payload
        ?.status_code as unknown as number
    })
    builder.addCase(triggerEditIndicator.rejected, (state, action) => {
      state.editIndcator.loading = false
      state.editIndcator.error = true
      state.editIndcator.message = action.payload?.message as unknown as string
      state.editIndcator.statusCode = action.payload?.status_code ?? null
    })

    //DELETE INDICATOR
    builder.addCase(triggerDeleteIndicator.pending, state => {
      state.deleteIndcator.loading = true
      state.deleteIndcator.error = false
      state.deleteIndcator.data = {}
      state.deleteIndcator.message = ''
    })
    builder.addCase(triggerDeleteIndicator.fulfilled, (state, action) => {
      state.deleteIndcator.loading = false
      state.deleteIndcator.data = action.payload
      state.deleteIndcator.error = false
      state.deleteIndcator.message = action.payload
        ?.message as unknown as string
      state.deleteIndcator.statusCode = action.payload
        ?.status_code as unknown as number
    })
    builder.addCase(triggerDeleteIndicator.rejected, (state, action) => {
      state.deleteIndcator.loading = false
      state.deleteIndcator.error = true
      state.deleteIndcator.message = action.payload
        ?.message as unknown as string
      state.deleteIndcator.statusCode = action.payload?.status_code ?? null
    })

    //REPORT GRAPH
    builder.addCase(triggerGetReportGraph.pending, state => {
      state.reportGraph.loading = true
      state.reportGraph.error = false
      state.reportGraph.data = {}
      state.reportGraph.message = ''
    })
    builder.addCase(triggerGetReportGraph.fulfilled, (state, action) => {
      state.reportGraph.loading = false
      state.reportGraph.data = action.payload
      state.reportGraph.error = false
      state.reportGraph.message = action.payload?.message as unknown as string
      state.reportGraph.statusCode = action.payload
        ?.status_code as unknown as number
    })
    builder.addCase(triggerGetReportGraph.rejected, (state, action) => {
      state.reportGraph.loading = false
      state.reportGraph.error = true
      state.reportGraph.message = action.payload?.message as unknown as string
      state.reportGraph.statusCode = action.payload?.status_code ?? null
    })
  },
})

export const {
  resetCommunityTaskState,
  resetState,
  resetCreateCommunityTaskState,
  resetViewSubmittedTask,
  resetReviewSubmittedTask,
  resetDeleteTask,
  resetEditIndicator,
  resetDeleteIndicator,
} = communityTaskSlice.actions

export default communityTaskSlice.reducer

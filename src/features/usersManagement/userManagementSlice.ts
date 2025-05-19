import { createSlice } from '@reduxjs/toolkit'
import {
  triggerGetUserManagementMetrics,
  triggerListUsersWithPendingKyc,
  triggerUpdateKycStatus,
  triggerUpdateUserStatus,
  triggerViewUserProfile,
} from './userManagementThunk'

interface IinitialState {
  kyc: {
    data: Record<string, string>[] | any
    loading: boolean
    error: boolean
    message: string | undefined
    statusCode?: number | null
  }
  kycStatusUpdate: {
    data: Record<string, string>[] | any
    loading: boolean
    error: boolean
    message: string | undefined
    statusCode?: number | null
  }
  userManagementMetrics: {
    data: Record<string, string>[] | any
    loading: boolean
    error: boolean
    message: string | undefined
    statusCode?: number | null
  }
  userStatusUpdate: {
    data: Record<string, string>[] | any
    loading: boolean
    error: boolean
    message: string | undefined
    statusCode?: number | null
  }
}

const initialState: IinitialState = {
  kyc: {
    data: [],
    loading: false,
    error: false,
    message: '',
    statusCode: null,
  },
  kycStatusUpdate: {
    data: [],
    loading: false,
    error: false,
    message: '',
    statusCode: null,
  },
  userManagementMetrics: {
    data: [],
    loading: false,
    error: false,
    message: '',
    statusCode: null,
  },
  userStatusUpdate: {
    data: [],
    loading: false,
    error: false,
    message: '',
    statusCode: null,
  },
}

const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    resetKycState: state => {
      state.kyc.error = initialState.kyc.error
      state.kyc.message = initialState.kyc.message
      state.kyc.statusCode = initialState.kyc.statusCode
    },
    resetKycStatusUpdateState: state => {
      state.kycStatusUpdate.error = initialState.kyc.error
      state.kycStatusUpdate.message = initialState.kyc.message
      state.kycStatusUpdate.statusCode = initialState.kyc.statusCode
    },

    resetUserMgtMetricsState: state => {
      state.userManagementMetrics.error = initialState.kyc.error
      state.userManagementMetrics.message = initialState.kyc.message
      state.userManagementMetrics.statusCode = initialState.kyc.statusCode
    },
    resetUpdateUserStatusState: state => {
      state.userStatusUpdate.error = initialState.userStatusUpdate.error
      state.userStatusUpdate.message = initialState.userStatusUpdate.message
      state.userStatusUpdate.statusCode =
        initialState.userStatusUpdate.statusCode
    },
  },
  extraReducers: builder => {
    //LIST ALL AGENTS
    builder.addCase(triggerListUsersWithPendingKyc.pending, state => {
      state.kyc.loading = true
      state.kyc.error = false
      state.kyc.data = {}
      state.kyc.message = ''
    })
    builder.addCase(
      triggerListUsersWithPendingKyc.fulfilled,
      (state, action) => {
        state.kyc.loading = false
        state.kyc.data = action.payload
        state.kyc.error = false
        state.kyc.message = action.payload?.message as unknown as string
        state.kyc.statusCode = action.payload?.status_code as unknown as number
        console.log('USERS IN STATE', JSON.stringify(state.kyc.data, null, 2))
      }
    )
    builder.addCase(
      triggerListUsersWithPendingKyc.rejected,
      (state, action) => {
        state.kyc.loading = false
        state.kyc.error = true
        state.kyc.message = action.payload?.message as unknown as string
        state.kyc.statusCode = action.payload?.status_code ?? null
      }
    )

    //VIEW A USER PROFILE
    builder.addCase(triggerViewUserProfile.pending, state => {
      state.kyc.loading = true
      state.kyc.error = false
      state.kyc.data = {}
      state.kyc.message = ''
    })
    builder.addCase(triggerViewUserProfile.fulfilled, (state, action) => {
      state.kyc.loading = false
      state.kyc.data = action.payload?.results!
      state.kyc.error = false
      state.kyc.message = action.payload?.message as unknown as string
      state.kyc.statusCode = action.payload?.status_code as unknown as number
    })
    builder.addCase(triggerViewUserProfile.rejected, (state, action) => {
      state.kyc.loading = false
      state.kyc.error = true
      state.kyc.message = action.payload?.message as unknown as string
      state.kyc.statusCode = action.payload?.status_code ?? null
    })
    //Update KYC STATUS
    builder.addCase(triggerUpdateKycStatus.pending, state => {
      state.kycStatusUpdate.loading = true
      state.kycStatusUpdate.error = false
      state.kycStatusUpdate.data = {}
      state.kycStatusUpdate.message = ''
    })
    builder.addCase(triggerUpdateKycStatus.fulfilled, (state, action) => {
      state.kycStatusUpdate.loading = false
      state.kycStatusUpdate.data = action.payload?.results!
      state.kycStatusUpdate.error = false
      state.kycStatusUpdate.message = action.payload
        ?.message as unknown as string
      state.kycStatusUpdate.statusCode = action.payload
        ?.status_code as unknown as number
    })
    builder.addCase(triggerUpdateKycStatus.rejected, (state, action) => {
      state.kycStatusUpdate.loading = false
      state.kycStatusUpdate.error = true
      state.kycStatusUpdate.message = action.payload
        ?.message as unknown as string
      state.kycStatusUpdate.statusCode = action.payload?.status_code ?? null
    })

    //Usser management metrics
    builder.addCase(triggerGetUserManagementMetrics.pending, state => {
      state.userManagementMetrics.loading = true
      state.userManagementMetrics.error = false
      state.userManagementMetrics.data = {}
      state.userManagementMetrics.message = ''
    })
    builder.addCase(
      triggerGetUserManagementMetrics.fulfilled,
      (state, action) => {
        state.userManagementMetrics.loading = false
        state.userManagementMetrics.data = action.payload?.results!
        state.userManagementMetrics.error = false
        state.userManagementMetrics.message = action.payload
          ?.message as unknown as string
        state.userManagementMetrics.statusCode = action.payload
          ?.status_code as unknown as number
      }
    )
    builder.addCase(
      triggerGetUserManagementMetrics.rejected,
      (state, action) => {
        state.userManagementMetrics.loading = false
        state.userManagementMetrics.error = true
        state.userManagementMetrics.message = action.payload
          ?.message as unknown as string
        state.userManagementMetrics.statusCode =
          action.payload?.status_code ?? null
      }
    )

    //UPDATE USER STATUS
    //Usser management metrics
    builder.addCase(triggerUpdateUserStatus.pending, state => {
      state.userStatusUpdate.loading = true
      state.userStatusUpdate.error = false
      state.userStatusUpdate.data = {}
      state.userStatusUpdate.message = ''
    })
    builder.addCase(triggerUpdateUserStatus.fulfilled, (state, action) => {
      state.userStatusUpdate.loading = false
      state.userStatusUpdate.data = action.payload
      state.userStatusUpdate.error = false
      state.userStatusUpdate.message = action.payload
        ?.message as unknown as string
      state.userStatusUpdate.statusCode = action.payload
        ?.status_code as unknown as number
    })
    builder.addCase(triggerUpdateUserStatus.rejected, (state, action) => {
      state.userStatusUpdate.loading = false
      state.userStatusUpdate.error = true
      state.userStatusUpdate.message = action.payload
        ?.message as unknown as string
      state.userStatusUpdate.statusCode = action.payload?.status_code ?? null
    })
  },
})

export const {
  resetKycState,
  resetKycStatusUpdateState,
  resetUserMgtMetricsState,
  resetUpdateUserStatusState,
} = userManagementSlice.actions

export default userManagementSlice.reducer

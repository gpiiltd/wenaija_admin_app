import { createSlice } from "@reduxjs/toolkit";
import {
  triggerGetUserManagementMetrics,
  triggerListUsersWithPendingKyc,
  triggerUpdateKycStatus,
  triggerViewUserProfile,
} from "./userManagementThunk";

interface IinitialState {
  kyc: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };
  kycStatusUpdate: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };
  userManagementMetrics: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };
}

const initialState: IinitialState = {
  kyc: {
    data: [],
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
  kycStatusUpdate: {
    data: [],
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
  userManagementMetrics: {
    data: [],
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
};

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    resetKycState: (state) => {
      state.kyc.error = initialState.kyc.error;
      state.kyc.message = initialState.kyc.message;
      state.kyc.statusCode = initialState.kyc.statusCode;
    },
    resetKycStatusUpdateState: (state) => {
      state.kycStatusUpdate.error = initialState.kyc.error;
      state.kycStatusUpdate.message = initialState.kyc.message;
      state.kycStatusUpdate.statusCode = initialState.kyc.statusCode;
    },

    resetUserMgtMetricsState: (state) => {
      state.userManagementMetrics.error = initialState.kyc.error;
      state.userManagementMetrics.message = initialState.kyc.message;
      state.userManagementMetrics.statusCode = initialState.kyc.statusCode;
    },
  },
  extraReducers: (builder) => {
    //LIST ALL AGENTS
    builder.addCase(triggerListUsersWithPendingKyc.pending, (state) => {
      state.kyc.loading = true;
      state.kyc.error = false;
      state.kyc.data = {};
      state.kyc.message = "";
    });
    builder.addCase(
      triggerListUsersWithPendingKyc.fulfilled,
      (state, action) => {
        state.kyc.loading = false;
        state.kyc.data = action.payload?.results!;
        state.kyc.error = false;
        state.kyc.message = action.payload?.message as unknown as string;
        state.kyc.statusCode = action.payload?.status_code as unknown as number;
      }
    );
    builder.addCase(
      triggerListUsersWithPendingKyc.rejected,
      (state, action) => {
        state.kyc.loading = false;
        state.kyc.error = true;
        state.kyc.message = action.payload?.message as unknown as string;
        state.kyc.statusCode = action.payload?.status_code ?? null;
      }
    );

    //VIEW A USER PROFILE
    builder.addCase(triggerViewUserProfile.pending, (state) => {
      state.kyc.loading = true;
      state.kyc.error = false;
      state.kyc.data = {};
      state.kyc.message = "";
    });
    builder.addCase(triggerViewUserProfile.fulfilled, (state, action) => {
      state.kyc.loading = false;
      state.kyc.data = action.payload?.results!;
      state.kyc.error = false;
      state.kyc.message = action.payload?.message as unknown as string;
      state.kyc.statusCode = action.payload?.status_code as unknown as number;
    });
    builder.addCase(triggerViewUserProfile.rejected, (state, action) => {
      state.kyc.loading = false;
      state.kyc.error = true;
      state.kyc.message = action.payload?.message as unknown as string;
      state.kyc.statusCode = action.payload?.status_code ?? null;
    });
    //Update KYC STATUS
    builder.addCase(triggerUpdateKycStatus.pending, (state) => {
      state.kycStatusUpdate.loading = true;
      state.kycStatusUpdate.error = false;
      state.kycStatusUpdate.data = {};
      state.kycStatusUpdate.message = "";
    });
    builder.addCase(triggerUpdateKycStatus.fulfilled, (state, action) => {
      state.kycStatusUpdate.loading = false;
      state.kycStatusUpdate.data = action.payload?.results!;
      state.kycStatusUpdate.error = false;
      state.kycStatusUpdate.message = action.payload
        ?.message as unknown as string;
      state.kycStatusUpdate.statusCode = action.payload
        ?.status_code as unknown as number;
   
    });
    builder.addCase(triggerUpdateKycStatus.rejected, (state, action) => {
      state.kycStatusUpdate.loading = false;
      state.kycStatusUpdate.error = true;
      state.kycStatusUpdate.message = action.payload
        ?.message as unknown as string;
      state.kycStatusUpdate.statusCode = action.payload?.status_code ?? null;
    });

    //Usser management metrics
    builder.addCase(triggerGetUserManagementMetrics.pending, (state) => {
      state.userManagementMetrics.loading = true;
      state.userManagementMetrics.error = false;
      state.userManagementMetrics.data = {};
      state.userManagementMetrics.message = "";
    });
    builder.addCase(triggerGetUserManagementMetrics.fulfilled, (state, action) => {
      state.userManagementMetrics.loading = false;
      state.userManagementMetrics.data = action.payload?.results!;
      state.userManagementMetrics.error = false;
      state.userManagementMetrics.message = action.payload
        ?.message as unknown as string;
      state.userManagementMetrics.statusCode = action.payload
        ?.status_code as unknown as number;
  
    });
    builder.addCase(triggerGetUserManagementMetrics.rejected, (state, action) => {
      state.userManagementMetrics.loading = false;
      state.userManagementMetrics.error = true;
      state.userManagementMetrics.message = action.payload
        ?.message as unknown as string;
      state.userManagementMetrics.statusCode = action.payload?.status_code ?? null;
    });
  },
});

export const { resetKycState, resetKycStatusUpdateState,resetUserMgtMetricsState } =
  userManagementSlice.actions;

export default userManagementSlice.reducer;

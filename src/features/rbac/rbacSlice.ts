import { createSlice } from "@reduxjs/toolkit";
import { triggerDeactivateUser, triggerGetAllRoles, triggerListAllAccounts, triggerListASingleUser } from "./rbacThunks";

interface IinitialState {
  error: boolean;
  loading: boolean;
  userData: Record<string, any>[] | Record<string, any> | null; 
  message: string;
  statusCode?: number | null;
  rolesData:{
    data: Record<string, string>[] | any ;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  }
}

const initialState: IinitialState = {
  error: false,
  loading: false,
  userData: null,
  message: "",
  statusCode: null,
  rolesData:{
    data: [],
    loading: false,
    error: false,
    message: '',
    statusCode: null
  }
};

const rbacSlice = createSlice({
  name: "rbac",
  initialState,
  reducers: {
    resetState: (state) => {
      state.error = initialState.error;
      state.message = initialState.message;
      state.statusCode = initialState.statusCode;
    },
  },
  extraReducers: (builder) => {
    //LIST ALL ADMIN
    builder.addCase(triggerListAllAccounts.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.userData = {};
      state.message = "";
    });
    builder.addCase(
        triggerListAllAccounts.fulfilled,
      (state, action) => {
        state.loading = false;
        state.userData = action.payload?.results!;
        state.error = false;
        state.message = action.payload?.message as unknown as string;
        state.statusCode = action.payload?.status_code as unknown as number;
      }
    );
    builder.addCase(
        triggerListAllAccounts.rejected,
      (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload?.message as unknown as string;
        state.statusCode = action.payload?.status_code ?? null;
       
      }
    );

    //get user by id
    builder.addCase(triggerListASingleUser.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.userData = {};
      state.message = "";
    });
    builder.addCase(
      triggerListASingleUser.fulfilled,
      (state, action) => {
        state.loading = false;
        state.userData = action.payload?.results!;
        state.error = false;
        state.message = action.payload?.message as unknown as string;
        state.statusCode = action.payload?.status_code as unknown as number;
      }
    );
    builder.addCase(
      triggerListASingleUser.rejected,
      (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload?.message as unknown as string;
        state.statusCode = action.payload?.status_code ?? null;
      
      }
    );

    //DEACTIVATE USER
    builder.addCase(triggerDeactivateUser.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.userData = {};
      state.message = "";
    });
    builder.addCase(
      triggerDeactivateUser.fulfilled,
      (state, action) => {
        state.loading = false;
        state.userData = action.payload?.results!;
        state.error = false;
        state.message = action.payload?.message as unknown as string;
        state.statusCode = action.payload?.status_code as unknown as number;
      }
    );
    builder.addCase(
      triggerDeactivateUser.rejected,
      (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload?.message as unknown as string;
        state.statusCode = action.payload?.status_code ?? null;
       
      }
    );

    //LIST ROLES
    builder.addCase(triggerGetAllRoles.pending, (state) => {
      state.rolesData.loading = true;
      state.rolesData.error = false;
      state.rolesData.data = [];
      state.rolesData.message = "";
    });
    builder.addCase(
      triggerGetAllRoles.fulfilled,
      (state, action) => {
        console.log("trigger CNP success:", action.payload);
        state.rolesData.loading = false;
        state.rolesData.data = action.payload;
        state.rolesData.error = false;
        // state.rolesData.message = action.payload?.message as unknown as string;
        // state.rolesData.statusCode = action.payload?.status_code as unknown as number;
        console.log("STATUS_CODE", state.statusCode);
      }
    );
    builder.addCase(
      triggerGetAllRoles.rejected,
      (state, action) => {
        state.rolesData.loading = false;
        state.rolesData.error = true;
        state.rolesData.message = action.payload?.message as unknown as string;
        state.rolesData.statusCode = action.payload?.status_code ?? null;
       
      }
    );
  },
});

export const { resetState} = rbacSlice.actions;

export default rbacSlice.reducer;

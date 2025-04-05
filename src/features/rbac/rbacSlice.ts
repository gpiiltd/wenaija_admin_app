import { createSlice } from "@reduxjs/toolkit";
import { triggerListAllAccounts } from "./rbacThunks";

interface IinitialState {
  error: boolean;
  loading: boolean;
  userData: Record<string, any>[] | Record<string, any> | null; 
  message: string;
  statusCode?: number | null;
}

const initialState: IinitialState = {
  error: false,
  loading: false,
  userData: null,
  message: "",
  statusCode: null,
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
        console.log("trigger CNP success:", action.payload);
        state.loading = false;
        state.userData = action.payload?.results!;
        state.error = false;
        state.message = action.payload?.message as unknown as string;
        state.statusCode = action.payload?.status_code as unknown as number;
        console.log("STATUS_CODE", state.statusCode);
      }
    );
    builder.addCase(
        triggerListAllAccounts.rejected,
      (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload?.message as unknown as string;
        state.statusCode = action.payload?.status_code ?? null;
        console.log("ERR_MESSAGE CNP", state.message);
        console.log("STATUS_CODE CNP", state.statusCode);
      }
    );
  },
});

export const { resetState} = rbacSlice.actions;

export default rbacSlice.reducer;

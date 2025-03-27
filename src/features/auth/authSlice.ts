import { createSlice } from "@reduxjs/toolkit";
import { triggerAdminInvite, triggerAuth, triggerPasswordReset, triggerSignin } from "./authThunks";

interface IinitialState {
  error: boolean;
  loading: boolean;
  userData: Record<string, string>;
  message: string;
  statusCode?: number;
}

const initialState: IinitialState = {
  error: false,
  loading: false,
  userData: {},
  message: "",
  statusCode: undefined,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: (state) => {
      state.error = initialState.error;
      state.message = initialState.message;
      state.userData = initialState.userData;
      state.statusCode = initialState.statusCode;
    },
  },
  extraReducers: (builder) => {
    // SIGN IN
    builder.addCase(triggerSignin.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.userData = {};
      state.message = "";
    });
    builder.addCase(triggerSignin.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload?.results!;
      state.error = false;
      state.message = action.payload?.message as unknown as string;
      console.log('MESSAGE',state.message);

    });
    builder.addCase(triggerSignin.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.userData = {};
      state.message = action.payload as unknown as string;
    });

    //AUTH
    builder.addCase(triggerAuth.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.userData = {};
      state.message = "";
    });
    builder.addCase(triggerAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload?.results!;
      state.error = false;
      state.message = action.payload?.message as unknown as string;
      state.statusCode= action.payload?.status_code as unknown as number
      console.log('MESSAGE',state.message);
      console.log('MESSAGE',state.statusCode);

    });
    builder.addCase(triggerAuth.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.userData = {};
      state.message = action.payload as unknown as string;
    });

    //ADMIN INVITE
    builder.addCase(triggerAdminInvite.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.userData = {};
      state.message = "";
    });
    builder.addCase(triggerAdminInvite.fulfilled, (state, action) => {
      console.log("triggerAdminInvite success:", action.payload);

      state.loading = false;
      state.userData = action.payload?.results!;
      state.error = false;
      state.message = action.payload?.message as unknown as string;
      state.statusCode= action.payload?.status_code as unknown as number
      console.log('MESSAGE',state.statusCode);
    });
    builder.addCase(triggerAdminInvite.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.userData = {};
      state.message = action.payload as unknown as string;
      console.log('MESSAGE',state.message);
    });

    //PASSWORD RESET
    builder.addCase(triggerPasswordReset.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.userData = {};
      state.message = "";
    });
    builder.addCase(triggerPasswordReset.fulfilled, (state, action) => {
      console.log("triggerPasswordresset success:", action.payload);

      state.loading = false;
      state.userData = action.payload?.results!;
      state.error = false;
      state.message = action.payload?.message as unknown as string;
      state.statusCode= action.payload?.status_code as unknown as number
      console.log('MESSAGE',state.statusCode);
    });
    builder.addCase(triggerPasswordReset.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.userData = {};
      state.message = action.payload as unknown as string;
      state.statusCode= action.payload as unknown as number
      console.log('MESSAGE',state.message);
      console.log('MESSAGE',state.statusCode);

    });
  },
});

export const { resetState } = userSlice.actions;

export default userSlice.reducer;

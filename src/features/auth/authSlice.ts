import { createSlice } from "@reduxjs/toolkit";
import { triggerAuth, triggerSignin } from "./authThunks";

interface IinitialState {
  error: boolean;
  loading: boolean;
  userData: Record<string, string>;
  message: string;
}

const initialState: IinitialState = {
  error: false,
  loading: false,
  userData: {},
  message: "",
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: (state) => {
      state.error = initialState.error;
      state.message = initialState.message;
      state.userData = initialState.userData;
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
      console.log('MESSAGE',state.message);
    });
    builder.addCase(triggerAuth.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.userData = {};
      state.message = action.payload as unknown as string;
    });
  },
});

export const { resetState } = userSlice.actions;

export default userSlice.reducer;

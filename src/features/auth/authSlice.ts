import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import LoginService from './authService';

interface IinitialState {
  error:boolean
  loading: boolean;
  userData:Record<string,string>;
  message:string;
}

const initialState: IinitialState = {
  error: false,
  loading: false,
  userData: {},
  message: '',
};

export const triggerSignin = createAsyncThunk('auth/signin', async (params: Record<string, string>, thunkAPI) => {
  try {
    return await LoginService.signin(params);
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

const userSlice = createSlice({
  name: 'auth',
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
      state.message = '';
    });
    builder.addCase(triggerSignin.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload!;
      state.error = false;
      state.message = action.payload?.message as unknown as string;

    });
    builder.addCase(triggerSignin.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.userData = {};
      state.message = action.payload as unknown as string;
    });
  },
});

export const {resetState} = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { triggerAddInstitution } from "./institutionManagementThunk";

interface IinitialState {
  createInstitution: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };
}

const initialState: IinitialState = {
  createInstitution: {
    data: [],
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
};

const institutionManagementSlice = createSlice({
  name: "institutionManagement",
  initialState,
  reducers: {
    resetcreateInstitutionState: (state) => {
      state.createInstitution.error = initialState.createInstitution.error;
      state.createInstitution.message = initialState.createInstitution.message;
      state.createInstitution.statusCode =
        initialState.createInstitution.statusCode;
    },
  },
  extraReducers: (builder) => {
    //CREATE INSTITUTION
    builder.addCase(triggerAddInstitution.pending, (state) => {
      state.createInstitution.loading = true;
      state.createInstitution.error = false;
      state.createInstitution.data = {};
      state.createInstitution.message = "";
    });
    builder.addCase(triggerAddInstitution.fulfilled, (state, action) => {
      state.createInstitution.loading = false;
      state.createInstitution.data = action.payload.results;
      state.createInstitution.error = false;
      state.createInstitution.message = action.payload
        ?.message as unknown as string;
      state.createInstitution.statusCode = action.payload
        ?.status_code as unknown as number;
      console.log(
        "INSTITUTION CREATED",
        JSON.stringify(state.createInstitution.data, null, 2)
      );
    });
    builder.addCase(triggerAddInstitution.rejected, (state, action) => {
      state.createInstitution.loading = false;
      state.createInstitution.error = true;
      state.createInstitution.message = action.payload
        ?.message as unknown as string;
      state.createInstitution.statusCode = action.payload?.status_code ?? null;
      console.log('ERR',state.createInstitution.message)
    });
  },
});

export const { resetcreateInstitutionState } = institutionManagementSlice.actions;

export default institutionManagementSlice.reducer;

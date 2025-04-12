import { createSlice } from "@reduxjs/toolkit";
import { triggerAddInstitution, triggerListAllInstitutions, triggerListASingleInstitute } from "./institutionManagementThunk";

interface IinitialState {
  institution: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };
}

const initialState: IinitialState = {
  institution: {
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
    resetinstitutionState: (state) => {
      state.institution.error = initialState.institution.error;
      state.institution.message = initialState.institution.message;
      state.institution.statusCode =
        initialState.institution.statusCode;
    },
  },
  extraReducers: (builder) => {
    //CREATE INSTITUTION
    builder.addCase(triggerAddInstitution.pending, (state) => {
      state.institution.loading = true;
      state.institution.error = false;
      state.institution.data = {};
      state.institution.message = "";
    });
    builder.addCase(triggerAddInstitution.fulfilled, (state, action) => {
      state.institution.loading = false;
      state.institution.data = action.payload.results;
      state.institution.error = false;
      state.institution.message = action.payload
        ?.message as unknown as string;
      state.institution.statusCode = action.payload
        ?.status_code as unknown as number;
      console.log(
        "INSTITUTION CREATED",
        JSON.stringify(state.institution.data, null, 2)
      );
    });
    builder.addCase(triggerAddInstitution.rejected, (state, action) => {
      state.institution.loading = false;
      state.institution.error = true;
      state.institution.message = action.payload
        ?.message as unknown as string;
      state.institution.statusCode = action.payload?.status_code ?? null;
      console.log('ERR',state.institution.message)
    });

    //GET INSTITUTIONS
    builder.addCase(triggerListAllInstitutions.pending, (state) => {
      state.institution.loading = true;
      state.institution.error = false;
      state.institution.data = {};
      state.institution.message = "";
    });
    builder.addCase(triggerListAllInstitutions.fulfilled, (state, action) => {
      state.institution.loading = false;
      state.institution.data = action.payload;
      state.institution.error = false;
      state.institution.message = action.payload
        ?.message as unknown as string;
      state.institution.statusCode = action.payload
        ?.status_code as unknown as number;
      console.log(
        "INSTITUTION Gotten",
        JSON.stringify(state.institution.data, null, 2)
      );
    });
    builder.addCase(triggerListAllInstitutions.rejected, (state, action) => {
      state.institution.loading = false;
      state.institution.error = true;
      state.institution.message = action.payload
        ?.message as unknown as string;
      state.institution.statusCode = action.payload?.status_code ?? null;
      console.log('ERR INSTITUTION Gotten',state.institution.message)
    });

    //GET INSTITUTE
    builder.addCase(triggerListASingleInstitute.pending, (state) => {
      state.institution.loading = true;
      state.institution.error = false;
      state.institution.data = {};
      state.institution.message = "";
    });
    builder.addCase(triggerListASingleInstitute.fulfilled, (state, action) => {
      state.institution.loading = false;
      state.institution.data = action.payload;
      state.institution.error = false;
      state.institution.message = action.payload
        ?.message as unknown as string;
      state.institution.statusCode = action.payload
        ?.status_code as unknown as number;
      console.log(
        "AN INSTITUTION Gotten",
        JSON.stringify(state.institution.data, null, 2)
      );
    });
    builder.addCase(triggerListASingleInstitute.rejected, (state, action) => {
      state.institution.loading = false;
      state.institution.error = true;
      state.institution.message = action.payload
        ?.message as unknown as string;
      state.institution.statusCode = action.payload?.status_code ?? null;
      console.log('ERR AN INSTITUTION Gotten',state.institution.message)
    });
  },
});

export const { resetinstitutionState } = institutionManagementSlice.actions;

export default institutionManagementSlice.reducer;

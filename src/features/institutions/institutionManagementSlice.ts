import { createSlice } from "@reduxjs/toolkit";
import { triggerAddInstitution, triggerGetInstitutionsAnalytics, triggerListAllInstitutions, triggerListAllRecentlyInstitutions, triggerListASingleInstitute, triggerUpdateInstitute } from "./institutionManagementThunk";

interface IinitialState {
  institution: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  },
  createInstitution: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  }
  updateInstitute: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  }
  institutionAnalytics: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  }
  allInstitution: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  }
}

const initialState: IinitialState = {
  institution: {
    data: [],
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
  createInstitution: {
    data: [],
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
  updateInstitute: {
    data: [],
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
  institutionAnalytics: {
    data: [],
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
  allInstitution: {
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
    resetCreateinstitutionState: (state) => {
      state.createInstitution.error = initialState.createInstitution.error;
      state.createInstitution.message = initialState.createInstitution.message;
      state.createInstitution.statusCode =
        initialState.createInstitution.statusCode;
        state.createInstitution.data =
        initialState.createInstitution.data;
      
    },
    resetUpdateInstitution: (state) => {
      state.updateInstitute.error = initialState.updateInstitute.error;
      state.updateInstitute.message = initialState.updateInstitute.message;
      state.updateInstitute.statusCode =
        initialState.updateInstitute.statusCode;
        
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
      console.log("✅ Reducer hit: Fulfilled");
      state.createInstitution.loading = false;
      state.createInstitution.data = action.payload.data;
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

    //GET INSTITUTIONS
    builder.addCase(triggerListAllRecentlyInstitutions.pending, (state) => {
      state.institution.loading = true;
      state.institution.error = false;
      state.institution.data = {};
      state.institution.message = "";
    });
    builder.addCase(triggerListAllRecentlyInstitutions.fulfilled, (state, action) => {
      state.institution.loading = false;
      state.institution.data = action.payload;
      state.institution.error = false;
      state.institution.message = action.payload
        ?.message as unknown as string;
      state.institution.statusCode = action.payload
        ?.status_code as unknown as number;
        console.log('RECENTLY ADDED',state.institution.data)
    
    });
    builder.addCase(triggerListAllRecentlyInstitutions.rejected, (state, action) => {
      state.institution.loading = false;
      state.institution.error = true;
      state.institution.message = action.payload
        ?.message as unknown as string;
      state.institution.statusCode = action.payload?.status_code ?? null;
    });

      //GET ALL INSTITUTIONS
      builder.addCase(triggerListAllInstitutions.pending, (state) => {
        state.allInstitution.loading = true;
        state.allInstitution.error = false;
        state.allInstitution.data = {};
        state.allInstitution.message = "";
      });
      builder.addCase(triggerListAllInstitutions.fulfilled, (state, action) => {
        state.allInstitution.loading = false;
        state.allInstitution.data = action.payload;
        state.allInstitution.error = false;
        state.allInstitution.message = action.payload
          ?.message as unknown as string;
        state.allInstitution.statusCode = action.payload
          ?.status_code as unknown as number;
          console.log('All insitutions',state.allInstitution.data)
      
      });
      builder.addCase(triggerListAllInstitutions.rejected, (state, action) => {
        state.allInstitution.loading = false;
        state.allInstitution.error = true;
        state.allInstitution.message = action.payload
          ?.message as unknown as string;
        state.allInstitution.statusCode = action.payload?.status_code ?? null;
      });

    //GET SINGLE INSTITUTE
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
  
    });
    builder.addCase(triggerListASingleInstitute.rejected, (state, action) => {
      state.institution.loading = false;
      state.institution.error = true;
      state.institution.message = action.payload
        ?.message as unknown as string;
      state.institution.statusCode = action.payload?.status_code ?? null;
    });

    //UPDATE INSTITUTE
    builder.addCase(triggerUpdateInstitute.pending, (state) => {
      state.updateInstitute.loading = true;
      state.updateInstitute.error = false;
      state.updateInstitute.data = {};
      state.institution.message = "";
    });
    builder.addCase(triggerUpdateInstitute.fulfilled, (state, action) => {
      state.updateInstitute.loading = false;
      state.updateInstitute.data = action.payload;
      state.updateInstitute.error = false;
      state.updateInstitute.message = action.payload
        ?.message as unknown as string;
      state.updateInstitute.statusCode = action.payload
        ?.status_code as unknown as number;
  
    });
    builder.addCase(triggerUpdateInstitute.rejected, (state, action) => {
      state.updateInstitute.loading = false;
      state.updateInstitute.error = true;
      state.updateInstitute.message = action.payload
        ?.message as unknown as string;
      state.updateInstitute.statusCode = action.payload?.status_code ?? null;
    });

       //GET INSTITUTion analytics
       builder.addCase(triggerGetInstitutionsAnalytics.pending, (state) => {
        state.institutionAnalytics.loading = true;
        state.institutionAnalytics.error = false;
        state.institutionAnalytics.data = {};
        state.institution.message = "";
      });
      builder.addCase(triggerGetInstitutionsAnalytics.fulfilled, (state, action) => {
        state.institutionAnalytics.loading = false;
        state.institutionAnalytics.data = action.payload;
        state.institutionAnalytics.error = false;
        state.institutionAnalytics.message = action.payload
          ?.message as unknown as string;
        state.institutionAnalytics.statusCode = action.payload
          ?.status_code as unknown as number;
    
      });
      builder.addCase(triggerGetInstitutionsAnalytics.rejected, (state, action) => {
        state.institutionAnalytics.loading = false;
        state.institutionAnalytics.error = true;
        state.institutionAnalytics.message = action.payload
          ?.message as unknown as string;
        state.institutionAnalytics.statusCode = action.payload?.status_code ?? null;
      });
  },
});

export const { resetinstitutionState,resetCreateinstitutionState,resetUpdateInstitution } = institutionManagementSlice.actions;

export default institutionManagementSlice.reducer;

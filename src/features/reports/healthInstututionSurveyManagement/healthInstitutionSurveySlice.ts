import { createSlice } from "@reduxjs/toolkit";
import {
  triggerCreateCategories,
  triggerCreateIndicators,
  triggerGetACategory,
  triggerGetCategories,
  triggerGetSurveyQuesitions,
} from "./healthInstitutionSurveyThunk";

interface IinitialState {
  questions: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };

  categories: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };
  createCategories: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };

  createIndicators: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };
  category: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };
}

const initialState: IinitialState = {
  questions: {
    data: [],
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
  categories: {
    data: [],
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
  createCategories: {
    data: [],
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
  createIndicators: {
    data: [],
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
  category: {
    data: [],
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
};

const healthInstitutionSurveySlice = createSlice({
  name: "healthInstitutionSurveyManagement",
  initialState,
  reducers: {
    resetSurveyQuestionsState: (state) => {
      state.questions.error = initialState.questions.error;
      state.questions.message = initialState.questions.message;
      state.questions.statusCode = initialState.questions.statusCode;
    },
    resetCategoriesState: (state) => {
      state.categories.error = initialState.categories.error;
      state.categories.message = initialState.categories.message;
      state.categories.statusCode = initialState.categories.statusCode;
    },
    resetCreateCategoriesState: (state) => {
      state.createCategories.error = initialState.createCategories.error;
      state.createCategories.message = initialState.createCategories.message;
      state.createCategories.statusCode =
        initialState.createCategories.statusCode;
    },
    resetCreateIndicatorsState: (state) => {
      state.createIndicators.error = initialState.createIndicators.error;
      state.createIndicators.message = initialState.createIndicators.message;
      state.createIndicators.statusCode =
        initialState.createIndicators.statusCode;
    },
    resetGetACategoryState: (state) => {
      state.createIndicators.error = initialState.createIndicators.error;
      state.createIndicators.message = initialState.createIndicators.message;
      state.createIndicators.statusCode =
        initialState.createIndicators.statusCode;
    },
  },
  extraReducers: (builder) => {
    //LIST LIST SURVEY QUESTIONS
    builder.addCase(triggerGetSurveyQuesitions.pending, (state) => {
      state.questions.loading = true;
      state.questions.error = false;
      state.questions.data = {};
      state.questions.message = "";
    });
    builder.addCase(triggerGetSurveyQuesitions.fulfilled, (state, action) => {
      state.questions.loading = false;
      state.questions.data = action.payload?.results!;
      state.questions.error = false;
      state.questions.message = action.payload?.message as unknown as string;
      state.questions.statusCode = action.payload
        ?.status_code as unknown as number;
    });
    builder.addCase(triggerGetSurveyQuesitions.rejected, (state, action) => {
      state.questions.loading = false;
      state.questions.error = true;
      state.questions.message = action.payload?.message as unknown as string;
      state.questions.statusCode = action.payload?.status_code ?? null;
    });

    //LIST ALL CATEGORIES
    builder.addCase(triggerGetCategories.pending, (state) => {
      state.categories.loading = true;
      state.categories.error = false;
      state.categories.data = {};
      state.categories.message = "";
    });
    builder.addCase(triggerGetCategories.fulfilled, (state, action) => {
      state.categories.loading = false;
      state.categories.data = action.payload?.results!;
      state.categories.error = false;
      state.categories.message = action.payload?.message as unknown as string;
      state.categories.statusCode = action.payload
        ?.status_code as unknown as number;
    });
    builder.addCase(triggerGetCategories.rejected, (state, action) => {
      state.categories.loading = false;
      state.categories.error = true;
      state.categories.message = action.payload?.message as unknown as string;
      state.categories.statusCode = action.payload?.status_code ?? null;
    });

    //CREATE CATEGORIES
    builder.addCase(triggerCreateCategories.pending, (state) => {
      state.createCategories.loading = true;
      state.createCategories.error = false;
      state.createCategories.data = {};
      state.createCategories.message = "";
    });
    builder.addCase(triggerCreateCategories.fulfilled, (state, action) => {
      state.createCategories.loading = false;
      state.createCategories.data = action.payload?.results!;
      state.createCategories.error = false;
      state.createCategories.message = action.payload
        ?.message as unknown as string;
      state.createCategories.statusCode = action.payload
        ?.status_code as unknown as number;
    });
    builder.addCase(triggerCreateCategories.rejected, (state, action) => {
      state.createCategories.loading = false;
      state.createCategories.error = true;
      state.createCategories.message = action.payload
        ?.message as unknown as string;
      state.createCategories.statusCode = action.payload?.status_code ?? null;
      state.createCategories.data = action.payload?.results || {};
      console.log("error in state", state.createCategories.data);
    });

    //CREATE INDICATORS
    builder.addCase(triggerCreateIndicators.pending, (state) => {
      state.createIndicators.loading = true;
      state.createIndicators.error = false;
      state.createIndicators.data = {};
      state.createIndicators.message = "";
    });
    builder.addCase(triggerCreateIndicators.fulfilled, (state, action) => {
      state.createIndicators.loading = false;
      state.createIndicators.data = action.payload?.results!;
      state.createIndicators.error = false;
      state.createIndicators.message = action.payload
        ?.message as unknown as string;
      state.createIndicators.statusCode = action.payload
        ?.status_code as unknown as number;
      console.log("INDICAATORS CREATED IN STATE", state.createIndicators.data);
    });
    builder.addCase(triggerCreateIndicators.rejected, (state, action) => {
      state.createIndicators.loading = false;
      state.createIndicators.error = true;
      state.createIndicators.message = action.payload
        ?.message as unknown as string;
      state.createIndicators.statusCode = action.payload?.status_code ?? null;
    });

    //Create indicator
    builder.addCase(triggerGetACategory.pending, (state) => {
      state.category.loading = true;
      state.category.error = false;
      state.category.data = {};
      state.category.message = "";
    });
    builder.addCase(triggerGetACategory.fulfilled, (state, action) => {
      state.category.loading = false;
      state.category.data = action.payload?.results!;
      state.category.error = false;
      state.category.message = action.payload
        ?.message as unknown as string;
      state.category.statusCode = action.payload
        ?.status_code as unknown as number;
      console.log("CATEGORY IN STATE", state.category.data);
    });
    builder.addCase(triggerGetACategory.rejected, (state, action) => {
      state.category.loading = false;
      state.category.error = true;
      state.category.message = action.payload
        ?.message as unknown as string;
      state.category.statusCode = action.payload?.status_code ?? null;
    });
  },
});

export const {
  resetSurveyQuestionsState,
  resetCreateCategoriesState,
  resetCategoriesState,
  resetCreateIndicatorsState,
} = healthInstitutionSurveySlice.actions;

export default healthInstitutionSurveySlice.reducer;

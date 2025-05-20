import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  CreateCategories,
  CreateIndicators,
  CreateQuestions,
  GetCategoryByID,
  GetHISMetrics,
  GetSurveyCategories_Indicators_Tasks,
  GetSurveyQuesitions,
  HealthInstitutionResponse,
  QuestionPayload,
} from './healthInstitutionSurveyService'

interface ErroResponseData {
  message: string
  status_code?: number
  results?: Record<string, string[]>
  errors?: any
}

type SurveyQuestionParams = {
  indicatorId: string
  data?: Record<string, string>
}

export const triggerGetSurveyQuesitions = createAsyncThunk<
  any,
  Record<string, string>,
  { rejectValue: ErroResponseData }
>(
  'healthInstitutionSurveyManagementy/survey_questions',
  async (params, thunkAPI) => {
    try {
      return await GetSurveyQuesitions.survey_questions(params)
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? 'Something went wrong',
        status_code: e.status_code,
        results: e.results,
      })
    }
  }
)

export const triggerGetCategories = createAsyncThunk<
  any,
  Record<string, string>,
  { rejectValue: ErroResponseData }
>(
  'healthInstitutionSurveyManagementy/survey_categories',
  async (params, thunkAPI) => {
    try {
      return await GetSurveyCategories_Indicators_Tasks.survey_categories(
        params
      )
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? 'Something went wrong',
        status_code: e.status_code,
        results: e.results,
      })
    }
  }
)

export const triggerCreateCategories = createAsyncThunk<
  any,
  Record<string, string>,
  { rejectValue: ErroResponseData }
>(
  'healthInstitutionSurveyManagementy/create_categories',
  async (params, thunkAPI) => {
    try {
      return await CreateCategories.create_categories(params)
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? 'Something went wrong',
        status_code: e.status_code,
        results: e.results,
      })
    }
  }
)

export const triggerCreateIndicators = createAsyncThunk<
  any,
  Record<string, string>,
  { rejectValue: ErroResponseData }
>(
  'healthInstitutionSurveyManagementy/create_indicators',
  async (params, thunkAPI) => {
    try {
      return await CreateIndicators.create_indicators(params)
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? 'Something went wrong',
        status_code: e.status_code,
        results: e.results,
        errors: e.errors,
      })
    }
  }
)

export const triggerGetACategory = createAsyncThunk<
  any,
  string,
  { rejectValue: ErroResponseData }
>(
  'healthInstitutionSurveyManagementy/get_a_category',
  async (params, thunkAPI) => {
    try {
      return await GetCategoryByID.get_a_category(params)
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? 'Something went wrong',
        status_code: e.status_code,
        results: e.results,
      })
    }
  }
)

export const triggerEditCategory = createAsyncThunk<
  any,
  { id: string; data: Record<string, string> },
  { rejectValue: ErroResponseData }
>(
  'healthInstitutionSurveyManagementy/edit_a_category',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await GetCategoryByID.edit_a_category(id, data)
      return response
    } catch (error: any) {
      return rejectWithValue({
        message: error.message || 'Failed to edit category.',
        status_code: error.status_code,
        results: error.results,
      })
    }
  }
)

export const triggerDeleteCategory = createAsyncThunk<
  any,
  string,
  { rejectValue: ErroResponseData }
>(
  'healthInstitutionSurveyManagementy/delete_a_category',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await GetCategoryByID.delete_a_category(id)
      return response
    } catch (error: any) {
      return rejectWithValue({
        message: error.message,
        status_code: error.status_code,
        results: error.results,
      })
    }
  }
)

export const triggerCreateQuestions = createAsyncThunk<
  any,
  { indicator_id: string; data: QuestionPayload },
  { rejectValue: ErroResponseData }
>(
  'healthInstitutionSurveyManagementy/create_questions',
  async ({ indicator_id, data }, thunkAPI) => {
    try {
      return await CreateQuestions.create_questions(indicator_id, data)
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? 'Something went wrong',
        status_code: e.status_code,
        results: e.results,
      })
    }
  }
)

export const triggerGetHISMetrics = createAsyncThunk<
  any,
  Record<string, string>,
  { rejectValue: ErroResponseData }
>(
  'healthInstitutionSurveyManagementy/his_metrics',
  async (params, thunkAPI) => {
    try {
      return await GetHISMetrics.his_metrics(params)
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? 'Something went wrong',
        status_code: e.status_code,
        results: e.results,
      })
    }
  }
)

export const triggerGetSurveyQuestions = createAsyncThunk<
  any,
  SurveyQuestionParams,
  { rejectValue: ErroResponseData }
>(
  'healthInstitutionSurveyManagementy/questions',
  async ({ indicatorId, data = {} }, thunkAPI) => {
    try {
      return await HealthInstitutionResponse.questions(indicatorId, data)
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? 'Something went wrong',
        status_code: e.status_code,
        results: e.results,
      })
    }
  }
)

export const triggerGetSurveyResponses = createAsyncThunk<
  any,
  {
    institution_id: string
    indicator_id: string
    question_id: string
    data: Record<string, string>
  },
  { rejectValue: ErroResponseData }
>('healthInstitutionSurveyManagementy/responses', async (params, thunkAPI) => {
  const { institution_id, indicator_id, question_id, data } = params

  try {
    return await HealthInstitutionResponse.responses(
      institution_id,
      indicator_id,
      question_id,
      data
    )
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      message: error.message ?? 'Something went wrong',
      status_code: error.status_code,
      results: error.results,
    })
  }
})

export const triggerGetResponseAnalytics = createAsyncThunk<
  any,
  {
    institution_id: string
    indicator_id: string
    data: Record<string, string>
  },
  { rejectValue: ErroResponseData }
>(
  'healthInstitutionSurveyManagementy/response_analytics',
  async (params, thunkAPI) => {
    const { institution_id, indicator_id, data } = params

    try {
      return await HealthInstitutionResponse.response_analytics(
        institution_id,
        indicator_id,
        data
      )
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.message ?? 'Something went wrong',
        status_code: error.status_code,
        results: error.results,
      })
    }
  }
)

export const triggerAdditonalComments = createAsyncThunk<
  any,
  {
    institution_id: string
    indicator_id: string
    data: Record<string, string>
  },
  { rejectValue: ErroResponseData }
>(
  'healthInstitutionSurveyManagementy/additional_comments',
  async (params, thunkAPI) => {
    const { institution_id, indicator_id, data } = params

    try {
      return await HealthInstitutionResponse.additional_comments(
        institution_id,
        indicator_id,
        data
      )
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.message ?? 'Something went wrong',
        status_code: error.status_code,
        results: error.results,
      })
    }
  }
)

export const triggerGetIndicators = createAsyncThunk<
  any,
  Record<string, string>,
  { rejectValue: ErroResponseData }
>(
  'healthInstitutionSurveyManagementy/survey_indicators',
  async (params, thunkAPI) => {
    try {
      return await GetSurveyCategories_Indicators_Tasks.survey_indicators(
        params
      )
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? 'Something went wrong',
        status_code: e.status_code,
        results: e.results,
      })
    }
  }
)

export const triggerGetQuestions = createAsyncThunk<
  any,
  Record<string, string>,
  { rejectValue: ErroResponseData }
>(
  'healthInstitutionSurveyManagement/get_questions',
  async (params, thunkAPI) => {
    try {
      const { indicator_id } = params
      return await CreateQuestions.get_questions(indicator_id)
    } catch (e: any) {
      return thunkAPI.rejectWithValue({
        message: e.message ?? 'Something went wrong',
        status_code: e.status_code,
        results: e.results,
      })
    }
  }
)

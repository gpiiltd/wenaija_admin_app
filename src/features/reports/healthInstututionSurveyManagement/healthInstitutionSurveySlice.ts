import { createSlice } from '@reduxjs/toolkit'
import {
  triggerCreateCategories,
  triggerCreateIndicators,
  triggerCreateQuestions,
  triggerDeleteCategory,
  triggerEditCategory,
  triggerGetACategory,
  triggerGetCategories,
  triggerGetHISMetrics,
  triggerGetQuestions,
  triggerGetResponseAnalytics,
  triggerGetSurveyQuesitions,
  triggerGetSurveyQuestions,
  triggerGetSurveyResponses,
} from './healthInstitutionSurveyThunk'

interface IinitialState {
  error: boolean
  loading: boolean
  resData: Record<string, any>
  message: string
  statusCode?: number | null

  questions: {
    data: Record<string, string>[] | any
    loading: boolean
    error: boolean
    message: string | undefined
    statusCode?: number | null
  }

  surveyCategories: {
    data: Record<string, string>[] | any
    loading: boolean
    error: boolean
    message: string | undefined
    statusCode?: number | null
  }
  createCategories: {
    data: Record<string, string>[] | any
    loading: boolean
    error: boolean
    message: string | undefined
    statusCode?: number | null
  }

  createIndicators: {
    data: Record<string, string>[] | any
    loading: boolean
    error: boolean
    message: string | undefined
    statusCode?: number | null
  }
  category: {
    data: Record<string, string>[] | any
    loading: boolean
    error: boolean
    message: string | undefined
    statusCode?: number | null
  }
  createQuestions: {
    data: Record<string, string>[] | any
    loading: boolean
    error: boolean
    message: string | undefined
    statusCode?: number | null
  }
  surveyResponses: {
    data: Record<string, string>[] | any
    loading: boolean
    error: boolean
    message: string | undefined
    statusCode?: number | null
  }
  responseAnalytics: {
    data: Record<string, string>[] | any
    loading: boolean
    error: boolean
    message: string | undefined
    statusCode?: number | null
  }
  editCategory: {
    data: Record<string, string>[] | any
    loading: boolean
    error: boolean
    message: string | undefined
    statusCode?: number | null
  }
  deleteCategory: {
    data: Record<string, string>[] | any
    loading: boolean
    error: boolean
    message: string | undefined
    statusCode?: number | null
  }
}

const initialState: IinitialState = {
  error: false,
  loading: false,
  resData: {},
  message: '',
  statusCode: null,
  questions: {
    data: [],
    loading: false,
    error: false,
    message: '',
    statusCode: null,
  },
  surveyCategories: {
    data: [],
    loading: false,
    error: false,
    message: '',
    statusCode: null,
  },
  createCategories: {
    data: [],
    loading: false,
    error: false,
    message: '',
    statusCode: null,
  },
  createIndicators: {
    data: [],
    loading: false,
    error: false,
    message: '',
    statusCode: null,
  },
  category: {
    data: [],
    loading: false,
    error: false,
    message: '',
    statusCode: null,
  },
  createQuestions: {
    data: [],
    loading: false,
    error: false,
    message: '',
    statusCode: null,
  },
  surveyResponses: {
    data: [],
    loading: false,
    error: false,
    message: '',
    statusCode: null,
  },
  responseAnalytics: {
    data: [],
    loading: false,
    error: false,
    message: '',
    statusCode: null,
  },
  editCategory: {
    data: {},
    loading: false,
    error: false,
    message: '',
    statusCode: null,
  },
  deleteCategory: {
    data: {},
    loading: false,
    error: false,
    message: '',
    statusCode: null,
  },
}

const healthInstitutionSurveySlice = createSlice({
  name: 'healthInstitutionSurveyManagement',
  initialState,
  reducers: {
    resetSurveyQuestionsState: state => {
      state.questions.error = initialState.questions.error
      state.questions.message = initialState.questions.message
      state.questions.statusCode = initialState.questions.statusCode
    },
    resetCategoriesState: state => {
      state.surveyCategories.error = initialState.surveyCategories.error
      state.surveyCategories.message = initialState.surveyCategories.message
      state.surveyCategories.statusCode =
        initialState.surveyCategories.statusCode
    },
    resetCreateCategoriesState: state => {
      state.createCategories.error = initialState.createCategories.error
      state.createCategories.message = initialState.createCategories.message
      state.createCategories.statusCode =
        initialState.createCategories.statusCode
    },
    resetCreateIndicatorsState: state => {
      state.createIndicators.error = initialState.createIndicators.error
      state.createIndicators.message = initialState.createIndicators.message
      state.createIndicators.statusCode =
        initialState.createIndicators.statusCode
    },
    resetGetACategoryState: state => {
      state.category.error = initialState.category.error
      state.category.message = initialState.category.message
      state.category.statusCode = initialState.category.statusCode
    },
    resetCreateQuestionsState: state => {
      state.createQuestions.error = initialState.createQuestions.error
      state.createQuestions.message = initialState.createQuestions.message
      state.createQuestions.statusCode = initialState.createQuestions.statusCode
    },
    resetResponseAnalyticsState: state => {
      state.responseAnalytics.error = initialState.responseAnalytics.error
      state.responseAnalytics.message = initialState.responseAnalytics.message
      state.responseAnalytics.statusCode =
        initialState.responseAnalytics.statusCode
      state.responseAnalytics.data = initialState.responseAnalytics.data
    },
    resetState: state => {
      state.error = initialState.error
      state.message = initialState.message
      state.statusCode = initialState.statusCode
    },
    resetEditCategory: state => {
      state.editCategory.error = initialState.editCategory.error
      state.editCategory.message = initialState.editCategory.message
      state.editCategory.statusCode = initialState.editCategory.statusCode
    },
    resetDeleteCategory: state => {
      state.deleteCategory.error = initialState.deleteCategory.error
      state.deleteCategory.message = initialState.deleteCategory.message
      state.deleteCategory.statusCode = initialState.deleteCategory.statusCode
    },
  },
  extraReducers: builder => {
    //LIST LIST SURVEY QUESTIONS
    builder.addCase(triggerGetSurveyQuesitions.pending, state => {
      state.questions.loading = true
      state.questions.error = false
      state.questions.data = {}
      state.questions.message = ''
    })
    builder.addCase(triggerGetSurveyQuesitions.fulfilled, (state, action) => {
      state.questions.loading = false
      state.questions.data = action.payload?.results!
      state.questions.error = false
      state.questions.message = action.payload?.message as unknown as string
      state.questions.statusCode = action.payload
        ?.status_code as unknown as number
    })
    builder.addCase(triggerGetSurveyQuesitions.rejected, (state, action) => {
      state.questions.loading = false
      state.questions.error = true
      state.questions.message = action.payload?.message as unknown as string
      state.questions.statusCode = action.payload?.status_code ?? null
    })

    //LIST ALL surveyCategories
    builder.addCase(triggerGetCategories.pending, state => {
      state.surveyCategories.loading = true
      state.surveyCategories.error = false
      state.surveyCategories.data = {}
      state.surveyCategories.message = ''
    })
    builder.addCase(triggerGetCategories.fulfilled, (state, action) => {
      state.surveyCategories.loading = false
      state.surveyCategories.data = action.payload?.results!
      state.surveyCategories.error = false
      state.surveyCategories.message = action.payload
        ?.message as unknown as string
      state.surveyCategories.statusCode = action.payload
        ?.status_code as unknown as number
    })
    builder.addCase(triggerGetCategories.rejected, (state, action) => {
      state.surveyCategories.loading = false
      state.surveyCategories.error = true
      state.surveyCategories.message = action.payload
        ?.message as unknown as string
      state.surveyCategories.statusCode = action.payload?.status_code ?? null
    })

    //CREATE surveyCategories
    builder.addCase(triggerCreateCategories.pending, state => {
      state.createCategories.loading = true
      state.createCategories.error = false
      state.createCategories.data = {}
      state.createCategories.message = ''
    })
    builder.addCase(triggerCreateCategories.fulfilled, (state, action) => {
      state.createCategories.loading = false
      state.createCategories.data = action.payload?.results!
      state.createCategories.error = false
      state.createCategories.message = action.payload
        ?.message as unknown as string
      state.createCategories.statusCode = action.payload
        ?.status_code as unknown as number
    })
    builder.addCase(triggerCreateCategories.rejected, (state, action) => {
      state.createCategories.loading = false
      state.createCategories.error = true
      state.createCategories.message = action.payload
        ?.message as unknown as string
      state.createCategories.statusCode = action.payload?.status_code ?? null
      state.createCategories.data = action.payload?.results || {}
      console.log('error in state', state.createCategories.data)
    })

    //CREATE INDICATORS
    builder.addCase(triggerCreateIndicators.pending, state => {
      state.createIndicators.loading = true
      state.createIndicators.error = false
      state.createIndicators.data = {}
      state.createIndicators.message = ''
    })
    builder.addCase(triggerCreateIndicators.fulfilled, (state, action) => {
      state.createIndicators.loading = false
      state.createIndicators.data = action.payload?.results!
      state.createIndicators.error = false
      state.createIndicators.message = action.payload
        ?.message as unknown as string
      state.createIndicators.statusCode = action.payload
        ?.status_code as unknown as number
      console.log('INDICAATORS CREATED IN STATE', state.createIndicators.data)
    })
    builder.addCase(triggerCreateIndicators.rejected, (state, action) => {
      state.createIndicators.loading = false
      state.createIndicators.error = true
      state.createIndicators.message = action.payload
        ?.message as unknown as string
      state.createIndicators.statusCode = action.payload?.status_code ?? null
    })

    //Create CATEGORY
    builder.addCase(triggerGetACategory.pending, state => {
      state.category.loading = true
      state.category.error = false
      state.category.data = {}
      state.category.message = ''
    })
    builder.addCase(triggerGetACategory.fulfilled, (state, action) => {
      state.category.loading = false
      state.category.data = action.payload?.results!
      state.category.error = false
      state.category.message = action.payload?.message as unknown as string
      state.category.statusCode = action.payload
        ?.status_code as unknown as number
      console.log(
        'CATEGORY IN STATE',
        JSON.stringify(state.category.data, null, 2)
      )
    })
    builder.addCase(triggerGetACategory.rejected, (state, action) => {
      state.category.loading = false
      state.category.error = true
      state.category.message = action.payload?.message as unknown as string
      state.category.statusCode = action.payload?.status_code ?? null
    })

    //CREATE QUESTIONS
    builder.addCase(triggerCreateQuestions.pending, state => {
      state.createQuestions.loading = true
      state.createQuestions.error = false
      state.createQuestions.data = {}
      state.createQuestions.message = ''
    })
    builder.addCase(triggerCreateQuestions.fulfilled, (state, action) => {
      state.createQuestions.loading = false
      state.createQuestions.data = action.payload?.results!
      state.createQuestions.error = false
      state.createQuestions.message = action.payload
        ?.message as unknown as string
      state.createQuestions.statusCode = action.payload
        ?.status_code as unknown as number
      console.log('QUESTIONS CREATED IN STATE', state.createQuestions.data)
    })
    builder.addCase(triggerCreateQuestions.rejected, (state, action) => {
      state.createQuestions.loading = false
      state.createQuestions.error = true
      state.createQuestions.message = action.payload
        ?.message as unknown as string
      state.createQuestions.statusCode = action.payload?.status_code ?? null
    })

    //HIS METRICS
    builder.addCase(triggerGetHISMetrics.pending, state => {
      state.loading = true
      state.error = false
      state.resData = {}
      state.message = ''
    })
    builder.addCase(triggerGetHISMetrics.fulfilled, (state, action) => {
      state.loading = false
      state.resData = action.payload?.results!
      state.error = false
      state.message = action.payload?.message as unknown as string
      state.statusCode = action.payload?.status_code as unknown as number
      console.log('HIS metrics in sate', state.resData)
    })
    builder.addCase(triggerGetHISMetrics.rejected, (state, action) => {
      state.loading = false
      state.error = true
      state.message = action.payload?.message as unknown as string
      state.statusCode = action.payload?.status_code ?? null
    })

    //HIS QUESTIONS
    builder.addCase(triggerGetSurveyQuestions.pending, state => {
      state.loading = true
      state.error = false
      state.resData = {}
      state.message = ''
    })
    builder.addCase(triggerGetSurveyQuestions.fulfilled, (state, action) => {
      state.loading = false
      state.resData = action.payload?.results!
      state.error = false
      state.message = action.payload?.message as unknown as string
      state.statusCode = action.payload?.status_code as unknown as number
      console.log('HIS metrics in sate', state.resData)
    })
    builder.addCase(triggerGetSurveyQuestions.rejected, (state, action) => {
      state.loading = false
      state.error = true
      state.message = action.payload?.message as unknown as string
      state.statusCode = action.payload?.status_code ?? null
    })

    //HIS RESPONSES
    builder.addCase(triggerGetSurveyResponses.pending, state => {
      state.surveyResponses.loading = true
      state.surveyResponses.error = false
      state.surveyResponses.data = {}
      state.surveyResponses.message = ''
    })
    builder.addCase(triggerGetSurveyResponses.fulfilled, (state, action) => {
      state.surveyResponses.loading = false
      state.surveyResponses.data = action.payload?.results!
      state.surveyResponses.error = false
      state.surveyResponses.message = action.payload
        ?.message as unknown as string
      state.surveyResponses.statusCode = action.payload
        ?.status_code as unknown as number
      console.log('HIS metrics in sate', state.surveyResponses.data)
    })
    builder.addCase(triggerGetSurveyResponses.rejected, (state, action) => {
      state.surveyResponses.loading = false
      state.surveyResponses.error = true
      state.surveyResponses.message = action.payload
        ?.message as unknown as string
      state.surveyResponses.statusCode = action.payload?.status_code ?? null
    })

    //RESPONSE ANALYTICS
    builder.addCase(triggerGetResponseAnalytics.pending, state => {
      state.responseAnalytics.loading = true
      state.responseAnalytics.error = false
      state.responseAnalytics.data = {}
      state.responseAnalytics.message = ''
    })
    builder.addCase(triggerGetResponseAnalytics.fulfilled, (state, action) => {
      state.responseAnalytics.loading = false
      state.responseAnalytics.data = action.payload?.results!
      state.responseAnalytics.error = false
      state.responseAnalytics.message = action.payload
        ?.message as unknown as string
      state.responseAnalytics.statusCode = action.payload
        ?.status_code as unknown as number
      console.log('HIS metrics in sate', state.responseAnalytics.data)
    })
    builder.addCase(triggerGetResponseAnalytics.rejected, (state, action) => {
      state.responseAnalytics.loading = false
      state.responseAnalytics.error = true
      state.responseAnalytics.message = action.payload
        ?.message as unknown as string
      state.responseAnalytics.statusCode = action.payload?.status_code ?? null
    })
    //Edit category
    builder.addCase(triggerEditCategory.pending, state => {
      state.editCategory.loading = true
      state.editCategory.error = false
      state.editCategory.data = {}
      state.editCategory.message = ''
    })
    builder.addCase(triggerEditCategory.fulfilled, (state, action) => {
      state.editCategory.loading = false
      state.editCategory.data = action.payload?.results!
      state.editCategory.error = false
      state.editCategory.message = action.payload?.message as unknown as string
      state.editCategory.statusCode = action.payload
        ?.status_code as unknown as number
    })
    builder.addCase(triggerEditCategory.rejected, (state, action) => {
      state.editCategory.loading = false
      state.editCategory.error = true
      state.editCategory.message = action.payload?.message as unknown as string
      state.editCategory.statusCode = action.payload?.status_code ?? null
    })
    //Delete category
    builder.addCase(triggerDeleteCategory.pending, state => {
      state.deleteCategory.loading = true
      state.deleteCategory.error = false
      state.deleteCategory.data = {}
      state.deleteCategory.message = ''
    })
    builder.addCase(triggerDeleteCategory.fulfilled, (state, action) => {
      state.deleteCategory.loading = false
      state.deleteCategory.data = action.payload?.results!
      state.deleteCategory.error = false
      state.deleteCategory.message = action.payload
        ?.message as unknown as string
      state.deleteCategory.statusCode = action.payload
        ?.status_code as unknown as number
    })
    builder.addCase(triggerDeleteCategory.rejected, (state, action) => {
      state.deleteCategory.loading = false
      state.deleteCategory.error = true
      state.deleteCategory.message = action.payload
        ?.message as unknown as string
      state.deleteCategory.statusCode = action.payload?.status_code ?? null
    })

    //HIS METRICS
    builder.addCase(triggerGetQuestions.pending, state => {
      state.loading = true
      state.error = false
      state.resData = {}
      state.message = ''
    })
    builder.addCase(triggerGetQuestions.fulfilled, (state, action) => {
      state.loading = false
      state.resData = action.payload
      state.error = false
      state.message = action.payload?.message as unknown as string
      state.statusCode = action.payload?.status_code as unknown as number
      console.log('HIS metrics in sate', state.resData)
    })
    builder.addCase(triggerGetQuestions.rejected, (state, action) => {
      state.loading = false
      state.error = true
      state.message = action.payload?.message as unknown as string
      state.statusCode = action.payload?.status_code ?? null
    })
  },
})

export const {
  resetSurveyQuestionsState,
  resetCreateCategoriesState,
  resetCategoriesState,
  resetCreateIndicatorsState,
  resetCreateQuestionsState,
  resetResponseAnalyticsState,
  resetState,
  resetGetACategoryState,
  resetEditCategory,
  resetDeleteCategory,
} = healthInstitutionSurveySlice.actions

export default healthInstitutionSurveySlice.reducer

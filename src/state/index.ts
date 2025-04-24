import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import institutionManagementReducer from '../features/institutions/institutionManagementSlice'
import rbacReducer from '../features/rbac/rbacSlice'
import communityTaskManagementReducer from '../features/reports/communityTaskManagement/communityTaskSlice'
import healthInstitutionSurveyManagementReducer from '../features/reports/healthInstututionSurveyManagement/healthInstitutionSurveySlice'
import userManagementReducer from '../features/usersManagement/userManagementSlice'
import { setDispatchFunction } from './store'

const store = configureStore({
  reducer: {
    auth: authReducer,
    rbac: rbacReducer,
    userManagement: userManagementReducer,
    institutionManagement: institutionManagementReducer,
    healthInstitutionSurveyManagement: healthInstitutionSurveyManagementReducer,
    communityTaskManagement: communityTaskManagementReducer,
  },
})

// Set the dispatch function in the store instance
setDispatchFunction(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

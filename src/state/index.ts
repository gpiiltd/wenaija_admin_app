import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import rbacReducer from '../features/rbac/rbacSlice'
import userManagementReducer from '../features/usersManagement/userManagementSlice'
import { setDispatchFunction } from './store'

const store = configureStore({
  reducer: {
    auth: authReducer,
    rbac: rbacReducer,
    userManagement: userManagementReducer,
  },
})

// Set the dispatch function in the store instance
setDispatchFunction(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

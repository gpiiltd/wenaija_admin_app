import { configureStore } from '@reduxjs/toolkit';
import { setDispatchFunction } from './store';
import authReducer from '../features/auth/authSlice';


const store = configureStore({
  reducer: { auth: authReducer },
  // middleware: [thunkMiddleware],
});

// Set the dispatch function in the store instance
setDispatchFunction(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


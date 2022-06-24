import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import { errorReducer } from './errorSlice';
import { errorMiddleware, signOutMiddleware } from './middlewares';
import { userReducer } from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    error: errorReducer,
  },
  enhancers: [applyMiddleware(errorMiddleware, signOutMiddleware)],
});

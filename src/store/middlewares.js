import { BlogApiExceptionCode } from '../api/api-exception';
import { showError } from './errorSlice';
import { signOut } from './userSlice';

export const errorMiddleware = (api) => (next) => (action) => {
  if (action.error) {
    const error = action.error.code ?? action.error.message ?? action.error;
    api.dispatch(showError({ error }));
  }
  next(action);
};

export const signOutMiddleware = (api) => (next) => (action) => {
  const singOutOnUnauthorized = () => {
    if (action.error?.code !== BlogApiExceptionCode.UNAUTHORIZED) return;
    api.dispatch(signOut());
  };
  singOutOnUnauthorized();
  next(action);
};

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BlogApi } from '../api/api';
const sliceName = 'user';
const authTokenKey = 'authToken';

export const signUp = createAsyncThunk(`${sliceName}/signUp`, (data) => BlogApi.default.signUp(data));
export const signIn = createAsyncThunk(`${sliceName}/signIn`, async (data, api) => {
  const result = await BlogApi.default.signIn(data);
  api.dispatch(fetchProfile());
  return result;
});
export const fetchProfile = createAsyncThunk(`${sliceName}/fetchProfile`, () => BlogApi.default.fetchProfile());
export const editProfile = createAsyncThunk(`${sliceName}/editProfile`, (data) => BlogApi.default.editProfile(data));

const userSlice = createSlice({
  name: sliceName,
  initialState: {
    profile: null,
    authToken: JSON.parse(localStorage.getItem(authTokenKey)),
  },
  reducers: {
    signOut: () => {
      localStorage.removeItem(authTokenKey);
      return { authToken: null, profile: null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (_, { payload: { user } }) => {
        localStorage.setItem(authTokenKey, JSON.stringify(user.token));
        return { authToken: user.token, profile: user };
      })
      .addCase(signIn.fulfilled, (_, { payload: { user } }) => {
        localStorage.setItem(authTokenKey, JSON.stringify(user.token));
        return { authToken: user.token, profile: null };
      })
      .addCase(fetchProfile.fulfilled, (_, { payload: { user } }) => {
        if (!user) {
          localStorage.removeItem(authTokenKey);
          return { authToken: null, profile: null };
        }
        localStorage.setItem(authTokenKey, JSON.stringify(user.token));
        return { authToken: user.token, profile: user };
      })
      .addCase(editProfile.fulfilled, (_, { payload: { user } }) => {
        localStorage.setItem(authTokenKey, JSON.stringify(user.token));
        return { authToken: user.token, profile: user };
      });
  },
});

if (userSlice.getInitialState()) {
  const { authToken } = userSlice.getInitialState();
  BlogApi.default.setToken(authToken);
}

export const { reducer: userReducer } = userSlice;
export const { signOut } = userSlice.actions;
export const profileSelector = (state) => state[sliceName].profile;
export const authTokenSelector = (state) => state[sliceName].authToken;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAutenticated: false,
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authenticateUser: (state, action) => {
      state.isAutenticated = action.payload.isAutenticated;
    },
  },
});

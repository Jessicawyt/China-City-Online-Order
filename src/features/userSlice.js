import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token'))
    : null,
  isAuthenticated: localStorage.getItem('isAuthenticated')
    ? JSON.parse(localStorage.getItem('isAuthenticated'))
    : false,
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  remember: localStorage.getItem('remember')
    ? JSON.parse(localStorage.getItem('remember'))
    : false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.remember = action.payload.remember;
      if (action.payload.remember) {
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', JSON.stringify(action.payload.token));
        localStorage.setItem(
          'isAuthenticated',
          JSON.stringify(action.payload.isAuthenticated)
        );
        localStorage.setItem(
          'remember',
          JSON.stringify(action.payload.remember)
        );
      }
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.remember = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('remember');
    },
  },
});

export const { login, setLogout } = userSlice.actions;
export default userSlice.reducer;

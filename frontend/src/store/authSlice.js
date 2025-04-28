import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: !!localStorage.getItem('accessToken'), // Check if token exists
  user: {
    role: localStorage.getItem('role') || null,
    email: localStorage.getItem('email') || null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.status = true;
      state.user = action.payload.data.user;
    },
    logout(state) {
      state.status = false;
      state.user = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
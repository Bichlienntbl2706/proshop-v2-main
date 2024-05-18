import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      // NOTE: here we need to also remove the cart from storage so the next
      // logged in user doesn't inherit the previous users cart and shipping
      localStorage.clear();
    },
  },
});
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setCredentials: (state, action) => {
//       state.userInfo = action.payload;
//       localStorage.setItem('userInfo', JSON.stringify(action.payload));
//       localStorage.setItem('token', action.payload.token); // Lưu trữ token vào localStorage
//     },
//     logout: (state, action) => {
//       state.userInfo = null;
//       localStorage.removeItem('userInfo');
//       localStorage.removeItem('token'); // Xóa token khỏi localStorage khi đăng xuất
//     },
//   },
// });

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

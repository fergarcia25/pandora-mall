import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import mallReducer from './slices/mallSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    mall: mallReducer,
    auth: authReducer,
    cart: cartReducer,
  },
  devTools: import.meta.env.DEV,
});

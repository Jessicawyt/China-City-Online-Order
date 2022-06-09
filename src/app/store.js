import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { dishesApi } from '../features/dishesApi';
import cartReducer from '../features/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [dishesApi.reducerPath]: dishesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dishesApi.middleware),
});

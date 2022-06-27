import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { dishesApi } from '../features/dishesApi';
import { categoriesApi } from '../features/categoriesApi';
import cartReducer from '../features/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [dishesApi.reducerPath]: dishesApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      dishesApi.middleware,
      categoriesApi.middleware
    ),
});

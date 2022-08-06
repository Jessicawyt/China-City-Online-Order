import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { dishesApi } from '../features/dishesApi';
import { categoriesApi } from '../features/categoriesApi';
import { userApi } from '../features/userApi';
import { orderApi } from '../features/orderApi';
import cartReducer from '../features/cartSlice';
import userReducer from '../features/userSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    [dishesApi.reducerPath]: dishesApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      dishesApi.middleware,
      categoriesApi.middleware,
      userApi.middleware,
      orderApi.middleware
    ),
});

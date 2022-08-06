import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3555/chinacity' }),
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => '/order',
    }),
    createOrder: builder.mutation({
      query: (order) => ({
        url: '/order',
        method: 'POST',
        body: order,
      }),
    }),
  }),
});

export const { useGetOrdersQuery, useCreateOrderMutation } = orderApi;

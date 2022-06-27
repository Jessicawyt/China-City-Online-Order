import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dishesApi = createApi({
  reducerPath: 'dishesApi',

  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
  tagTypes: ['dishes'],
  endpoints: (builder) => ({
    getDishes: builder.query({
      query: () => '/dishes',
      providesTags: ['dishes'],
    }),
    // getDish: builder.query({
    //   query: (id) => `/dishes/${id}`,
    //   providesTags: ['dishes'],
    // }),
    updateDish: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/dishes/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['dishes'],
    }),
    deleteDish: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/dishes/${id}`,
        method: 'DELETE',
        body: rest,
      }),
      invalidatesTags: ['dishes'],
    }),
  }),
});

export const {
  useGetDishesQuery,
  useGetDishQuery,
  useUpdateDishMutation,
  useDeleteDishMutation,
} = dishesApi;

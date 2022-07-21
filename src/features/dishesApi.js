import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dishesApi = createApi({
  reducerPath: 'dishesApi',

  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3555/chinacity' }),
  tagTypes: ['dishes'],
  endpoints: (builder) => ({
    getDishes: builder.query({
      query: () => '/dishes',
      providesTags: ['dishes'],
    }),
    getDishesByCategory: builder.query({
      query: (categoryId) => `/dishes/${categoryId}`,
      providesTags: ['categories'],
    }),
    // getDish: builder.query({
    //   query: (id) => `/dishes/${id}`,
    //   providesTags: ['dishes'],
    // }),
    // updateDish: builder.mutation({
    //   query: ({ id, ...rest }) => ({
    //     url: `/dishes/${id}`,
    //     method: 'PUT',
    //     body: rest,
    //   }),
    //   invalidatesTags: ['dishes'],
    // }),
    // deleteDish: builder.mutation({
    //   query: ({ id, ...rest }) => ({
    //     url: `/dishes/${id}`,
    //     method: 'DELETE',
    //     body: rest,
    //   }),
    //   invalidatesTags: ['dishes'],
    // }),
  }),
});

export const {
  useGetDishesQuery,
  useGetDishesByCategoryQuery,
  useGetDishQuery,
  useUpdateDishMutation,
  useDeleteDishMutation,
} = dishesApi;

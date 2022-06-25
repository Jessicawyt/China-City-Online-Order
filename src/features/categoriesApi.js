import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',

  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
  tagTypes: ['categories'],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => '/categories',
      providesTags: ['categories'],
    }),
    getCategory: builder.query({
      query: (id) => `/categories/${id}`,
      providesTags: ['categories'],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/categories/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['categories'],
    }),
    deleteCategory: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
        body: rest,
      }),
      invalidatesTags: ['categories'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3555/chinacity' }),
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (userId) => `/user/${userId}`,
    }),
    registerUser: builder.mutation({
      query: ({ ...user }) => ({
        url: '/user/register',
        method: 'POST',
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: ({ ...user }) => ({
        url: '/user/login',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
} = userApi;

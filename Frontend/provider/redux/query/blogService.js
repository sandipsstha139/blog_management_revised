// services/api/userService.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // use '/react'

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  //   tagTypes: ["getAllUser, getUser"],
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => ({
        url: "blog",
        method: "GET",
      }),
      //   providesTags: ["getAllUser"],
    }),
    // getMe: builder.query({
    //   query: () => ({
    //     url: "user/me",
    //     method: "GET",
    //   }),
    // }),
    // loginUser: builder.mutation({
    //   query: (body) => ({
    //     url: "users/login",
    //     method: "POST",
    //     body,
    //   }),
    //   //   invalidatesTags: ["getAllUser"],
    //   //   invalidatesTags: ["getAllUser, getUser"],
    // }),
    // logoutUser: builder.mutation({
    //   query: () => ({
    //     url: "user/logout",
    //     method: "GET",
    //   }),
    //   //   invalidatesTags: ["getAllUser"],
    // }),
  }),
});

export const { useGetAllBlogsQuery } = blogApi;

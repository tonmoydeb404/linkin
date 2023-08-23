import {
  UpdatePassword,
  UpdateUserRole,
  UpdateUsername,
  UserResponse,
  UsersResponse,
} from "@/types/user.type";
import { createApi } from "@reduxjs/toolkit/query/react";
import { linkinBaseQuery } from "../app/settings";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: linkinBaseQuery("users"),
  tagTypes: ["USER"],
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, undefined>({
      query: () => ({
        url: `/`,
      }),
      providesTags: ["USER"],
    }),
    banUser: builder.mutation<UserResponse, string>({
      query: (user_id) => ({
        url: `/ban/${user_id}`,
        method: "PUT",
      }),
      invalidatesTags: ["USER"],
    }),
    unbanUser: builder.mutation<UserResponse, string>({
      query: (user_id) => ({
        url: `/unban/${user_id}`,
        method: "PUT",
      }),
      invalidatesTags: ["USER"],
    }),
    updateUserRole: builder.mutation<UserResponse, UpdateUserRole>({
      query: ({ user_id, role }) => ({
        url: `/change-role/${user_id}`,
        method: "PUT",
        body: {
          role,
        },
      }),
      invalidatesTags: ["USER"],
    }),
    updateUsername: builder.mutation<UserResponse, UpdateUsername>({
      query: ({ password, username }) => ({
        url: `/change-username`,
        method: "PUT",
        body: {
          password,
          username,
        },
      }),
      invalidatesTags: ["USER"],
    }),
    updatePassword: builder.mutation<UserResponse, UpdatePassword>({
      query: ({ new_password, old_password }) => ({
        url: `/change-password`,
        method: "PUT",
        body: {
          new_password,
          old_password,
        },
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useBanUserMutation,
  useUnbanUserMutation,
  useUpdateUserRoleMutation,
  useUpdatePasswordMutation,
  useUpdateUsernameMutation,
} = userApi;

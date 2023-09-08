import {
  CreateUser,
  DeleteUser,
  UpdatePassword,
  UpdateUserRole,
  UpdateUsername,
  UpdateVerifiedStatus,
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
      query: ({ confirmPassword, username, user_id }) => ({
        url: `/${user_id}`,
        method: "PATCH",
        body: {
          confirmPassword,
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
    verifyUser: builder.mutation<UserResponse, UpdateVerifiedStatus>({
      query: ({ verified_status, user_id }) => ({
        url: `/verify/${user_id}`,
        method: "PUT",
        body: {
          verified_status,
        },
      }),
      invalidatesTags: ["USER"],
    }),
    deleteUser: builder.mutation<UserResponse, DeleteUser>({
      query: ({ confirmPassword, user_id }) => ({
        url: `/${user_id}`,
        method: "DELETE",
        body: {
          confirmPassword,
        },
      }),
      invalidatesTags: ["USER"],
    }),
    createUser: builder.mutation<UserResponse, CreateUser>({
      query: ({ email, password, username, role, verifiedStatus }) => ({
        url: `/`,
        method: "POST",
        body: {
          email,
          password,
          username,
          role,
          verifiedStatus,
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
  useVerifyUserMutation,
  useDeleteUserMutation,
  useCreateUserMutation,
} = userApi;

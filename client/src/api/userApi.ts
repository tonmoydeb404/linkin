import { UpdateUserRole, UserResponse, UsersResponse } from "@/types/user.type";
import { createApi } from "@reduxjs/toolkit/query/react";
import { linkinBaseQuery } from "../app/settings";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: linkinBaseQuery("users"),
  tagTypes: ["PROFILE"],
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, undefined>({
      query: () => ({
        url: `/`,
      }),
      providesTags: ["PROFILE"],
    }),
    banUser: builder.mutation<UserResponse, string>({
      query: (user_id) => ({
        url: `/ban/${user_id}`,
        method: "PUT",
      }),
      invalidatesTags: ["PROFILE"],
    }),
    unbanUser: builder.mutation<UserResponse, string>({
      query: (user_id) => ({
        url: `/unban/${user_id}`,
        method: "PUT",
      }),
      invalidatesTags: ["PROFILE"],
    }),
    updateUserRole: builder.mutation<UserResponse, UpdateUserRole>({
      query: ({ user_id, role }) => ({
        url: `/change-role/${user_id}`,
        method: "PUT",
        body: {
          role,
        },
      }),
      invalidatesTags: ["PROFILE"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useBanUserMutation,
  useUnbanUserMutation,
  useUpdateUserRoleMutation,
} = userApi;

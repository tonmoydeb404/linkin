import { createApi } from "@reduxjs/toolkit/query/react";
import { linkinBaseQuery } from "../app/settings";
import {
  ProfileCreate,
  ProfileResponse,
  ProfileUpdate,
} from "../types/profile.type";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: linkinBaseQuery("profile"),
  tagTypes: ["PROFILE"],
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileResponse, string>({
      query: (username) => ({
        url: `/${username}`,
      }),
      providesTags: ["PROFILE"],
    }),
    getOwnProfile: builder.query<ProfileResponse, undefined>({
      query: () => ({
        url: `/`,
      }),
      providesTags: ["PROFILE"],
    }),
    updateOwnProfile: builder.mutation<ProfileResponse, ProfileUpdate>({
      query: ({ ...body }) => ({
        url: `/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["PROFILE"],
    }),
    createProfile: builder.mutation<ProfileResponse, ProfileCreate>({
      query: ({ ...body }) => ({
        url: `/`,
        method: "POST",
        body,
      }),
      // invalidatesTags: ["PROFILE"],
    }),
  }),
});

export const {
  useGetOwnProfileQuery,
  useUpdateOwnProfileMutation,
  useLazyGetProfileQuery,
  useCreateProfileMutation,
} = profileApi;

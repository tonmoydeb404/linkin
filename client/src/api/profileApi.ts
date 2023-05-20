import { createApi } from "@reduxjs/toolkit/query/react";
import { linkinBaseQuery } from "../app/settings";
import { ProfileResponse, ProfileUpdate } from "../types/profile.type";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: linkinBaseQuery("profile"),
  tagTypes: ["PROFILE"],
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileResponse, string>({
      query: (username) => ({
        url: `/u/${username}`,
      }),
      providesTags: ["PROFILE"],
    }),
    getOwnProfile: builder.query<ProfileResponse, undefined>({
      query: () => ({
        url: `/authorized`,
      }),
      providesTags: ["PROFILE"],
    }),
    updateOwnProfile: builder.mutation<ProfileResponse, ProfileUpdate>({
      query: ({ ...body }) => ({
        url: `/authorized`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["PROFILE"],
    }),
  }),
});

export const {
  useGetOwnProfileQuery,
  useUpdateOwnProfileMutation,
  useLazyGetProfileQuery,
} = profileApi;

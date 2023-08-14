import { createApi } from "@reduxjs/toolkit/query/react";
import { linkinBaseQuery } from "../app/settings";
import { LinkinApiResponse } from "../types/linkinApi.type";
import {
  SocialCollectionResponse,
  SocialCreate,
  SocialResponse,
  SocialUpdate,
} from "../types/social.type";

export const socialApi = createApi({
  reducerPath: "socialApi",
  baseQuery: linkinBaseQuery("socials"),
  tagTypes: ["SOCIALS"],
  endpoints: (builder) => ({
    getSocials: builder.query<SocialCollectionResponse, any>({
      query: () => ({
        url: "/",
      }),
      providesTags: ["SOCIALS"],
    }),
    getSocial: builder.query<SocialResponse, string>({
      query: (slug) => ({
        url: `/s/${slug}`,
      }),
    }),
    createSocial: builder.mutation<SocialResponse, SocialCreate>({
      query: ({ ...body }) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["SOCIALS"],
    }),
    updateSocial: builder.mutation<
      SocialResponse,
      { id: string; body: SocialUpdate }
    >({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["SOCIALS"],
    }),
    deleteSocial: builder.mutation<LinkinApiResponse<string>, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SOCIALS"],
    }),
    getAllSocials: builder.query<SocialCollectionResponse, any>({
      query: () => ({
        url: "/get-all",
      }),
      providesTags: ["SOCIALS"],
    }),
    banSocial: builder.mutation<SocialResponse, string>({
      query: (id) => ({
        url: `/ban/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["SOCIALS"],
    }),
    unbanSocial: builder.mutation<SocialResponse, string>({
      query: (id) => ({
        url: `/unban/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["SOCIALS"],
    }),
  }),
});

export const {
  useCreateSocialMutation,
  useDeleteSocialMutation,
  useUpdateSocialMutation,
  useGetAllSocialsQuery,
  useLazyGetSocialQuery,
  useGetSocialsQuery,
  useBanSocialMutation,
  useUnbanSocialMutation,
} = socialApi;

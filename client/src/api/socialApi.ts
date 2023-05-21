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
  baseQuery: linkinBaseQuery("social"),
  tagTypes: ["SOCIALS"],
  endpoints: (builder) => ({
    getAllSocials: builder.query<SocialCollectionResponse, any>({
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
  }),
});

export const {
  useCreateSocialMutation,
  useDeleteSocialMutation,
  useUpdateSocialMutation,
  useGetAllSocialsQuery,
  useLazyGetSocialQuery,
} = socialApi;

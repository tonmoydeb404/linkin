import { createApi } from "@reduxjs/toolkit/query/react";
import { linkinBaseQuery } from "../app/settings";
import {
  LinkCollectionResponse,
  LinkCreate,
  LinkResponse,
  LinkUpdate,
} from "../types/link.type";
import { LinkinApiResponse } from "../types/linkinApi.type";

export const linkApi = createApi({
  reducerPath: "linkApi",
  baseQuery: linkinBaseQuery("links"),
  tagTypes: ["LINKS"],
  endpoints: (builder) => ({
    userLinks: builder.query<LinkCollectionResponse, any>({
      query: () => ({
        url: "/",
      }),
      providesTags: ["LINKS"],
    }),
    getLink: builder.query<LinkResponse, string>({
      query: (slug) => ({
        url: `/s/${slug}`,
      }),
    }),
    createLink: builder.mutation<LinkResponse, LinkCreate>({
      query: ({ ...body }) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["LINKS"],
    }),
    updateLink: builder.mutation<
      LinkResponse,
      { id: string; body: LinkUpdate }
    >({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["LINKS"],
    }),
    deleteLink: builder.mutation<LinkinApiResponse<string>, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LINKS"],
    }),
    getAllLinks: builder.query<LinkCollectionResponse, any>({
      query: () => ({
        url: "/get-all",
      }),
      providesTags: ["LINKS"],
    }),
    banLink: builder.mutation<LinkResponse, string>({
      query: (id) => ({
        url: `/ban/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["LINKS"],
    }),
    unbanLink: builder.mutation<LinkResponse, string>({
      query: (id) => ({
        url: `/unban/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["LINKS"],
    }),
  }),
});

export const {
  useUserLinksQuery,
  useGetLinkQuery,
  useLazyGetLinkQuery,
  useCreateLinkMutation,
  useDeleteLinkMutation,
  useUpdateLinkMutation,
  useGetAllLinksQuery,
  useBanLinkMutation,
  useUnbanLinkMutation,
} = linkApi;

import { createApi } from "@reduxjs/toolkit/query/react";
import { linkinBaseQuery } from "../app/settings";

export const linksApi = createApi({
  reducerPath: "linksApi",
  baseQuery: linkinBaseQuery("links"),
  endpoints: (builder) => ({
    userLinks: builder.query({
      query: () => ({
        url: "/",
      }),
    }),
    createLink: builder.mutation({
      query: ({ ...body }) => ({
        url: "/",
        method: "POST",
        body,
      }),
    }),
    updateLink: builder.mutation({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteLink: builder.mutation({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useUserLinksQuery } = linksApi;

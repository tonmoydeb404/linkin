import { LayoutResponse, LayoutUpdate } from "@/types/layout.type";
import { createApi } from "@reduxjs/toolkit/query/react";
import { linkinBaseQuery } from "../app/settings";

export const layoutApi = createApi({
  reducerPath: "layoutApi",
  baseQuery: linkinBaseQuery("layout"),
  tagTypes: ["LAYOUT"],
  endpoints: (builder) => ({
    getLayout: builder.query<LayoutResponse, void>({
      query: () => ({
        url: `/`,
      }),
      providesTags: ["LAYOUT"],
    }),
    updateLayout: builder.mutation<LayoutResponse, LayoutUpdate>({
      query: ({ ...body }) => ({
        url: `/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["LAYOUT"],
    }),
  }),
});

export const { useGetLayoutQuery, useUpdateLayoutMutation } = layoutApi;

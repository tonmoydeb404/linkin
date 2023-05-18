import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/dist/query";
import { LinkinApiError } from "../types/linkinApi.type";
import { ApiError } from "../types/rtkquery.type";

const LINKIN_API = import.meta.env.VITE_APP_LINKIN_API;
export const linkinBaseQuery = (basePath: string) =>
  fetchBaseQuery({
    baseUrl: `${LINKIN_API}/${basePath}`,
    credentials: "include",
  }) as BaseQueryFn<FetchArgs, unknown, ApiError<LinkinApiError>>;

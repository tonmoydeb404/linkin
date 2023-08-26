import { createApi } from "@reduxjs/toolkit/query/react";
import { linkinBaseQuery } from "../app/settings";
import {
  AuthLogin,
  AuthPasswordReset,
  AuthPasswordResetRequest,
  AuthPasswordResetRequestResponse,
  AuthPasswordResetResponse,
  AuthRegister,
  AuthResponse,
  AuthVerifyEmail,
  AuthVerifyEmailRequestResponse,
  AuthVerifyEmailResponse,
} from "../types/auth.type";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: linkinBaseQuery("auth"),
  endpoints: (builder) => ({
    authRegister: builder.mutation<AuthResponse, AuthRegister>({
      query: ({ ...data }) => ({
        url: `/register`,
        method: "POST",
        body: data,
      }),
    }),
    authLogin: builder.mutation<AuthResponse, AuthLogin>({
      query: ({ ...data }) => ({
        url: `/login`,
        method: "POST",
        body: data,
      }),
    }),
    authRefresh: builder.query<AuthResponse, undefined>({
      query: () => ({
        url: `/refresh`,
      }),
    }),
    authLogout: builder.query<AuthResponse, undefined>({
      query: () => ({
        url: `/logout`,
      }),
    }),
    authPasswordReset: builder.mutation<
      AuthPasswordResetResponse,
      AuthPasswordReset
    >({
      query: ({ password, token }) => ({
        url: `/password-reset`,
        method: "PUT",
        body: { password, token },
      }),
    }),
    authPasswordResetRequest: builder.mutation<
      AuthPasswordResetRequestResponse,
      AuthPasswordResetRequest
    >({
      query: ({ email }) => ({
        url: `/password-reset`,
        method: "POST",
        body: { email },
      }),
    }),
    authVerifyEmailRequest: builder.query<AuthVerifyEmailRequestResponse, void>(
      {
        query: () => ({
          url: `/verify-email`,
        }),
      }
    ),
    authVerifyEmail: builder.mutation<AuthVerifyEmailResponse, AuthVerifyEmail>(
      {
        query: ({ token }) => ({
          url: `/verify-email`,
          method: "PUT",
          body: { token },
        }),
      }
    ),
  }),
});

export const {
  useAuthRegisterMutation,
  useAuthLoginMutation,
  useLazyAuthRefreshQuery,
  useLazyAuthLogoutQuery,
  useAuthLogoutQuery,
  useAuthPasswordResetMutation,
  useAuthPasswordResetRequestMutation,
  useLazyAuthVerifyEmailRequestQuery,
  useAuthVerifyEmailMutation,
} = authApi;

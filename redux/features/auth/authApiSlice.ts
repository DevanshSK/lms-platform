import baseQueryWithReauth from "@/redux/services/apiSlice";
import { createApi } from '@reduxjs/toolkit/query/react'
import { ILoginResult, IAuthParams, ISignUpResult } from "../../types";
import FormData from 'form-data';
import { axiosBaseQuery } from "@/redux/services/axiosBaseQuery";

/* The code `export const apiSlice = createApi({ baseQuery: baseQueryWithReauth, endpoints: builder =>
({}) })` is creating an API slice using the `createApi` function from the
`@reduxjs/toolkit/query/react` library. */

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: axiosBaseQuery,
    endpoints: builder => ({
        login: builder.mutation<ILoginResult, FormData>({
            query: (data) => ({
                url: "/sign-in",
                method: "POST",
                data,
            })
        }),
        signup: builder.mutation<ISignUpResult, FormData>({
            query: (data) => ({
                url: "/sign-up",
                method: "POST",
                data,
            })
        }),
    })
})

export const { useLoginMutation, useSignupMutation } = authApi;
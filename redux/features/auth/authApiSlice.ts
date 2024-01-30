import { createApi } from '@reduxjs/toolkit/query/react'
import { ILoginResult, ISignUpResult } from "../../types";
import FormData from 'form-data';
import { axiosBaseQuery } from "@/redux/services/axiosBaseQuery";
import { RegisterInput } from '@/hooks/auth/useRegister';
import { userApi } from '../user/userApiSlice';

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
            }),
        }),
        signup: builder.mutation<ISignUpResult, RegisterInput>({
            query: ({email, name, password, education}) => ({
                url: "/sign-up",
                method: "POST",
                data: {
                    email,
                    name,
                    password,
                    education,
                    role: "student"
                },
            })
        }),
    })
})

export const { useLoginMutation, useSignupMutation } = authApi;
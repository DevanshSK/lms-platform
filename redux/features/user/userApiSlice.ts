import { createApi } from "@reduxjs/toolkit/query/react";
import { setUser } from "./userSlice";
import { IUser } from "@/redux/types";
import { axiosBaseQuery } from "@/redux/services/axiosBaseQuery";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: axiosBaseQuery,
    endpoints: (builder) => ({
        getUser: builder.query<IUser, void>({
            query: () => ({
                url: `/user/me`,
                method: "GET",
                headers: {
                    "ngrok-skip-browser-warning": true
                }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                } catch (error) {
                    console.log("Error fetching current user", error)
                }
            },
        })
    })
})

export const { useGetUserQuery } = userApi;
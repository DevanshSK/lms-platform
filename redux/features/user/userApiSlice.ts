import { createApi } from "@reduxjs/toolkit/query/react";
import { setUser } from "./userSlice";
import { IUser } from "@/redux/types";
import baseQuery from "@/redux/services/apiSlice";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: baseQuery,
    tagTypes: ["User"],
    
    endpoints: (builder) => ({
        getUser: builder.query<IUser, void>({
            query: () => "user/me",
            providesTags: ['User'],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    // console.log(data)
                    dispatch(setUser(data));
                } catch (error) {
                    console.log("Error fetching current user", error)
                }
            },
        })
    })
})

export const { useGetUserQuery } = userApi;
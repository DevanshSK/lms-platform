import { createApi } from "@reduxjs/toolkit/query";
import { setUser } from "./userSlice";
import baseQueryWithReauth from "@/redux/services/apiSlice";
import { IUser } from "@/redux/types";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) =>({
        getCurrentUser: builder.query<IUser, number>({
            query: (id) => ({
                url: `/users/${id}`,
                method: "GET",
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setUser(data));
                } catch (error) {
                    console.log("Error fetching current user", error)
                }    
            },
        })
    })
})
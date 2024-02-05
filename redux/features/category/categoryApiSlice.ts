import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/redux/services/axiosBaseQuery";
import { ICategoryResponse } from "@/redux/types";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ["Categories"],
    endpoints: (builder) => ({
        createCategory: builder.mutation<ICategoryResponse, string>({
            query: (title) => ({
                url: "/category",
                method: "POST",
                data: {
                    cate_name: title
                },
            }),
            invalidatesTags: [{ type: "Categories", id: "LIST" }],
        }),
        getCategories: builder.query<ICategoryResponse[], void>({
            query: () => ({
                url: "/category",
                method: "GET"
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((category) => {
                            const { id } = category;
                            return {
                                type: 'Categories' as const,
                                id,
                            }
                        }),
                        { type: 'Categories', id: 'LIST' },
                    ]
                    : [{ type: 'Categories', id: 'LIST' }],

        }),
    })
})

export const {useCreateCategoryMutation, useGetCategoriesQuery} = categoryApi;
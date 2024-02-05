import { createApi } from "@reduxjs/toolkit/query/react";
import { ICategoryResponse } from "@/redux/types";
import baseQuery from "@/redux/services/apiSlice";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: baseQuery,
    tagTypes: ["Categories"],
    endpoints: (builder) => ({
        createCategory: builder.mutation<ICategoryResponse, string>({
            query: (title) => ({
                url: "/category",
                method: "POST",
                body: {
                    cate_name: title
                },
            }),
            invalidatesTags: [{ type: "Categories", id: "LIST" }],
        }),
        getCategories: builder.query<ICategoryResponse[], void>({
            query: () => "/category",
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
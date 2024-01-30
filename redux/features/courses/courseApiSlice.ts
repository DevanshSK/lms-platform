import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/redux/services/axiosBaseQuery";
import FormData from "form-data";
import { ICourseResponse } from "@/redux/types";

export const courseApi = createApi({
    reducerPath: "courseApi",
    baseQuery: axiosBaseQuery,
    tagTypes: ["Courses"],
    endpoints: (builder) => ({
        createCourse: builder.mutation<ICourseResponse, FormData>({
            query: (course) => ({
                url: "/course",
                method: "POST",
                data: course,
            }),
            invalidatesTags: [{ type: "Courses", id: "LIST"}],
        }),
        getAllPosts: builder.query<ICourseResponse[], void>({
            query: () => ({
                url: "/course",
                method: "GET"
            }),
            providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Courses' as const,
                id,
              })),
              { type: 'Courses', id: 'LIST' },
            ]
          : [{ type: 'Courses', id: 'LIST' }],
      transformResponse: (results: { data: { posts: ICourseResponse[] } }) =>
        results.data.posts,
        })
    })
})

export const {useCreateCourseMutation, useGetAllPostsQuery} = courseApi;
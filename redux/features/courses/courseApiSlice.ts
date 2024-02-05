import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/redux/services/axiosBaseQuery";
import FormData from "form-data";
import { ICourseGetResponse, ICourseResponse } from "@/redux/types";

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
            invalidatesTags: [{ type: "Courses", id: "LIST" }],
        }),
        getAllCourses: builder.query<ICourseGetResponse[], void>({
            query: () => ({
                url: "/course",
                method: "GET"
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ Course: course }) => {
                            const { id } = course;
                            return {
                                type: 'Courses' as const,
                                id,
                            }
                        }),
                        { type: 'Courses', id: 'LIST' },
                    ]
                    : [{ type: 'Courses', id: 'LIST' }],

        }),
        getCourse: builder.query<ICourseResponse, number>({
            query: (id) => ({
                url: `/course/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: 'Courses', id }]
        }),

        updateCourse: builder.mutation<ICourseResponse, { id: number, course: FormData }>({
            query: ({ id, course }) => ({
                url: `/course/${id}`,
                method: "PUT",
                data: course,
            }),
            invalidatesTags: (result, error, {id}) => result ?
                [
                    { type: "Courses", id },
                    { type: "Courses", id: "LIST" }
                ] :
                [   { type: "Courses", id: "LIST" }   ],
        }),
    })
})

export const { useCreateCourseMutation, useGetAllCoursesQuery, useGetCourseQuery, useUpdateCourseMutation } = courseApi;
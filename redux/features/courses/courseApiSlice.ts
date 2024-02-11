import { createApi } from "@reduxjs/toolkit/query/react";
import FormData from "form-data";
import { ICourseGetResponse, ICourseResponse } from "@/redux/types";
import baseQuery from "@/redux/services/apiSlice";

export const courseApi = createApi({
    reducerPath: "courseApi",
    baseQuery: baseQuery,
    tagTypes: ["Courses"],
    endpoints: (builder) => ({
        createCourse: builder.mutation<ICourseResponse, FormData>({
            query: (course) => ({
                url: "/course",
                method: "POST",
                body: course,
                formData: true
            }),
            invalidatesTags: [{ type: "Courses", id: "LIST" }],
        }),
        getAllCourses: builder.query<ICourseGetResponse[], void>({
            query: () => "/course",
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
            query: (id) => `/course/${id}`,
            providesTags: (result, error, id) => [{ type: 'Courses', id }]
        }),

        updateCourse: builder.mutation<ICourseResponse, { id: number, course: FormData }>({
            query: ({ id, course }) => ({
                url: `/course/${id}`,
                method: "PATCH",
                body: course,
                formData: true
            }),
            invalidatesTags: (result, error, {id}) => result ?
                [
                    { type: "Courses", id },
                    { type: "Courses", id: "LIST" }
                ] :
                [   { type: "Courses", id: "LIST" }   ],
        }),
        deleteCourse: builder.mutation<void, number>({
            query: (courseId) => ({
                url: `/course/delete`,
                method: "DELETE",
                params: {
                    cid: courseId
                }
            }),
            invalidatesTags: [{ type: 'Courses', id: 'LIST' }],
        })
    })
})

export const { useCreateCourseMutation, useGetAllCoursesQuery, useGetCourseQuery, useLazyGetCourseQuery, useUpdateCourseMutation, useDeleteCourseMutation } = courseApi;
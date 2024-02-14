"use client";
import { useGetCoursesChaptersQuery } from '@/redux/features/chapters/chapterApiSlice';
import { useGetCourseQuery } from '@/redux/features/courses/courseApiSlice';
import { redirect } from 'next/navigation';
import React from 'react'
import CourseSidebar from './_components/course-sidebar';
import CourseNavbar from './_components/course-navbar';

const CourseLayout = ({ children, params }: {
    children: React.ReactNode,
    params: {
        courseId: number;
    }
}) => {
    const { data: course, isLoading: isCourseLoading } = useGetCourseQuery(params.courseId);
    const { data: chapters = [], isLoading: isChapterLoading } = useGetCoursesChaptersQuery(params.courseId);

    if(isChapterLoading || isCourseLoading){
        return null;
    }

    if (!chapters || !course) {
        return redirect("/");
    }

    return (
        <div className="h-full">
            <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
                <CourseNavbar
                    chapters={chapters}
                    title={course.course_name}
                    courseId={params.courseId}
                />
            </div>
            <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
                <CourseSidebar
                    chapters={chapters}
                    title={course.course_name}
                    courseId={params.courseId}
                />
            </div>
            <main className="md:pl-80 h-full pt-[80px]">
                {children}
            </main>
        </div>
    )
}

export default CourseLayout
"use client";
import { useGetCoursesChaptersQuery } from "@/redux/features/chapters/chapterApiSlice";
import { useGetCourseQuery } from "@/redux/features/courses/courseApiSlice";
import { redirect, useRouter } from "next/navigation";

const CourseIdPage = ({params}: {
    params: {
        courseId: number;
    }
}) => {
    const {data: course, isLoading: isCourseLoading} = useGetCourseQuery(params.courseId);
    const {data: chapters = [], isLoading: isChapterLoading} = useGetCoursesChaptersQuery(params.courseId);


    const router = useRouter();

    if (isCourseLoading || isChapterLoading) {
        return <p className='text-center p-5 animate-pulse font-semibold'>Hang on tight, this may take a while....</p>
    }

    if(!course || !chapters){
        router.back();
    }

    const sortedChapters = chapters.toSorted((a, b) => a.chapter_no - b.chapter_no);

  return redirect(`/courses/${params.courseId}/chapters/${sortedChapters[0].id}`)
}

export default CourseIdPage
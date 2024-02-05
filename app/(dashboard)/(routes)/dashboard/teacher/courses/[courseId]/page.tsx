"use client"
import { useGetCourseQuery } from "@/redux/features/courses/courseApiSlice";
import { redirect } from "next/navigation";


const CourseIdPage = ({params} : {params: {courseId: number}}) => {
    const { data, isLoading } = useGetCourseQuery(params.courseId);

    if(isLoading){
        return <p className='text-center p-5 animate-pulse font-semibold'>Loading....</p>
    }

    if(!data){
        return redirect("/dashboard/teacher")
    }

    console.log("Course data")
    console.table(data);

    return ( <div>{params.courseId}</div> );
}
 
export default CourseIdPage;
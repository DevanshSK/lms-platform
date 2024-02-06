"use client"
import { IconBadge } from "@/components/icon-badge";
import { useGetCourseQuery } from "@/redux/features/courses/courseApiSlice";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import TeacherForm from "./_components/teacher-form";
import CourseCodeForm from "./_components/course-code-form";
import ImageForm from "./_components/image-form";


const CourseIdPage = ({params} : {params: {courseId: number}}) => {
    const { data: course, isLoading } = useGetCourseQuery(params.courseId);

    if(isLoading){
        return <p className='text-center p-5 animate-pulse font-semibold'>Loading....</p>
    }

    if(!course){
        return redirect("/dashboard/teacher")
    }

    // console.log("Course data")
    // console.table(course);

    const requiredFields = [
        course.course_code,
        course.course_name,
        course.description,
        course.img_url,
        course.teacher,
    ]
    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completionText = `(${completedFields}/${totalFields})`;
    

    return ( 
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">Course Setup</h1>
                    <span>Complete all fields {completionText}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl">Customise your course</h2>
                    </div>

                    <TitleForm initialData={course} courseId={course.id} />
                    <DescriptionForm initialData={course} courseId={course.id} />
                    <TeacherForm initialData={course} courseId={course.id} />
                    <CourseCodeForm initialData={course} courseId={course.id} />
                    <ImageForm initialData={course} courseId={course.id} />
                    
                </div>
            </div>
        </div> 
    );
}
 
export default CourseIdPage;
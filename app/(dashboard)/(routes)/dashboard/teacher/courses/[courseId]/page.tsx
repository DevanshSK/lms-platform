"use client"
import { IconBadge } from "@/components/icon-badge";
import { useGetCourseQuery } from "@/redux/features/courses/courseApiSlice";
import { LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import TeacherForm from "./_components/teacher-form";
import CourseCodeForm from "./_components/course-code-form";
import ImageForm from "./_components/image-form";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApiSlice";
import CategoryForm from "./_components/category-form";
import ChaptersForm from "./_components/chapters-form";
import CourseActions from "./_components/course-actions";
import { Banner } from "@/components/banner";


const CourseIdPage = ({ params }: { params: { courseId: number } }) => {
    const { data: course, isLoading: isCourseLoading } = useGetCourseQuery(params.courseId);
    const { data: categories, isLoading: isCategoriesLoading } = useGetCategoriesQuery();

    if (isCourseLoading || isCategoriesLoading) {
        return <p className='text-center p-5 animate-pulse font-semibold'>Loading....</p>
    }

    const mappedCategories = categories?.map(category => ({
        label: category.cate_name, value: category.id
    }))


    if (!course) {
        return redirect("/dashboard/teacher")
    }


    const requiredFields = [
        course.course_code,
        course.course_name,
        course.description,
        course.img_url,
        course.teacher,
        course.category,
    ]
    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completionText = `(${completedFields}/${totalFields})`;

    const isComplete = requiredFields.every(Boolean);


    return (
        <>
            {!course.is_published && (
                <Banner 
                    label="This course is not published. It will not be visible to students."
                />
            )}
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-medium">Course Setup</h1>
                        <span>Complete all fields {completionText}</span>
                    </div>
                    <CourseActions
                        disabled={!isComplete}
                        courseId={params.courseId}
                        isPublished={course.is_published}
                    />
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
                        <CategoryForm initialData={course} courseId={course.id} options={mappedCategories} />

                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={ListChecks} />
                                <h2 className="text-xl">
                                    Course chapters
                                </h2>
                            </div>

                            <ChaptersForm initialData={course} courseId={course.id} />

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CourseIdPage;
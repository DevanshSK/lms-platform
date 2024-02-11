"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import FormData from "form-data";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";

import { useDeleteCourseMutation, useUpdateCourseMutation } from "@/redux/features/courses/courseApiSlice";

interface CourseActionsProps{
    disabled: boolean;
    courseId: number;
    isPublished: boolean;
}

const CourseActions = ({
    disabled,
    courseId,
    isPublished
}: CourseActionsProps) => {
    const router = useRouter();
    const [updateCourse, {isLoading: isUpdateLoading}] = useUpdateCourseMutation();
    const [deleteCourse, {isLoading: isDeleteLoading}] = useDeleteCourseMutation(); 

    const onClick = () => {
        const formData = new FormData();
        let message: string;
        let loadingMessage:string;
        if(isPublished){
            // UnPublish the chapter
            formData.append("is_published", false);
            message = "Course unpublished";
            loadingMessage = "Unpublishing course..";
            
        } else {
            // Publish the chapter
            formData.append("is_published", true);
            message = "Course published";
            loadingMessage = "Publishing course..";
        }

        toast.promise(
            updateCourse({ id: courseId, course: formData }).unwrap(),
            {
                loading: loadingMessage,
                success: (data) => {
                    router.refresh();
                    return message;
                },
                error: (error) => {
                    console.log("Course publishing error");
                    console.log(error);
                    return "Something went wrong"
                },
            }
        );
    }

    const onDelete = () => {
        toast.promise(
            deleteCourse(courseId).unwrap(),
            {
                loading: 'Deleting course...',
                success: (data) => {
                    router.push(`/dashboard/teacher`);
                    return "Course deleted"
                },
                error: (error) => {
                    console.log("Course deletion error");
                    console.log(error);
                    return "Something went wrong"
                },
            }
        );
    }

    return ( 
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onClick}
                disabled={disabled || isUpdateLoading || isDeleteLoading}
                variant="outline"
                size="sm"
            >
                {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <ConfirmModal onConfirm={onDelete} >
                <Button size="sm" disabled={isUpdateLoading || isDeleteLoading}>
                    <Trash className="h-4 w-4" />
                </Button>
            </ConfirmModal>
        </div> 
    );
}
 
export default CourseActions;
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDeleteChapterMutation, useUpdateChapterMutation } from "@/redux/features/chapters/chapterApiSlice";
import FormData from "form-data";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

interface ChapterActionsProps{
    disabled: boolean;
    courseId: number;
    chapterId: number;
    isPublished: boolean;
}

const ChapterActions = ({
    disabled,
    courseId,
    chapterId,
    isPublished
}: ChapterActionsProps) => {
    const router = useRouter();
    const [updateChapter, {isLoading: isUpdateLoading}] = useUpdateChapterMutation();
    const [deleteChapter, {isLoading: isDeleteLoading}] = useDeleteChapterMutation(); 

    const onClick = () => {
        const formData = new FormData();
        let message: string;
        let loadingMessage:string;
        if(isPublished){
            // UnPublish the chapter
            formData.append("is_published", false);
            message = "Chapter unpublished";
            loadingMessage = "Unpublishing chapter..";
            
        } else {
            // Publish the chapter
            formData.append("is_published", true);
            message = "Chapter published";
            loadingMessage = "Publishing chapter..";
        }

        toast.promise(
            updateChapter({ courseId: courseId, chapterId: chapterId, chapter: formData }).unwrap(),
            {
                loading: loadingMessage,
                success: (data) => {
                    router.refresh();
                    return message;
                },
                error: (error) => {
                    console.log("Chapter publishing error");
                    console.log(error);
                    return "Something went wrong"
                },
            }
        );
    }

    const onDelete = () => {
        toast.promise(
            deleteChapter(chapterId).unwrap(),
            {
                loading: 'Deleting chapter...',
                success: (data) => {
                    router.push(`/dashboard/teacher/courses/${courseId}`);
                    return "Chapter deleted"
                },
                error: (error) => {
                    console.log("Chapter deletion error");
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
 
export default ChapterActions;
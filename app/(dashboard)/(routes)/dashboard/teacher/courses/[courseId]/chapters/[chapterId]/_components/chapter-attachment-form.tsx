"use client";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { Download, File as FileIcon, Pencil, PlusCircle, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import FormData from "form-data";

// import "node_modules/video-react/dist/video-react.css";
import { Player } from "video-react";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";


import { IChapterResponse } from "@/redux/types";
import { useUpdateChapterMutation } from "@/redux/features/chapters/chapterApiSlice";
import Link from "next/link";
import { CldUploadWidget } from "next-cloudinary";
import { TbFilePlus } from "react-icons/tb";



interface ChapterAttachmentFormProps {
    initialData: IChapterResponse;
    courseId: number;
    chapterId: number;
}


const formSchema = z.object({
    attachment: z.instanceof(File)
        .describe("Upload course attachment")
})

type FormType = z.infer<typeof formSchema>;


const ChapterAttachmentForm = ({ initialData, courseId, chapterId }: ChapterAttachmentFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updateChapter] = useUpdateChapterMutation();
    const router = useRouter();



    const toggleEdit = () => setIsEditing((current) => !current)

    const handleUpload = (value: any) => {
        console.log(value);
        if (value.event === "success") {
            const formData = new FormData();
            formData.append("resources_url", (value.info.secure_url));

            toast.promise(
                updateChapter({ courseId: courseId, chapterId: chapterId, chapter: formData }).unwrap(),
                {
                    loading: 'Uploading Resource...',
                    success: (data) => {
                        toggleEdit();
                        router.refresh();
                        return "Chapter updated"
                    },
                    error: (error) => {
                        console.log("Chapter updation error");
                        console.log(error);
                        return "Something went wrong"
                    },
                }
            );
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Chapter attachment
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && !initialData.resources_url && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add attachment
                        </>
                    )}
                    {!isEditing && initialData.resources_url && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit attachment
                        </>
                    )}
                </Button>
            </div>

            {!isEditing && (
                !initialData.resources_url ? (
                    <>No chapter attachments</>
                ) : (
                    <div className="relative mt-2">
                        <div className="flex items-center p-3 bg-blue-100 border-blue-200 text-blue-700 rounded-md">
                            <FileIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                            <p className="text-xs line-clamp-1">
                                {initialData.resources_url}
                            </p>
                            <Link href={initialData.resources_url} download target="_blank" >
                                <Download className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                )
            )}

            {isEditing && (
                <>
                <CldUploadWidget
                    onUpload={handleUpload}
                    uploadPreset="addVideoUploadingPreset"
                    options={{
                        maxFiles: 1
                    }}
                >
                    {({ open }) => {
                        return (
                            <div onClick={() => open?.()}
                                className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
                            >
                                <TbFilePlus size={50} />
                                <div className="font-semibold text-lg">Click to upload</div>
                            </div>
                        )
                    }}
                </CldUploadWidget>
            </>
            )}

        </div>
    );
}

export default ChapterAttachmentForm;
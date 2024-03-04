"use client";
import * as z from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { TbVideoPlus } from "react-icons/tb"
import { useRouter } from "next/navigation";
import FormData from "form-data";
import { CldUploadWidget} from "next-cloudinary";

// import "node_modules/video-react/dist/video-react.css";
import { BigPlayButton, Player } from "video-react";

import { Button } from "@/components/ui/button";


import { IChapterResponse } from "@/redux/types";
import { useUpdateChapterMutation } from "@/redux/features/chapters/chapterApiSlice";



interface ChapterVideoFormProps {
    initialData: IChapterResponse;
    courseId: number;
    chapterId: number;
}

const ChapterVideoForm = ({ initialData, courseId, chapterId }: ChapterVideoFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updateChapter] = useUpdateChapterMutation();
    const router = useRouter();

    const toggleEdit = () => setIsEditing((current) => !current)

    const handleUpload = (value: any) => {
        console.log(value);
        if (value.event === "success") {
            const formData = new FormData();
            formData.append("video_url", (value.info.secure_url));

            toast.promise(
                updateChapter({ courseId: courseId, chapterId: chapterId, chapter: formData }).unwrap(),
                {
                    loading: 'Uploading Video...',
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
                Chapter video
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && !initialData.video_url && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Video
                        </>
                    )}
                    {!isEditing && initialData.video_url && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit video
                        </>
                    )}
                </Button>
            </div>

            {!isEditing && (
                !initialData.video_url ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <Video className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <Player
                            playsInline
                            src={initialData.video_url}
                            preload="auto"
                            startTime={0}
                            fluid
                        >
                            <BigPlayButton position="center" />
                        </Player >
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
                                    <TbVideoPlus size={50} />
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

export default ChapterVideoForm;
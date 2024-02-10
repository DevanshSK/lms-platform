"use client";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import FormData from "form-data";

// import "node_modules/video-react/dist/video-react.css";
import {Player} from "video-react";

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



interface ChapterVideoFormProps {
    initialData: IChapterResponse;
    courseId: number;
    chapterId: number;
}


const formSchema = z.object({
    video: z.instanceof(File)
        .describe("Upload course video")
})

type FormType = z.infer<typeof formSchema>;


const ChapterVideoForm = ({ initialData, courseId, chapterId }: ChapterVideoFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updateChapter] = useUpdateChapterMutation();
    const router = useRouter();



    const toggleEdit = () => setIsEditing((current) => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        formData.append("video", values.video);


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



    // Initialize react dropzone
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'video/mp4': ['.mp4'],
        },
        onDrop: (acceptedFiles) => {
            form.setValue('video', acceptedFiles[0], {
                shouldValidate: true
            });
        }
    });

    const video = form.watch('video');

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
                        />
                    </div>
                )
            )}

            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField control={form.control} name="video" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative flex items-center justify-center h-60  bg-slate-200 p-2 rounded-md border-dashed border-2 border-gray-500" {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <div className="flex flex-col items-center justify-center">
                                            <Video className="h-10 w-10 text-slate-500" />
                                            <p className="text-sm text-blue-700 font-semibold">Choose files or drag and drop</p>
                                            <p className="text-xs text-muted-foreground">Video (.mp4)</p>
                                        </div>
                                    </div>
                                </FormControl>
                                <FormDescription className="text-xs text-muted-foreground mt-4">16:9 aspect ratio recommended.</FormDescription>
                                {video && <FormLabel>{video.name} - {video.size} bytes</FormLabel>}
                                <FormMessage />
                            </FormItem>
                        )} />

                        <div className="flex items-center gap-x-2">
                            <Button type="submit" disabled={!isValid || isSubmitting}>
                                Save
                            </Button>
                            <Button type="button" variant='ghost' onClick={() => form.reset()}>Reset</Button>
                        </div>
                    </form>
                </Form>
            )}

        </div>
    );
}

export default ChapterVideoForm;
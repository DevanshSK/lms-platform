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

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        formData.append("notes", values.attachment);


        toast.promise(
            updateChapter({ courseId: courseId, chapterId: chapterId, chapter: formData }).unwrap(),
            {
                loading: 'Uploading Attachment...',
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
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        },
        onDrop: (acceptedFiles) => {
            form.setValue('attachment', acceptedFiles[0], {
                shouldValidate: true
            });
        }
    });

    const attachment = form.watch('attachment');

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Chapter attachment
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && !initialData.resource_url && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add attachment
                        </>
                    )}
                    {!isEditing && initialData.resource_url && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit attachment
                        </>
                    )}
                </Button>
            </div>

            {!isEditing && (
                !initialData.resource_url ? (
                    <>No chapter attachments</>
                ) : (
                    <div className="relative mt-2">
                        <div className="flex items-center p-3 bg-blue-100 border-blue-200 text-blue-700 rounded-md">
                            <FileIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                            <p className="text-xs line-clamp-1">
                                {initialData.resource_url}
                            </p>
                            <Link href={initialData.resource_url} download target="_blank" >
                                <Download className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                )
            )}

            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField control={form.control} name="attachment" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative flex items-center justify-center h-60  bg-slate-200 p-2 rounded-md border-dashed border-2 border-gray-500" {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <div className="flex flex-col items-center justify-center">
                                            <FileIcon className="h-10 w-10 text-slate-500" />
                                            <p className="text-sm text-blue-700 font-semibold">Choose files or drag and drop</p>
                                            <p className="text-xs text-muted-foreground">Video (.mp4)</p>
                                        </div>
                                    </div>
                                </FormControl>
                                <FormDescription className="text-xs text-muted-foreground mt-4">Add anything your student might need to complete this course....</FormDescription>
                                {attachment && <FormLabel>{attachment.name} - {attachment.size} bytes</FormLabel>}
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

export default ChapterAttachmentForm;
"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import FormData from "form-data";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { IChapterResponse, ICourseResponse } from "@/redux/types";
import { useCreateChapterMutation, useGetCoursesChaptersQuery, useUpdateChapterMutation } from "@/redux/features/chapters/chapterApiSlice";
import ChaptersList from "./chapters-list";
// import ChaptersList from "./chapters-list";


interface ChaptersFormProps {
    initialData: ICourseResponse
    courseId: number;
}

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Chapter title is required"
    })
})

const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [createChapter] = useCreateChapterMutation();
    const [updateChapter] = useUpdateChapterMutation();
    const { data: chapters = [], error } = useGetCoursesChaptersQuery(courseId);

    // if(error){
    //     console.log("CHAPTER FETCHING ERROR");
    //     console.log(error);
    // }

    const toggleCreating = () => setIsCreating((current) => !current)
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        let position;

        if (chapters.length > 0) {
            position = Math.max(...chapters.map(chapter => chapter.chapter_no)) + 1;
        } else {
            position = 1;
        }
        formData.append("title", values.title);
        formData.append("chapter_no", position);


        toast.promise(
            createChapter({ courseId: courseId, chapter: formData }).unwrap(),
            {
                loading: 'Adding Chapter...',
                success: (data) => {
                    toggleCreating();
                    router.refresh();
                    return "Chapter created"
                },
                error: (error) => {
                    console.log("Chapter creation error");
                    console.log(error);
                    return "Something went wrong"
                },
            }
        );
    }

    const onReorder = async (updateData: { id: number; position: number }[]) => {
        try {
            setIsUpdating(true);
            console.log("CHAPTER REORDER")
            console.log(updateData)

            // await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
            //     list: updateData
            // })

            updateData.forEach(async item => {
                const updateFormData = new FormData();
                updateFormData.append("chapter_no", item.position);
                await updateChapter({
                    courseId: courseId,
                    chapterId: item.id,
                    chapter: updateFormData
                }).unwrap()
            });

            toast.success("Chapters reordered");
            router.refresh();

        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsUpdating(false);
        }
    }

    const onEdit = (id: number) => {
        router.push(`/teacher/courses/${courseId}/chapters/${id}`);
    }

    return (
        <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
            {isUpdating && (
                <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
                    <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
                </div>
            )}
            <div className="font-medium flex items-center justify-between">
                Course chapters
                <Button variant="ghost" onClick={toggleCreating} >
                    {isCreating ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Plus className="h-4 w-4 mr-2" />
                            Add a chapter
                        </>
                    )}
                </Button>
            </div>

            {isCreating && (
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Introduction to the course'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            disabled={!isValid || isSubmitting}
                            type="submit"
                        >
                            Create
                        </Button>
                    </form>
                </Form>
            )}


            {!isCreating && (
                <div className={cn(
                    "text-sm mt-2",
                    !chapters.length && "text-slate-500 italic"
                )} >
                    {!chapters.length && "No chapters"}
                    <ChaptersList
                        onEdit={onEdit}  
                        onReorder={onReorder}
                        items={chapters || []}  
                    />
                </div>
            )}

            {!isCreating && (
                <p className="text-xs text-muted-foreground mt-4">
                    Drag and drop to reorder the chapters
                </p>
            )}
        </div>
    );
}

export default ChaptersForm;
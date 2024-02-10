"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdateChapterMutation } from "@/redux/features/chapters/chapterApiSlice";
import FormData from "form-data";


interface ChapterTitleFormProps {
    initialData: {
        title: string;
    }
    courseId: number;
    chapterId: number;
}

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Chapter Title is required"
    })
})

const ChapterTitleForm = ({ initialData, courseId, chapterId }: ChapterTitleFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updateChapter] = useUpdateChapterMutation();

    const toggleEdit = () => setIsEditing((current) => !current)
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        formData.append("title", values.title);

        toast.promise(
            updateChapter({ courseId: courseId, chapterId: chapterId, chapter: formData }).unwrap(),
            {
                loading: 'Updating Chapter...',
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

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Chapter Title
                <Button variant="ghost" onClick={toggleEdit} >
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Title
                        </>
                    )}
                </Button>
            </div>

            {!isEditing ? (
                <p className="text-sm mt-2">
                    {initialData.title}
                </p>
            ) : (
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField 
                            control={form.control}
                            name="title"
                            render={({field}) => (
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

                         <div className="flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                            >
                                Save
                            </Button>
                         </div>
                    </form>
                </Form>
            )}
        </div>
    );
}

export default ChapterTitleForm;
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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Editor } from "@/components/editor";
import { Preview } from "@/components/preview";
import { useUpdateChapterMutation } from "@/redux/features/chapters/chapterApiSlice";
import { IChapterResponse } from "@/redux/types";
import FormData from "form-data";


interface ChapterDescriptionFormProps {
    initialData: IChapterResponse;
    courseId: number;
    chapterId: number;
}

const formSchema = z.object({
    description: z.string().min(1, {
        message: "Description is required"
    })
})

const ChapterDescriptionForm = ({ initialData, courseId, chapterId }: ChapterDescriptionFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updateChapter] = useUpdateChapterMutation();

    const toggleEdit = () => setIsEditing((current) => !current)
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData?.description || ""
          },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        formData.append("description", values.description);

        toast.promise(
            updateChapter({ courseId: courseId, chapterId: chapterId, chapter: formData }).unwrap(),
            {
                loading: 'Updating Course...',
                success: (data) => {
                    toggleEdit();
                    router.refresh();
                    return "Course updated"
                },
                error: (error) => {
                    console.log("Course updation error");
                    console.log(error);
                    return "Something went wrong"
                },
            }
        );
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Chapter description
                <Button variant="ghost" onClick={toggleEdit} >
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit description
                        </>
                    )}
                </Button>
            </div>

            {!isEditing ? (
                <div className={cn("text-sm mt-2",
                    !initialData.description && "text-slate-500"
                )}>
                    {!initialData.description && "No description"}
                    {initialData.description && (
                        <Preview  
                            value={initialData.description}
                        />
                    )}
                </div>
            ) : (
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField 
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Editor
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

export default ChapterDescriptionForm;





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
import { Textarea } from "@/components/ui/textarea";

import { ICourseResponse } from "@/redux/types";
import { useUpdateCourseMutation } from "@/redux/features/courses/courseApiSlice";
import FormData from "form-data";
import { Input } from "@/components/ui/input";


interface TitleFormProps {
    initialData: ICourseResponse;
    courseId: number;
}


const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    })
})


const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updateCourse, { isLoading }] = useUpdateCourseMutation();
    const router = useRouter();

    const { created_at, id, img_url, ...rest } = initialData;

    const toggleEdit = () => setIsEditing((current) => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.course_name || ""
        }
    })

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        const updatedCourse = {
            ...rest,
            "course_name": values.title,
        }
        const formData = new FormData();
        for (let key in updatedCourse) {
            formData.append(key, (updatedCourse as any)[key])
        }

        toast.promise(
            updateCourse({ id: courseId, course: formData }).unwrap(),
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
                Course Title
                <Button variant="ghost" onClick={toggleEdit}>
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
                <p>{initialData.course_name}</p>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField control={form.control} name="title" render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        disabled={isSubmitting}
                                        placeholder="e.g. Advanced Web Development"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <div className="flex items-center gap-x-2">
                            <Button type="submit" disabled={!isValid || isSubmitting}>
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}

        </div>
    );
}

export default TitleForm;
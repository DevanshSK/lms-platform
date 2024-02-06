"use client";
import * as z from "zod";
import axios from "axios";
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


interface DescriptionFormProps {
    initialData: ICourseResponse;
    courseId: number;
}


const formSchema = z.object({
    description: z.string().min(1, {
        message: "Description is required",
    })
})


const DescriptionForm = ({ initialData, courseId }: DescriptionFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updateCourse] = useUpdateCourseMutation();
    const router = useRouter();

    const { created_at, id, img_url, ...rest } = initialData;

    const toggleEdit = () => setIsEditing((current) => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData?.description || ""
        }
    })

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        const updatedCourse = {
            ...rest,
            "description": values.description,
        }
        const formData = new FormData();
        for (let key in updatedCourse) {
            formData.append(key, (updatedCourse as any)[key])
        }

        toast.promise(
            updateCourse({ id: courseId, course: formData }).unwrap(),
            {
                loading: 'Updating Course...',
                success: () => {
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
                            Edit Description
                        </>
                    )}
                </Button>
            </div>

            {!isEditing ? (
                <p>{initialData.description}</p>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField control={form.control} name="description" render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        disabled={isSubmitting}
                                        placeholder="e.g. Here you can describe your course."
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

export default DescriptionForm;
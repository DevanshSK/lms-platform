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
import { Combobox } from "@/components/ui/combobox";


interface CategoryFormProps {
    initialData: ICourseResponse;
    courseId: number;
    options: {label: string; value: number; }[] | undefined;
}


const formSchema = z.object({
    category: z.coerce.number().min(1, {
        message: "Course category is required",
    })
})


const CategoryForm = ({ initialData, courseId, options }: CategoryFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updateCourse] = useUpdateCourseMutation();
    const router = useRouter();

    const toggleEdit = () => setIsEditing((current) => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category: initialData?.category
        }
    })

    const currentCategory = options?.find(c => c.value === initialData?.category)

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        formData.append("category", values.category);

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
                Course Category
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing ? (
                            <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Category
                        </>
                    )}
                </Button>
            </div>

            {!isEditing ? (
                <p>{currentCategory?.label}</p>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField control={form.control} name="category" render={({field}) => (
                            <FormItem>
                                <FormControl>
                                <Combobox options={options || []} {...field} />
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

export default CategoryForm;
"use client";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { ImageIcon, ImagePlus, Pencil, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";

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

import { ICourseResponse } from "@/redux/types";
import { useUpdateCourseMutation } from "@/redux/features/courses/courseApiSlice";
import FormData from "form-data";
import Image from "next/image";



interface ImageFormProps {
    initialData: ICourseResponse;
    courseId: number;
}


const formSchema = z.object({
    image: z.instanceof(File)
        .describe("Upload course image")
        .refine(
            (file) => file.size <= 5 * 1024 * 1024, // 5 MB limit
            {
                message: 'Image file size must be less than 5 MB',
                path: ['image'],
            }
        )
})

type FormType = z.infer<typeof formSchema>;


const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updateCourse, { isLoading }] = useUpdateCourseMutation();
    const router = useRouter();

    const { created_at, id, img_url, ...rest } = initialData;

    const toggleEdit = () => setIsEditing((current) => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        console.log("Image data");
        console.log(values.image);
        console.log(isValid, isSubmitting);

        // const updatedCourse = {
        //     ...rest,
        //     "course_name": values.title,
        // }
        // const formData = new FormData();
        // for (let key in updatedCourse) {
        //     formData.append(key, (updatedCourse as any)[key])
        // }


        // toast.promise(
        //     updateCourse({ id: courseId, course: formData }).unwrap(),
        //     {
        //         loading: 'Updating Course...',
        //         success: (data) => {
        //             toggleEdit();
        //             router.refresh();
        //             return "Course updated"
        //         },
        //         error: (error) => {
        //             console.log("Course updation error");
        //             console.log(error);
        //             return "Something went wrong"
        //         },
        //     }
        // );


    }



    // Initialize react dropzone
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg'],
        },
        onDrop: (acceptedFiles) => {
            form.setValue('image', acceptedFiles[0], {
                shouldValidate: true
            });
        }
    });

    const image = form.watch('image');
    const imageUrl = image ? URL.createObjectURL(image) : "";
    console.log(imageUrl);

    console.log(isValid)
    console.log(form.formState.errors)

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Image
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && !initialData.img_url && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Image
                        </>
                    )}
                    {!isEditing && initialData.img_url && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit image
                        </>
                    )}
                </Button>
            </div>

            {!isEditing && (
                !initialData.img_url ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <ImageIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <Image
                            alt="Course Image"
                            fill
                            className="object-cover rounded-md"
                            src={initialData.img_url}
                        />
                    </div>
                )
            )}

            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField control={form.control} name="image" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative flex items-center justify-center h-60  bg-slate-200 p-2 rounded-md border-dashed border-2 border-gray-500" {...getRootProps()}>
                                        { imageUrl && <Image
                                            alt="Selected image"
                                            fill
                                            className="object-cover rounded-md"
                                            src={imageUrl}
                                        /> }
                                        <input {...getInputProps()} />
                                        <div className="flex flex-col items-center justify-center">
                                            <ImagePlus className="h-10 w-10 text-slate-500" />
                                            <p className="text-sm text-blue-700 font-semibold">Choose files or deag and drop</p>
                                            <p className="text-xs text-muted-foreground">Image (5MB)</p>
                                        </div>
                                    </div>
                                </FormControl>
                                <FormDescription className="text-xs text-muted-foreground mt-4">16:9 aspect ratio recommended.</FormDescription>
                                {image && <FormLabel>{image.name} - {image.size} bytes</FormLabel>}
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

export default ImageForm;
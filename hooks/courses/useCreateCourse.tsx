import FormData from "form-data";

import { TypeOf, object, string, number, coerce } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useCreateCourseMutation } from "@/redux/features/courses/courseApiSlice";
import { useRouter } from "next/navigation";

const courseSchema = object({
    title: string().min(1, {
        message: "Title is required"
    }),
    description: string().min(1, {
        message: "Course description is required"
    }),
    teacher: string().min(1, {
        message: "Course Teacher is required"
    }),
    code: string().min(1, {
        message: "Course code is required"
    }).max(10, {
        message: "Course code cannot exceed 10 characters"
    }),
    category: coerce.number().min(1, {
        message: "Course category is required"
    })
})
// TODO: Update Category id and isPublished in the form

export type CreateCourseInput = TypeOf<typeof courseSchema>;

export default function useCreateCourse(){
    const router = useRouter();
    const [createCourse, {isLoading}] = useCreateCourseMutation();

    const form = useForm<CreateCourseInput>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            title: "",
            code: "",
            description: "",
            teacher: "",
            category: 0
        }
    })

    const onSubmit: SubmitHandler<CreateCourseInput> = async (values) => {
        const courseData = new FormData();
        courseData.append("course_name", values.title);
        courseData.append("description", values.description);
        courseData.append("course_code", values.code);
        courseData.append("teacher", values.teacher);
        courseData.append("is_published", false);
        courseData.append("category", values.category);

        //TODO: Add course query
        console.table(values)

        createCourse(courseData)
        .unwrap()
        .then((data) => {
            toast.success("Course created successfully");
            router.push(`/dashboard/teacher/courses/${data.id}`);
        })
        .catch((error) => {
            console.log("COURSE CREATION ERROR")
            console.log(error);
            toast.error((error.data.detail as string) || "Something went wrong, Try again");
        })
    }

    return {
        form,
        onSubmit
    }
}
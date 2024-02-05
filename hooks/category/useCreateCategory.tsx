import FormData from "form-data";

import { TypeOf, object, string, number, coerce } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCreateCategoryMutation } from "@/redux/features/category/categoryApiSlice";

const categorySchema = object({
    title: string().min(1, {
        message: "Category title is required"
    })
})

export type CreateCategoryInput = TypeOf<typeof categorySchema>;

export default function useCreateCategory(){
    const router = useRouter();
    const [createCategory, {isLoading}] = useCreateCategoryMutation();

    const form = useForm<CreateCategoryInput>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            title: ""
        }
    })

    const onSubmit: SubmitHandler<CreateCategoryInput> = async (values) => {
        const categoryData = new FormData();
        categoryData.append("cate_name", values.title);

        createCategory(values.title)
        .unwrap()
        .then(() => {
            toast.success("Category created");
            router.push("/dashboard/teacher");
        })
        .catch((error) => {
            console.log("CATEGORY CREATION ERROR")
            console.log(error);
            toast.error((error.data.detail as string) || "Something went wrong, Try again");
        })
    }

    return {
        form,
        onSubmit
    }
}
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";
import { useSignupMutation } from "@/redux/features/auth/authApiSlice";
import FormData from "form-data";

import { TypeOf, object, string } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

// ZOD signup schema
const registerSchema = object({
    email: string().min(1, "Email is required").email("Email address is invalid"),
    name: string().min(1, "Name is required"),
    password: string()
        .min(1, "Password is required")
        .min(5, "Password must be more than 5 characters")
        .max(32, 'Password must be less than 32 characters'),
    repassword: string()
        .min(1, "Please confirm your password"),
    education: string(),
}).refine((data) => data.password === data.repassword, {
    path: ['repassword'],
    message: "Passwords do not match"
});

export type RegisterInput = TypeOf<typeof registerSchema>;

export default function useRegister() {
    const router = useRouter();
    const [register, { isLoading }] = useSignupMutation();

    // React hook form setup
    const form = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
            repassword: "",
            education: ""
        }
    });

    const onSubmit: SubmitHandler<RegisterInput> = (values) => {
        toast.promise(register(values)
        .unwrap(), 
        {
            loading: "Signing up...",
            success: () => {
                router.push('/sign-in');
                return "User registered successfully."
            },
            error: (error) => {
                console.error("REGISTER ERROR");
                console.log(error);
                return (error.data.detail as string) || "Something went wrong, try again."
            }
        })
    }

    return {
        isLoading,
        form,
        onSubmit
    };
}
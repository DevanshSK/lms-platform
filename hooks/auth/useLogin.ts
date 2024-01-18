import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { useLoginMutation } from "@/redux/features/auth/authApiSlice";
import { setAuth, logout } from "@/redux/features/auth/authSlice";
import { useToast } from "@/components/ui/use-toast";
import FormData from "form-data";

import { TypeOf, object, string } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Zos login schema
const loginSchema = object({
    email: string().min(1, "Email is required")
        .email("Email address is invalid"),
    password: string()
        .min(1, "Password is required")
        .min(5, "Password must be more than 5 characters"),
})
// Export login schema type
export type LoginInput = TypeOf<typeof loginSchema>;

export default function useLogin() {
    const router = useRouter();
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const [login, { isLoading }] = useLoginMutation();

    // React hook form setup.
    const form = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    // const [formData, setFormData] = useState({
    //     email: '',
    //     password: ''
    // });

    // const { email, password } = formData;

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('userToken');
    }

    // const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = event.target;
    //     setFormData({ ...formData, [name]: value });
    // }

    // const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const onSubmit : SubmitHandler<LoginInput> = (values) => {
        const loginFormData = new FormData();
        loginFormData.append("username", values.email);
        loginFormData.append("password", values.password);
        login(loginFormData)
            .unwrap()
            .then((data) => {
                dispatch(setAuth(data.access_token));
                localStorage.setItem('userToken', data.access_token);
                toast({
                    description: "User logged in",
                });
                router.push('/');
            })
            .catch((error) => {
                console.log("LOGIN ERROR")
                console.log(error);
                toast({
                    variant: 'destructive',
                    description: (error.data.detail as string) || "Something went wrong, Try again"
                })
            })
    }


    return {
        isLoading,
        form,
        onSubmit,
        handleLogout
    }
}
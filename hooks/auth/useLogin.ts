import { useAppDispatch } from "@/redux/hooks";
import { useLoginMutation } from "@/redux/features/auth/authApiSlice";
import { setAuth, logout } from "@/redux/features/auth/authSlice";
import FormData from "form-data";

import { TypeOf, object, string } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useGetUserQuery, userApi } from "@/redux/features/user/userApiSlice";
import { logoutUser } from "@/redux/features/user/userSlice";
import { useRouter } from "next/navigation";

// Zod login schema
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
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [login, { isLoading }] = useLoginMutation();
    const {refetch} = useGetUserQuery();

    // React hook form setup.
    const form = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const handleLogout = () => {
        dispatch(logout());
        dispatch(logoutUser());
        // localStorage.removeItem('userToken');
    }

    const onSubmit: SubmitHandler<LoginInput> = async (values) => {
        const loginFormData = new FormData();
        loginFormData.append("username", values.email);
        loginFormData.append("password", values.password);

        toast.promise(
            login(loginFormData).unwrap(),
            {
                loading: 'Signing in...',
                success: (data) => {
                    dispatch(setAuth(data.access_token));
                    refetch();
                    router.push("/");
                    return "User signed in successfully"
                },
                error: (error) => {
                    console.log("LOGIN ERROR");
                    console.log(error);
                    return (error.data.detail as string) || "Something went wrong, Try again"
                },
            }
        );
    }


    return {
        isLoading,
        form,
        onSubmit,
    }
}
import { useAppDispatch } from "@/redux/hooks";
import { useLoginMutation } from "@/redux/features/auth/authApiSlice";
import { setAuth, logout } from "@/redux/features/auth/authSlice";
import FormData from "form-data";

import { TypeOf, object, string } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { userApi } from "@/redux/features/user/userApiSlice";
import { logoutUser } from "@/redux/features/user/userSlice";

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
    const [login, { isLoading }] = useLoginMutation();    

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

    const onSubmit : SubmitHandler<LoginInput> = async (values) => {
        const loginFormData = new FormData();
        loginFormData.append("username", values.email);
        loginFormData.append("password", values.password);

        login(loginFormData)
            .unwrap()
            .then(async (data) => {
                dispatch(setAuth(data.access_token));
                dispatch(userApi.endpoints.getUser.initiate());
                toast.success("User signed in successfully");
            })
            .catch((error) => {
                console.log("LOGIN ERROR")
                console.log(error);
                toast.error((error.data.detail as string) || "Something went wrong, Try again");
            })
    }


    return {
        isLoading,
        form,
        onSubmit,
    }
}
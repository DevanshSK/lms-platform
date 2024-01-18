import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { useLoginMutation } from "@/redux/features/auth/authApiSlice";
import { setAuth, logout } from "@/redux/features/auth/authSlice";
import { useToast } from "@/components/ui/use-toast";
import FormData from "form-data";

export default function useLogin() {
    const router = useRouter();
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const [login, { isLoading }] = useLoginMutation();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('userToken');
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const loginFormData = new FormData();
        loginFormData.append("username", email);
        loginFormData.append("password", password);


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
        email,
        password,
        isLoading,
        onChange,
        onSubmit,
        handleLogout
    }
}
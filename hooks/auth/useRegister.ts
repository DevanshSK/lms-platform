import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSignupMutation } from "@/redux/features/auth/authApiSlice";
import { useToast } from "@/components/ui/use-toast";
import FormData from "form-data";

export default function useRegister() {
    const router = useRouter();
    const { toast } = useToast();
    const [register, { isLoading }] = useSignupMutation();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: ''
    });

    const { first_name, last_name, email, password, re_password } = formData;

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        const registerFormData = new FormData();
        registerFormData.append('username', email);
        registerFormData.append('password', password);

        register(registerFormData)
            .unwrap()
            .then(() => {
                toast({ description: 'Please check email to verify account' });
                router.push('/auth/login');
            })
            .catch(() => {
                toast({ variant: "destructive", description: 'Failed to register account' });
            });
    }

    return {
		first_name,
		last_name,
		email,
		password,
		re_password,
		isLoading,
		onChange,
		onSubmit,
	};
}
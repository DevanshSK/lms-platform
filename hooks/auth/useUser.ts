import { logout } from "@/redux/features/auth/authSlice";
import { logoutUser, selectUser } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

export default function useUser(){
    const router = useRouter();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    
    const handleLogout = () => {
        dispatch(logout());
        dispatch(logoutUser());
        router.push('/');
    }

    return {
        user,
        handleLogout
    }
}
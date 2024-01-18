// import { useRouter } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { clearToken } from "@/redux/features/auth/authSlice";
// import { logOut } from "@/redux/features/user/userSlice";

// export default function useUser(){
//     const dispatch = useAppDispatch();
//     const { user } = useAppSelector(state => state.userState);
//     const router = useRouter();
    
//     const logout = () => {
//         dispatch(clearToken());
//         dispatch(logOut());
//         router.push('/sign-in');
//     }

//     return {
//         user,
//         logout
//     }
// }
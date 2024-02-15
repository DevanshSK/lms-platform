"use client";
import { useLogin } from "@/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useGetUserQuery } from "@/redux/features/user/userApiSlice";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/features/user/userSlice";


const UserNav = () => {

  const { handleLogout } = useLogin();
  const user = useAppSelector(selectUser);
  const router = useRouter();


  return user ? (<DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="default" className="relative rounded-full">
        {user?.name || "User"}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56" align="end" forceMount>

      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
          <p className="text-xs leading-none text-muted-foreground">
            {user?.email || "user@exmaple.com"}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuItem
        onClick={() => router.push('/dashboard')}
        className="font-normal"
      >
        Dashboard
      </DropdownMenuItem>
      {user?.role === "admin" && (
        <>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push('/dashboard/teacher/courses')}
            className="font-normal"
          >
            Teacher&apos; Mode
          </DropdownMenuItem>
        </>
      )}

      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => handleLogout()}>
        Log out
      </DropdownMenuItem>

    </DropdownMenuContent>
  </DropdownMenu>) : (
    <Button onClick={() => router.push("/sign-in")}>Sign-in</Button>
  );
}

export default UserNav;
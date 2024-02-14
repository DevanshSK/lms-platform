"use client";
import Link from "next/link";

import UserNav from "./user-nav";
import { redirect, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import SearchInput from "../search-input";
import { useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/features/user/userSlice";

const NavbarRoutes = () => {
  const user = useAppSelector(selectUser);
  const pathname = usePathname();

  const isTecherPage = pathname?.startsWith("/dashboard/teacher")
  const isPlayerPage = pathname?.startsWith("/dashboard/chapter")
  const isSearchPage = pathname === "/dashboard/search";

  console.log(user?.role);
  const isAdmin = !!(user?.role === "admin");
  console.log(isAdmin)

  if(!isAdmin && isTecherPage){
    redirect("/dashboard/");
  }

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {(isTecherPage || isPlayerPage) && (
          <Link href="/dashboard">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        )}
        {isAdmin && !isTecherPage && (
          <Link href="/dashboard/teacher/courses">
            <Button size="sm" variant="ghost">Teacher mode</Button></Link>
        )}
        <UserNav />
      </div>
    </>
  )
}

export default NavbarRoutes
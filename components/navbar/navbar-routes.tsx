"use client";
import Link from "next/link";

import UserNav from "./user-nav";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const NavbarRoutes = () => {

  const pathname = usePathname();

  const isTecherPage = pathname?.startsWith("/dashboard/teacher")
  const isPlayerPage = pathname?.startsWith("/dashboard/chapter")

  return (
    <div className="flex gap-x-2 ml-auto">
      {isTecherPage || isPlayerPage ? (
        <Link href="/dashboard">
        <Button size="sm" variant="ghost">
          <LogOut className="h-4 w-4 mr-2" />
          Exit
        </Button>
        </Link>
      ) : (
        <Link href="/dashboard/teacher/">
          <Button size="sm" variant="ghost">Teacher mode</Button></Link>
      )}
      <UserNav />
    </div>
  )
}

export default NavbarRoutes
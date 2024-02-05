"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";

import { usePathname } from "next/navigation";
import SidebarItem from "./sidebar-item";

const guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/dashboard"
    },
    {
        icon: Compass,
        label: "Browse",
        href: "/dashboard/search"
    }
]

const teacherRoutes = [
    {
        icon: List,
        label: "Courses",
        href: "/dashboard/teacher/courses"
    },
    {
        icon: BarChart,
        label: "Create Category",
        href: "/dashboard/teacher/category/create"
    }
]

const SidebarRoutes = () => {
    const pathname = usePathname();

    const isTeacherPage = pathname?.includes("/teacher")

    const routes = isTeacherPage ? teacherRoutes : guestRoutes;

    return (
        <div className="flex flex-col w-full">
            {routes.map(route => (
                <SidebarItem 
                    key={route.href}  
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    );
}

export default SidebarRoutes;
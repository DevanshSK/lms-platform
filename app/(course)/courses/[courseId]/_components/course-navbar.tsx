import NavbarRoutes from "@/components/navbar/navbar-routes";
import { IChapterResponse } from "@/redux/types"
import CourseMobileSidebar from "./course-mobile-sidebar";


interface CourseNavbarProps {
    chapters: IChapterResponse[];
    title: string;
    courseId: number;
}

const CourseNavbar = ({
    chapters,
    title,
    courseId
}: CourseNavbarProps) => {
    return (
        <div className="p-4 border-b h-full flex items-center  bg-white shadow-sm">
            <CourseMobileSidebar 
                chapters={chapters}
                title={title}
                courseId={courseId}
            />
            <NavbarRoutes />
        </div>
    )
}

export default CourseNavbar
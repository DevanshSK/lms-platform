import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet"

import { IChapterResponse } from "@/redux/types";
import { Menu } from "lucide-react";
import CourseSidebar from "./course-sidebar";

interface CourseMobileSidebarProps{
    chapters: IChapterResponse[];
    title: string;
    courseId: number;
}

const CourseMobileSidebar = ({
    chapters,
    title,
    courseId
}: CourseMobileSidebarProps) => {
  return (
    <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-white w-72">
                <CourseSidebar
                    chapters={chapters}
                    title={title}
                    courseId={courseId}
                />
            </SheetContent>
        </Sheet>
  )
}

export default CourseMobileSidebar
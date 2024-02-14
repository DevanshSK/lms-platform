import { IChapterResponse } from "@/redux/types"
import CourseSidebarItem from "./course-sidebar-item";

interface CourseSidebarProps {
    chapters: IChapterResponse[];
    title: string;
    courseId: number;
}

const CourseSidebar = ({
    chapters,
    title,
    courseId
}: CourseSidebarProps) => {
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
            <div className="p-8 flex flex-col border-b">
                <h1 className="font-semibold">{title}</h1>
            </div>
            <div className="flex flex-col w-full">
                {chapters.map((chapter: IChapterResponse) => (
                    <CourseSidebarItem
                        key={chapter.id}
                        id={chapter.id}
                        label={chapter.title}
                        courseId={courseId}
                    />
                ))}
            </div>
        </div>
    )
}

export default CourseSidebar
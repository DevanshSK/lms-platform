import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";
import { useGetCoursesChaptersQuery } from "@/redux/features/chapters/chapterApiSlice";
import formatNumber from "@/utils/formatNumber";
import { Badge } from "./ui/badge";
import { FcBookmark } from "react-icons/fc"

interface CourseCardProps {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  courseCode: string;
  teacher: string;
  category: number;
  enrollments: number;
}

const CourseCard = ({
  id,
  title,
  imageUrl,
  description,
  courseCode,
  teacher,
  category,
  enrollments
}: CourseCardProps) => {
  const { data: chapters, isLoading } = useGetCoursesChaptersQuery(id);

  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg  h-full">
        <div className="relative w-full aspect-video  overflow-hidden">
          <Image
            fill
            className="object-cover"
            alt={title}
            src={imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpsbbfdOYmsxB3yf6a1YbC8auRHG7o9Ta4xw&s"}
          />
          <div className="absolute flex -top-2 right-3">
            <div className="relative flex items-center justify-center">
              <FcBookmark size={40} />
              {/* <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-white">New</span> */}
            </div>
          </div>
        </div>
        <div className="flex flex-col m-3">
          <div className="text-lg md:text-base font-medium group-hover:text-blue-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-sm ">
            {teacher}
          </p>
          <p className="text-xs mt-1 text-muted-foreground line-clamp-1 text-ellipsis">
            {description}
          </p>
          <div className="my-3 flex justify-self-end justify-between items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center  gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {chapters?.length} {chapters?.length === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>

            <Badge className="bg-blue-700">
              {formatNumber(enrollments)} Joined
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard
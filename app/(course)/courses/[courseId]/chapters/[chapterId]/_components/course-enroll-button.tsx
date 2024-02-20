"use client";
import { Button } from "@/components/ui/button";
import { useEnrollCourseMutation } from "@/redux/features/courses/courseApiSlice"
import { selectUser } from "@/redux/features/user/userSlice";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CourseEnrollButton = ({courseId}: {
    courseId: number,
}) => {
    const user = useAppSelector(selectUser);
    const [enrollCourse] = useEnrollCourseMutation();
    const router = useRouter();

    const onClick = async () => {
        if(!user){
            toast.error("Please sign-in to enroll into your course.")
            return;
        }
        toast.promise(
            enrollCourse(courseId).unwrap(),
            {
                loading: 'Enrolling into course...',
                success: (data) => {
                    router.push("/dashboard");
                    return "Course enrolled successfully."
                },
                error: (error) => {
                    console.log("Course enrollment error");
                    console.log(error);
                    return (error.data.detail as string) || "Something went wrong, Try again"
                },
            }
        );
    }
  return (
    <Button
        onClick={onClick}
        size="sm"
        className="w-full md:w-auto"
    >
        Enroll into Course
    </Button>
  )
}

export default CourseEnrollButton
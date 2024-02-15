"use client";

import { Button } from "@/components/ui/button";
import { onOpen } from "@/redux/features/confetti/confettiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CourseProgressButtonParams{
    nextUrl: string;
    isLastChapter: boolean;
}
const CourseProgressButton = ({
    nextUrl,
    isLastChapter
}: CourseProgressButtonParams) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const onClick = async () => {
        setIsLoading(true);
        await dispatch(onOpen());
        router.push(nextUrl);
        setIsLoading(false);
    }

  return (
    <Button
        onClick={onClick}
        disabled={isLoading}
        type="button"
        className="w-full md:w-auto"
    >
        {isLastChapter ? "Finish Course" : "Complete chapter"}
    </Button>
  )
}

export default CourseProgressButton
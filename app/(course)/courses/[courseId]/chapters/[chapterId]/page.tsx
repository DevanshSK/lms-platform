"use client";

import { Banner } from "@/components/banner";
import { Preview } from "@/components/preview";
import { Separator } from "@/components/ui/separator";
import { useGetCoursesChaptersQuery, useGetSingleChapterQuery } from "@/redux/features/chapters/chapterApiSlice";
import { useGetEnrollmentsQuery } from "@/redux/features/user/userApiSlice";
import { selectUser } from "@/redux/features/user/userSlice";
import { useAppSelector } from "@/redux/hooks";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/video-player";
import { File } from "lucide-react";


const ChapterIdPage = ({ params }: {
    params: { courseId: number; chapterId: number };
}) => {
    const {data: chapters = [], isLoading: isChaptersLoading} = useGetCoursesChaptersQuery(params.courseId);
    const {data: enrollments=[], isLoading: isEnrollmentLoading} = useGetEnrollmentsQuery();
    const user = useAppSelector(selectUser);

    if (isChaptersLoading || isEnrollmentLoading) {
        return <p className='text-center p-5 animate-pulse font-semibold'>Hang on tight, this may take a while....</p>
    }

    if(!user || !chapters){
        redirect('/dashboard/search');
    }

    const isEnrolled = enrollments.some(enrollment => {
        return +enrollment.course_id === +params.courseId;
    });

    const sortedChapters = chapters.toSorted((a,b) => a.chapter_no - b.chapter_no);
    const currentChapterIndex = sortedChapters.findIndex(c => +c.id === +params.chapterId);
    const currentChapter = sortedChapters[currentChapterIndex]
    const nextChapterIndex = currentChapterIndex + 1 < sortedChapters.length ? currentChapterIndex+1 : 0;
    const isLastChapter = currentChapterIndex+1 < sortedChapters.length;

    console.log("Current Chapter",currentChapterIndex);
    console.log("Current Chapter",currentChapter);
    console.log("Next chapter ",nextChapterIndex);

    return (
        <div>
        {!isEnrolled && (
          <Banner
            variant="warning"
            label="You need to enroll into this course to watch this chapter."
          />
        )}
        <div className="flex flex-col max-w-4xl mx-auto pb-20">
          <div className="p-4">
            <VideoPlayer
              chapterId={params.chapterId}
              title={currentChapter.title}
              courseId={params.courseId}
              nextChapterId={sortedChapters[nextChapterIndex].id}
              isLocked={!isEnrolled}
              videoUrl={currentChapter.video_url}
            />
          </div>
          <div>
            <div className="p-4 flex flex-col md:flex-row items-center justify-between">
              <h2 className="text-2xl font-semibold mb-2">
                {currentChapter.title}
              </h2>
              {/* {purchase ? (
                <CourseProgressButton
                  chapterId={params.chapterId}
                  courseId={params.courseId}
                  nextChapterId={nextChapter?.id}
                  isCompleted={!!userProgress?.isCompleted}
                />
              ) : (
                <CourseEnrollButton
                  courseId={params.courseId}
                  price={course.price!}
                />
              )} */}
            </div>
            <Separator />
            <div>
              <Preview value={currentChapter.description!} />
            </div>
            {!!currentChapter.resource_url && (
              <>
                <Separator />
                <div className="p-4">
                  {
                    <a 
                      href={currentChapter.resource_url}
                      target="_blank"
                      key={currentChapter.id}
                      className="flex items-center p-3 w-full bg-blue-200 border text-blue-700 rounded-md hover:underline"
                    >
                      <File />
                      <p className="line-clamp-1">
                        {currentChapter.title} Attachment
                      </p>
                    </a>
                  }
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )
}

export default ChapterIdPage
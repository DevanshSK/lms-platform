import React from 'react'
import CourseSkeletonCard from './CourseSkeletonCard'
import { Separator } from '../ui/separator'
import { Skeleton } from '../ui/skeleton'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

const CourseSkeleton = () => {
    return (
        <div className='container mb-16 '>
            <div className="px-6 pt-3 md:mb-0 block">
                <Skeleton className='w-full h-10 md:w-[300px] pl-9 rounded-full' />
            </div>
            <div className='p-6'>
                <ScrollArea>
                    <div className='flex mb-2 items-center gap-x-2 overflow-x-auto pb-2'>
                        <Skeleton className='h-8 w-24 rounded-full' />
                        <Skeleton className='h-8 w-32 rounded-full' />
                        <Skeleton className='h-8 w-20 rounded-full' />
                        <Skeleton className='h-8 w-24 rounded-full' />
                    </div>
                    <ScrollBar orientation='horizontal' />
                </ScrollArea>

                <div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4'>
                    <CourseSkeletonCard />
                    <CourseSkeletonCard />
                    <CourseSkeletonCard />
                    <CourseSkeletonCard />
                    <CourseSkeletonCard />
                    <CourseSkeletonCard />
                    <CourseSkeletonCard />
                    <CourseSkeletonCard />
                </div>
            </div>
            <Separator className='mb-5 mt-10' />
        </div>
    )
}

export default CourseSkeleton
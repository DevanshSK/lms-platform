import React from 'react'
import { Skeleton } from '../ui/skeleton'

const CourseSkeletonCard = () => {
    return (
        <div className='group hover:shadow-md shadow-sm transition border rounded-lg w-full h-full max-w-md mx-auto overflow-hidden'>
            <div className='w-full aspect-video overflow-hidden'>
                <Skeleton className='w-full h-full' />
            </div>
            <div className='flex flex-col m-3'>
                <Skeleton className='mt-2 w-2/3 h-5' />
                <Skeleton className='mt-2 w-1/3 h-3' />
                <Skeleton className='mt-2 w-full h-3' />
                <Skeleton className='mt-2 w-full h-3' />
                <div className="mt-2 flex items-center justify-between">
                    <Skeleton className='h-5 w-1/3' />
                    <Skeleton className='h-5 w-1/3' />
                </div>
            </div>
        </div>
    )
}

export default CourseSkeletonCard
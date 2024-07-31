"use client";
import { useGetCategoriesQuery } from '@/redux/features/category/categoryApiSlice';
import React, { useEffect } from 'react'
import Categories from '@/components/categories';
import SearchInput from '@/components/search-input';
import { useSearchParams } from 'next/navigation';
import { useGetAllCoursesWithParamsQuery } from '@/redux/features/courses/courseApiSlice';
import CoursesList from '@/components/courses-list';
import { Separator } from '@/components/ui/separator';
import CourseSkeleton from '@/components/skeletons/CourseSkeleton';
import PaginationForm from '@/components/pagination-form';



const SearchPage = () => {
    const params = useSearchParams();

    const title =  params.get('title') || "";
    const page = params.get("page") ? Number(params.get('page')) : 1;
    const categoryId =  params.get('categoryId') ? Number(params.get("categoryId")) : undefined;
    console.log(title, categoryId, page);
    // console.log(searchParams.title, searchParams.categoryId)
    const { data: categories=[], isLoading: isCategoriesLoading, isError, error } = useGetCategoriesQuery();
    const { data: courses = [], isLoading: isCourseLoading, refetch, error: CourseError, isError: isCourseError } = useGetAllCoursesWithParamsQuery({ title: title, categoryId: categoryId, page: page });

    useEffect(() => {
        refetch();
    }, [params, refetch]);

    if (isCourseLoading || isCategoriesLoading) {
        return <CourseSkeleton />
    }
    if (isError || isCourseError) {
        console.log("FETCHING ERROR");
        console.log(error);
        console.log(CourseError);
        
        return <p className='text-center p-5 font-semibold'>Oops, looks like something went wrong....</p>
    }

    return (
        <div className='container mb-16'>
            <div className='px-6 pt-3 md:mb-0 block'>
                <SearchInput />
            </div>
            <div className='p-6'>
                <Categories
                    items={categories}
                />
                <CoursesList
                    items={courses}
                />
            </div>
            <PaginationForm isValid={courses.length === 0} />
            <Separator className='mb-5 mt-10' />
        </div>
    )
}

export default SearchPage
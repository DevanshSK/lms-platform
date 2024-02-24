"use client";

import { useGetCategoriesQuery } from '@/redux/features/category/categoryApiSlice';
import React, { useEffect } from 'react'
import Categories from '@/components/categories';
import SearchInput from '@/components/search-input';
import { useSearchParams } from 'next/navigation';
import { useGetAllCoursesWithParamsQuery } from '@/redux/features/courses/courseApiSlice';
import CoursesList from '@/components/courses-list';
import { useGetEnrollmentsQuery } from '@/redux/features/user/userApiSlice';



const SearchPage = () => {
  const params = useSearchParams();
  const title =  params.get('title') || "";
  const categoryId =  params.get('categoryId') ? Number(params.get("categoryId")) : undefined;
  const { data: categories, isLoading: isCategoriesLoading, isError, error } = useGetCategoriesQuery();
  const { data: courses = [], isLoading: isCourseLoading, refetch, error: CourseError, isError: isCourseError } = useGetAllCoursesWithParamsQuery({ title: title, categoryId: categoryId });
  const { data: enrollments = [], isLoading: isEnrollmentsLoading } = useGetEnrollmentsQuery();

  useEffect(() => {
    refetch();
}, [params, refetch]);

  if (isCourseLoading || isCategoriesLoading || isEnrollmentsLoading) {
    return <p className='text-center p-5 animate-pulse font-semibold'>Hang on tight, this may take a while....</p>
  }
  if (isError) {
    console.log(error);
    return <p className='text-center p-5 font-semibold'>Oops, looks like something went wrong....</p>
  }

  let enrolledCourses = courses.filter(course => {
    return enrollments.some(enrollment => enrollment.course_id === course.id);
  });

  console.log(enrolledCourses)


  return (
    <>
      <div className='px-6 pt-6 md:hidden md:mb-0 block'>
        <SearchInput />
      </div>
      <div className='p-6'>
        <Categories
          items={categories || []}
        />
        <CoursesList
          items={enrolledCourses}
        />
      </div>
    </>
  )
}

export default SearchPage
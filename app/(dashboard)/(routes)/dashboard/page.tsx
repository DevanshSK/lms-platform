"use client";

import { useGetCategoriesQuery } from '@/redux/features/category/categoryApiSlice';
import React from 'react'
import Categories from '@/components/categories';
import SearchInput from '@/components/search-input';
import { useSearchParams } from 'next/navigation';
import { useGetAllCoursesWithParamsQuery } from '@/redux/features/courses/courseApiSlice';
import CoursesList from '@/components/courses-list';
import { useGetEnrollmentsQuery } from '@/redux/features/user/userApiSlice';

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: number;
  }
}

const SearchPage = ({
  searchParams
}: SearchPageProps) => {
  const params = useSearchParams();
  const { data: categories, isLoading: isCategoriesLoading, isError, error } = useGetCategoriesQuery();
  const { data: courses = [], isLoading: isCourseLoading } = useGetAllCoursesWithParamsQuery({ title: searchParams.title, categoryId: searchParams.categoryId });
  const { data: enrollments = [], isLoading: isEnrollmentsLoading } = useGetEnrollmentsQuery();


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
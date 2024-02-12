"use client";

import { useGetCategoriesQuery } from '@/redux/features/category/categoryApiSlice';
import React from 'react'
import Categories from './_components/categories';

const SearchPage = () => {
    
    const { data: categories, isLoading, isError, error } = useGetCategoriesQuery();

    if(isLoading){
        return <p className='text-center p-5 animate-pulse font-semibold'>Hang on tight, this may take a while....</p>
    }
    if(isError){
        return <p className='text-center p-5 font-semibold'>Oops, looks like something went wrong....</p>
    }

  return (
    <div className='p-6'>
        <Categories 
            items={categories || []}
        />
    </div>
  )
}

export default SearchPage
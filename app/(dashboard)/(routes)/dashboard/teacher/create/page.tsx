"use client"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

import toast from 'react-hot-toast';
import useCreateCourse from '@/hooks/courses/useCreateCourse';
import { useGetCategoriesQuery } from '@/redux/features/category/categoryApiSlice';
import { Combobox } from '@/components/ui/combobox';


const CreatePage = () => {
    const { data, isLoading, isError } = useGetCategoriesQuery();
    const { form, onSubmit } = useCreateCourse(); 

    if(isLoading){
        return (
            <p className='text-center p-5 animate-pulse font-semibold'>Loading....</p>
        )
    }
    const categories = data?.map( category => ({
        label: category.cate_name, value: category.id
    }));
    

    const { isSubmitting, isValid } = form.formState;

    return (
        <div className='max-w-5xl mx-auto flex md:items-center md:justify-center min-h-full p-6'>
            <div>
                <h1 className='text-2xl font-semibold'>Name your course</h1>
                <p className='text-sm text-slate-600'>What would you like to name your course? Don&apos;t worry you can change this later.</p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 mt-8'>
                        <FormField control={form.control} name='title' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Course Title</FormLabel>
                                <FormControl>
                                    <Input disabled={isSubmitting} placeholder="e.g. 'Advanced Web Development' " {...field} />
                                </FormControl>
                                <FormDescription>What will you teach in this course?</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name='description' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Course Description</FormLabel>
                                <FormControl>
                                    <Input disabled={isSubmitting} placeholder="e.g. 'Enter course description' " {...field} />
                                </FormControl>
                                <FormDescription>Give some details about the course?</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name='teacher' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Course Teacher</FormLabel>
                                <FormControl>
                                    <Input disabled={isSubmitting} placeholder="e.g. 'Enter course description' " {...field} />
                                </FormControl>
                                <FormDescription>What is the name of instructor?</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name='code' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Course Code</FormLabel>
                                <FormControl>
                                    <Input disabled={isSubmitting} placeholder="e.g. 'Web-501' " {...field} />
                                </FormControl>
                                <FormDescription>Enter course code for easy access?</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name='category' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Course Category</FormLabel>
                                <FormControl>
                                    {/* <Input type='number' disabled={isSubmitting} placeholder="e.g. 'Enter course category id' " {...field} /> */}
                                    <Combobox options={categories || []} {...field} />
                                </FormControl>
                                <FormDescription>Which category does the course belong?</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <div className='flex items-center gap-x-2'>
                            <Link href="/">
                                <Button type='button' variant="ghost">Cancel</Button>
                            </Link>
                            <Button type='submit' disabled={ isSubmitting}>Continue</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default CreatePage;
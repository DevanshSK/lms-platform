"use client"

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

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
import useCreateCategory from '@/hooks/category/useCreateCategory';

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    })
})

const CreateCategoryPage = () => {
    const {form, onSubmit} = useCreateCategory();

    const { isSubmitting, isValid } = form.formState;

    return (
        <div className='max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6'>
            <div>
                <h1 className='text-2xl font-semibold'>Enter category name</h1>
                <p className='text-sm text-slate-600'>Enter the name of category.</p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-8'>
                        <FormField control={form.control} name='title' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category Title</FormLabel>
                                <FormControl>
                                    <Input disabled={isSubmitting} placeholder="e.g. 'Engineering' " {...field} />
                                </FormControl>
                                <FormDescription>What will you name this category?</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <div className='flex items-center gap-x-2'>
                            <Link href="/">
                                <Button type='button' variant="ghost">Cancel</Button>
                            </Link>
                            <Button type='submit' disabled={!isValid || isSubmitting}>Continue</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default CreateCategoryPage;
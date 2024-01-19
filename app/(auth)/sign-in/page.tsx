"use client";
import { Button } from '@/components/ui/button'
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useLogin } from '@/hooks';

// Shadcn ui form
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useEffect } from 'react';


const SignInPage = () => {
  const { isLoading, form, onSubmit } = useLogin();

    useEffect(() => {
      if(form.formState.isSubmitSuccessful){
        form.reset();
      }
    }, [form]);

  return (
    <Card className='w-[350px] shadow-lg'>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>to continue to our lms.</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid w-full items-center gap-4'>
              <div className="flex flex-col space-y-1.5">
                <FormField control={form.control} name="email" render={({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter your email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className="flex flex-col space-y-1.5">
              <FormField control={form.control} name="password" render={({field}) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter your password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <Button disabled={isLoading} type='submit'>Sign In</Button>
              <div className="flex items-center gap-2 justify-center">
                <span className='text-sm'>Don&apos;t have an account?</span>
                <Link href='/sign-up' className='text-sm font-bold hover:underline'>Sign Up</Link>

              </div>

            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SignInPage
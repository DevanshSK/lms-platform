"use client";
import { useEffect } from 'react';
import Link from 'next/link';
import { useRegister } from '@/hooks';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Button } from '@/components/ui/button';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SignUpPage = () => {
  const { isLoading, form, onSubmit } = useRegister();
  const { isValid, isSubmitSuccessful } = form.formState;

  useEffect(() => {
    if (isSubmitSuccessful) {
      form.reset();
    }
  }, [form, isSubmitSuccessful]);


  return (
    <Card className='w-[350px] shadow-lg'>
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>to continue to our lms.</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid w-full items-center gap-4'>
              <div className="flex flex-col space-y-1.5">
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} placeholder='e.g. john@doe.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="flex flex-col space-y-1.5">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} placeholder='e.g. John Doe' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="flex flex-col space-y-1.5">
                <FormField control={form.control} name="education" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Education</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} placeholder='e.g. PHD in Networking' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="flex flex-col space-y-1.5">
                <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passowrd</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} type='password' placeholder='Enter your password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="flex flex-col space-y-1.5">
                <FormField control={form.control} name="repassword" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} type='password' placeholder='Confirm your password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <Button disabled={isLoading} type='submit'>Sign In</Button>
              <div className="flex items-center gap-2 justify-center">
                <span className='text-sm'>Have an account?</span>
                <Link href='/sign-in' className='text-sm font-bold hover:underline'>Sign In</Link>

              </div>

            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SignUpPage
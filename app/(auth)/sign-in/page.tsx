"use client";
import {useState} from 'react'
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button'
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

const SignInPage = () => {
  
  return (
    <Card className='w-[350px] shadow-lg'>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>to continue to our lms.</CardDescription>
      </CardHeader>

      <CardContent>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor='email'>Email Address</Label>
              <Input id='email' type='email' placeholder='Enter your email'></Input>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor='password'>Password</Label>
              <Input id='password' type='password' placeholder='Enter your password'></Input>
            </div>

            <Button>Sign In</Button>
            <div className="flex items-center gap-2 justify-center">
              <span className='text-sm'>Don&apos;t have an account?</span>
              <Link href='/sign-up' className='text-sm font-bold hover:underline'>Sign Up</Link>

            </div>

          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default SignInPage
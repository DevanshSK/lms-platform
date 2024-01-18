"use client";
import { Button } from '@/components/ui/button'
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useLogin } from '@/hooks';

// React hook form
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

// Shadcn ui form
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

// React hook form schema
const loginSchema = object({
  email: string().min(1, "Email is required")
    .email("Email address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(5, "Password must be more than 5 characters"),
})
// Export login schema type
export type LoginInput = TypeOf<typeof loginSchema>;

const SignInPage = () => {
  const { isLoading, form, onSubmit } = useLogin();

  // const form = useForm<LoginInput>({
  //   resolver: zodResolver(loginSchema),
  //   defaultValues: {
  //     email: "",
  //     password: ""
  //   }
  // })

  // function onSubmit(values: LoginInput) {
  //   handleLogin(values);
  // }

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

  // return (
  //   <Card className='w-[350px] shadow-lg'>
  //     <CardHeader>
  //       <CardTitle>Sign in</CardTitle>
  //       <CardDescription>to continue to our lms.</CardDescription>
  //     </CardHeader>

  //     <CardContent>
  //       <form onSubmit={onSubmit}>
  //         <div className='grid w-full items-center gap-4'>
  //           <div className="flex flex-col space-y-1.5">
  //             <Label htmlFor='email'>Email Address</Label>
  //             <Input id='email' value={email} onChange={onChange} name='email' type='email' placeholder='Enter your email'></Input>
  //           </div>
  //           <div className="flex flex-col space-y-1.5">
  //             <Label htmlFor='password'>Password</Label>
  //             <Input id='password' name='password' value={password} onChange={onChange} type='password' placeholder='Enter your password'></Input>
  //           </div>

  //           <Button type='submit'>Sign In</Button>
  //           <div className="flex items-center gap-2 justify-center">
  //             <span className='text-sm'>Don&apos;t have an account?</span>
  //             <Link href='/sign-up' className='text-sm font-bold hover:underline'>Sign Up</Link>

  //           </div>

  //         </div>
  //       </form>
  //     </CardContent>
  //   </Card>
  // )
}

export default SignInPage
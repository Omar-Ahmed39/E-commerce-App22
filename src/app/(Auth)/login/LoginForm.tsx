"use client"
import React, { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '_/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from "_/components/ui/input"
import { schema } from './Login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginBodyType } from './schema.type';
import Link from 'next/link';
import { signIn } from "next-auth/react"
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


export default function LoginForm() {

    const [isLoading, setisLoading] = useState(false)
    const route = useRouter()

    async function login(data: LoginBodyType) {
        setisLoading(true);
        const res = await signIn('credentials', { ...data, redirect: false })
        if (res?.ok) {

            toast.success('Welcome')
            setisLoading(false);
            route.push('/')
        } else {
            toast.error('Incorrect email or passowrd')
            setisLoading(false);

        }
    }

    const RHFObj = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur'

    });
    const { control, handleSubmit } = RHFObj;
    return (
        <Form {...RHFObj} >
            <form className=' flex flex-col gap-4.5' onSubmit={handleSubmit(login)}>

                <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel >
                                Email
                            </FormLabel>
                            <FormControl>
                                { /* Your form field */}
                                <Input type='email' {...field} />
                            </FormControl>
                            <FormMessage className='p-5 bg-red-200 rounded-lg border-1 border-red-600 font-semibold' />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel >
                                Password
                            </FormLabel>
                            <FormControl>
                                { /* Your form field */}
                                <Input type='password' {...field} />
                            </FormControl>
                            <FormMessage className='p-5 bg-red-200 rounded-lg border-1 border-red-600 font-semibold' />
                        </FormItem>
                    )}
                />
                <Link href='/forgetpass' className='text-[#1F2B4C] font-semibold'>Forgot password?</Link>

                <button className='bg-[#FC7732] hover:bg-[#f95f12] duration-300 cursor-pointer p-3 md:w-full md:ms-auto rounded-lg text-xl text-white font-semibold'>{isLoading ? <i className="fa fa-spinner fa-spin text-3xl text-white" ></i> : 'Login'}</button>
                <p className='text-[#1F2B4C] font-semibold'>Don&apos;t have an account?<Link href='/register' className='font-bold'> Register</Link></p>
            </form>

        </Form>
    )
}

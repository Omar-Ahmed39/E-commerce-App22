"use client"
import React, { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '_/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from "_/components/ui/input"
import { schema } from './Register.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { setDataRegister } from './Register.action';
import { RegisterBodyType } from './schema.type';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterForm() {
    const [isLoading, setisLoading] = useState(false)
    const route = useRouter()

    async function setSubmit(data: RegisterBodyType) {
        setisLoading(true)
        const res = await setDataRegister(data)

        if (res === true) {
            toast.success('Welcome')
            setisLoading(false)
            route.push('/login')

        } else {
            toast.error(`${res}`)
            setisLoading(false);
        }
    }

    const RHFObj = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',
        },
        mode: 'onBlur'

    });
    const { control, handleSubmit } = RHFObj;
    return (
        <Form {...RHFObj} >
            <form className=' flex flex-col gap-4.5' onSubmit={handleSubmit(setSubmit)}>
                <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input type='text' {...field} />
                            </FormControl>
                            <FormMessage className='p-5 bg-red-200 rounded-lg border-1 border-red-600 font-semibold' />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
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
                            <FormLabel>
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

                <FormField
                    control={control}
                    name="rePassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Confirm Password
                            </FormLabel>
                            <FormControl>
                                { /* Your form field */}
                                <Input type='password' {...field} />
                            </FormControl>
                            <FormMessage className='p-5 bg-red-200 rounded-lg border-1 border-red-600 font-semibold' />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Phone
                            </FormLabel>
                            <FormControl>
                                { /* Your form field */}
                                <Input type='tel' {...field} />
                            </FormControl>
                            <FormMessage className='p-5 bg-red-200 rounded-lg border-1 border-red-600 font-semibold' />
                        </FormItem>
                    )}
                />
                <button className='bg-[#FC7732] hover:bg-[#f95f12] duration-300 cursor-pointer p-3 md:w-full md:ms-auto rounded-lg text-xl text-white font-semibold'>{isLoading ? <i className="fa fa-spinner fa-spin text-3xl text-white" ></i> : 'Register Now'}</button>
                <p className='text-[#1F2B4C] font-semibold'>Have an account?<Link href='/login' className='font-bold'> Log In</Link></p>

            </form>

        </Form>
    )
}

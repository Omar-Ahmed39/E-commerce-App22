"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '_/components/ui/form';
import { Input } from '_/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod'
import { sendVerfiy } from './forgetPass.action';
import toast from 'react-hot-toast';
import Link from 'next/link';



export const schema = zod.object({
    email: zod.email('email pattern is inavalid').nonempty('email is required'),
})


export const metadata = {
    title: 'Login',
};


export default function ForgetPassword() {

    const [isLoading, setisLoading] = useState(false)
    async function forgetPassword(data: { email: string }) {
        setisLoading(true);
        const res = await sendVerfiy(data.email)
        if (res) {
            setisLoading(false);
            toast.success(res)
        } else {
            setisLoading(false);
            toast.error('There is no user registered with this email address')
        }
    }

    const RHFObj = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
        },
        mode: 'onBlur'
    })

    const { control, handleSubmit } = RHFObj;

    return (


        <Form {...RHFObj} >
            <form className=' flex flex-col gap-4.5' onSubmit={handleSubmit(forgetPassword)}>
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
                <button className='bg-[#FC7732] hover:bg-[#f95f12] duration-300 cursor-pointer p-3 w-full  md:ms-auto rounded-lg text-xl text-white font-semibold'>{isLoading ? <i className="fa fa-spinner fa-spin text-3xl text-white" ></i> : 'Verify'}</button>
                <Link href='/login' className='text-[#1F2B4C] font-semibold'>Back to log In</Link>
                
            </form>

        </Form>


    )
}

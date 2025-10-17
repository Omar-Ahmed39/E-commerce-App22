"use client"
import { Input } from '_/components/ui/input'
import logo from "_/assets/Images/8b8093fe-18e4-471e-b2e8-1c89881894fd.png";
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '_/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkOut } from './Payment.action';
import { getAddedProduct } from '_/app/_Services/CartService';
import toast from 'react-hot-toast';
import { cartContext } from '../CartContextProvider';
import { useRouter } from 'next/navigation';
import * as zod from 'zod'




export type PaymentType = {
    detalis: string,
    phone: string,
    city: string
}




const schema = zod.object({
    detalis: zod.string(),
    phone: zod.string().nonempty('phone number is required').regex(/^01[0125][0-9]{8}$/, 'invalid Phone'),
    city: zod.string().nonempty('city address is required'),
})

export default function Payment() {
    const [cartId, setcartId] = useState<string | undefined>(undefined)
    const [isLoading, setisLoading] = useState(false)
    const { updateCartCount } = useContext(cartContext)
    const router = useRouter()



    async function handleGetCartId() {
        const res = await getAddedProduct()
        setcartId(res?.cartId)
    }
    useEffect(() => {
        handleGetCartId()
    }, [])

    const RHFObj = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            detalis: '',
            phone: '',
            city: '',
        },
        mode: 'onBlur'

    });
    const { control, handleSubmit } = RHFObj;

    async function handleCheckout(data: PaymentType) {
        setisLoading(true)
        const res = await checkOut(cartId || '', data)
        if (res) {
            toast.success('Order Created Successful');
            updateCartCount(0);
            setisLoading(false)
            router.push('/cart/allorders')
        } else {
            toast.error('An error occurred')
            setisLoading(false)
        }
    }
    return (
        <div className='container mx-auto py-10'>
            <Image src={logo} alt='trendify' className='w-60 mx-auto mb-5' />
            <Form {...RHFObj} >
                <form className=' flex flex-col  bg-white p-5 rounded-2xl gap-4.5' onSubmit={handleSubmit(handleCheckout)} >
                    <h1 className='text-4xl font-semibold text-[#1F2B4C] border-b-2 w-fit pb-2'>Checkout</h1>
                    <FormField
                        control={control}
                        name="detalis"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder='Details' className='p-5' {...field} />
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
                                <FormControl>
                                    <Input placeholder='Phone number' className='p-5' type='tel' {...field} />
                                </FormControl>
                                <FormMessage className='p-5 bg-red-200 rounded-lg border-1 border-red-600 font-semibold' />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder='City' className='p-5' {...field} />
                                </FormControl>
                                <FormMessage className='p-5 bg-red-200 rounded-lg border-1 border-red-600 font-semibold' />
                            </FormItem>
                        )}
                    />
                    <button type='submit' className='text-green-400 border-2 border-green-400 text-2xl  p-2 font-semibold rounded-xl cursor-pointer hover:text-white hover:bg-green-400 duration-300'>{isLoading ? <i className="fa fa-spinner fa-spin text-3xl text-green-400" ></i> : 'Confirm Payment'}</button>
                </form>
            </Form>

        </div>
    )
}

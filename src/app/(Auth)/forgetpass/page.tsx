import Image from 'next/image'
import React from 'react'
import logo from "_/assets/Images/8b8093fe-18e4-471e-b2e8-1c89881894fd.png";
import ForgetPassword from './ForgetPass';


export const metadata = {
    title: 'Forget Password',
};


export default function page() {
    
    return (
        <div className='register container mx-auto py-10 '>
            <Image src={logo} alt='trendify' className='w-60 mx-auto mb-5' />
            <div className='p-7 rounded-2xl shadow-sm bg-white'>
                <h1 className=' text-4xl font-semibold text-[#1F2B4C] mb-6 pb-3 border-b-2 w-fit'>please enter your verification code</h1>

                <ForgetPassword />


            </div>
        </div >
    )
}

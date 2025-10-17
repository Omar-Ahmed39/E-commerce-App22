import Image from 'next/image'
import React from 'react'
import logo from "_/assets/Images/8b8093fe-18e4-471e-b2e8-1c89881894fd.png";
import RegisterForm from './RegisterForm';



export const metadata = {
    title: 'Register',
};


export default function Register() {


    return (
        <div className='register container mx-auto py-10'>
            <Image src={logo} alt='trendify' className='w-60 mx-auto mb-5' />
            <div className='p-7 rounded-2xl shadow-sm bg-white'>
                <h1 className=' text-4xl font-semibold text-[#1F2B4C] mb-6 pb-3 border-b-2 w-fit'>Register Now</h1>

                <RegisterForm/>

            </div>
        </div >
    )
}

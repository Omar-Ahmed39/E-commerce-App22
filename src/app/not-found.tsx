import React from 'react'
import error from "_/assets/Images/error.png";
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className='container mx-auto py-10'>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className='flex flex-col gap-2 justify-center text-center'>
                    <h1 className='text-9xl font-semibold'>404</h1>
                    <p className='text-5xl font-semibold'>Page Not Found</p>
                    <p className=' text-xl text-gray-500'>Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
                </div>
                <div>
                    <Image src={error} alt='404 error' />
                </div>
            </div>
            <Link href='/' className='text-white text-2xl font-semibold bg-[#FC7732] cursor-pointer p-3 rounded-xl block mx-auto w-fit hover:bg-[#f7661d] duration-400'> Back To Home</Link>
        </div>
    )
}

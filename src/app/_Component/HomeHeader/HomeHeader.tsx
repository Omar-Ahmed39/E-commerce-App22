import Link from 'next/link'
import React from 'react'
import StaticSwiper from '../MySwiper/StaticSwiper/StaticSwiper'

export default function HomeHeader() {
    return (
        <div className='bg-gradient-to-r from-[#1F3155] to-[#0F8196] py-10 '>
            <div className="grid  grid-cols-1 md:grid-cols-2 container mx-auto p-4 gap-4 flex  justify-between items-center">
                <div>
                    <p className='font-semibold  text-5xl mx-auto text-white text-center md:text-left md:mx-0 md:w-90 mb-5'>Discover the Latest Fashion Trends</p>
                    <Link href='products' className='bg-[#FC7732] block w-fit mx-auto md:mx-0 text-white font-semibold py-4 px-8 rounded-lg duration-300 hover:bg-[#f1611a] cursor-pointer'>Shop Now</Link>
                </div>
                <div>
                    <StaticSwiper/>
                </div>
            </div>

        </div>
    )
}

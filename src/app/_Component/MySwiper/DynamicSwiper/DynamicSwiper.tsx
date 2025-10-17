import React from 'react'
import MySwiper from '../MySwiper';
import { getAllCategories } from '_/app/_Services/Categoryservice';

export default async function DynamicSwiper() {

    

    const categories = await getAllCategories()
    return (
        <div className='py-10'>

            <div className=' md:hidden'>

                <MySwiper categories={categories?.map(src => src)} slidesPerView={2} spaceBetween={0} />

            </div>

            <div className=' hidden md:block lg:hidden'>

                <MySwiper categories={categories?.map(src => src)} slidesPerView={4} spaceBetween={0} />

            </div>
            <div className=' hidden lg:block'>

                <MySwiper categories={categories?.map(src => src)} slidesPerView={6} spaceBetween={0} />

            </div>


        </div>
    )

}




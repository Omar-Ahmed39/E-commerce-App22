
import React from 'react'
import { getAllCategories } from '../_Services/Categoryservice';

export const metadata = {
    title: 'Categories',
};

export default async function Categories() {

    const categories = await getAllCategories();
    return (
        <div className='categories py-10 container mx-auto'>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
                {categories?.map(cate => <div key={cate._id} className='border-2 rounded-xl overflow-hidden hover:shadow-[0px_0px_20px_#1F2B4C] duration-500'>
                    <div className=''>
                        <img src={cate.image} alt={cate.name} className='w-full h-[400px] object-cover' />
                    </div>
                    <div>
                        <h2 className='text-center p-5 text-3xl text-[#1F2B4C] font-semibold bg-white'>{cate.name}</h2>
                    </div>

                </div>
                )}

            </div>
        </div>
    )
}

import React from 'react'
import { getAllBrands } from '../_Services/brandService';
export const metadata = {
    title: 'Brands',
};

export default async function page() {

    const allBrands = await getAllBrands();

    return (
        <div className='btands py-10 container mx-auto'>
            <h1 className='text-4xl text-center text-[#1F2B4C] font-bold'>All Brands</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
                {allBrands?.map(brand => <div key={brand._id} className='border-2 rounded-xl overflow-hidden hover:shadow-[0px_0px_20px_#1F2B4C] duration-500 '>
                    <div>
                        <img src={brand.image} alt={brand.name} className='w-full' />
                    </div>
                    <div className='bg-white'>
                        <h2 className='text-center text-black py-3'>{brand.name}</h2>
                    </div>
                </div>)}
            </div>
        </div>
    )
}

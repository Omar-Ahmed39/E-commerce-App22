import React from 'react'
import { getWishListItems } from './WishList.action';
import AddToCartBtn from '../_Component/AddToCart/AddToCartBtn';
import RemoveFromWishList from './RemoveFromWishList';
import Head from 'next/head';

export const metadata = {
    title: 'Wish List',
};


export default async function WishList() {

    const items = await getWishListItems()
    return (
        <div className='cart container mx-auto py-10'>
            <Head>
                <title>WishList</title>
            </Head>
            <div className='flex flex-col gap-5 p-10 rounded-2xl shadow-sm bg-white'>
                <div className='flex justify-between'>
                    <h1 className='text-[#1F2B4C] text-3xl font-semibold'>My Wish List</h1>
                </div>
                {items?.map(item => <div key={item.id} className='grid grid-cols-1 gap-6 md:grid-cols-5  lg:grid-cols-6 border-b-2 pb-2'>
                    <div className='md:col-span-1  lg:col-span-1'>
                        <img src={item.imageCover} alt={item.title} className='w-full' />
                    </div>
                    <div className='flex justify-between items-center md:col-span-4 lg:col-span-5'>
                        <div>
                            <h2 className='font-semibold text-xl mb-1 text-[#1F2B4C]'>{item.title.split(' ', 2).join(' ')}</h2>
                            <p className='text-lg font-semibold mb-1 text-gray-600'>${item.price}</p>
                            <RemoveFromWishList itemId={item.id} />
                        </div>
                        <div>
                            <AddToCartBtn prodId={item.id} />
                            {/* <button className='p-3 rounded-lg bg-[#FC7732] hover:bg-[#f7661d] duration-400 text-xl font-semibold cursor-pointer text-white'>Add to cart</button> */}
                        </div>
                    </div>
                </div>)}

            </div>
        </div>
    )
}

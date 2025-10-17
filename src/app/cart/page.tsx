import React from 'react'
import { getAddedProduct } from '../_Services/CartService';
import RemoveItemBtn from './RemoveItemBtn';
import ClearUserCart from './ClearUserCart';
import ChangeCountBtn from './ChangeCountBtn';
import Link from 'next/link';

export const metadata = {
    title: 'Cart',
};

export default async function page() {

    const item = await getAddedProduct()

    return (
        <div className='cart container mx-auto py-10'>
            <div className='flex flex-col gap-5 p-10 rounded-2xl shadow-sm bg-white'>
                {item?.numOfCartItems == 0 ? <>
                    <h1 className='text-[#1F2B4C] text-3xl mb-5 font-semibold'>Cart Shop</h1>
                    <p className='text-[#1F2B4C] text-3xl font-semibold'>Your Cart Is Empty</p>
                </> : <>

                    <div className='flex justify-between'>
                        <h1 className='text-[#1F2B4C] text-3xl font-semibold'>Cart Shop</h1>
                        <Link href='/cart/payment' className='p-3 text-white bg-[#FC7732] font-semibold text-xl cursor-pointer hover:bg-[#f7661d] duration-400 rounded-lg'>Check Out</Link>
                    </div>
                    <div className='flex justify-between'>

                        <h5 className='text-xl font-semibold'>total price: <span className='text-[#FC7732]'>${item?.data.totalCartPrice}</span></h5>
                        <h5 className='text-xl font-semibold'>total number of items: <span className='text-[#FC7732]'>{item?.numOfCartItems}</span></h5>
                    </div>

                    {item?.data.products.map(item =>
                        <div key={item.product.id} className='grid grid-cols-1 gap-6 md:grid-cols-5  lg:grid-cols-6 border-b-2 pb-2'>
                            <div className='md:col-span-1  lg:col-span-1'>
                                <img src={item.product.imageCover} alt={item?.product.title} className='w-full' />
                            </div>
                            <div className='flex justify-between items-center md:col-span-4 lg:col-span-5'>
                                <div>
                                    <h2 className='font-semibold text-xl mb-1 text-[#1F2B4C]'>{item?.product.title.split(' ', 2).join(' ')}</h2>
                                    <p className='text-lg font-semibold mb-1 text-gray-600'>${item?.price}</p>
                                    <RemoveItemBtn itemId={item.product.id} />
                                </div>
                                <div className=' flex items-center  border-2 p-2 rounded-lg'>
                                    <ChangeCountBtn itemId={item.product.id} newCount={item.count - 1} />
                                    <span className='font-semibold text-xl mx-1.5 text-[#FC7732]'>{item.count}</span>
                                    <ChangeCountBtn itemId={item.product.id} newCount={item.count + 1} isIncrement />
                                </div>
                            </div>
                        </div >
                    )}
                    <ClearUserCart />
                </>}

            </div>




        </div>
    )
}

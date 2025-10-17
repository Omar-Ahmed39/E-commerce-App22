import { getAllProducts } from '_/app/_Services/ProductService';
import Link from 'next/link';
import React from 'react'
import AddToCartBtn from '../AddToCart/AddToCartBtn';
import AddToWishList from '_/app/wishlist/AddToWishList';

export default async function AllProducts() {
    const products = await getAllProducts();

    return (
        <>
            <div className='home container mx-auto p-4'>

                <h1 className='text-3xl font-semibold pb-5 text-[#1F2B4C]'>Featured Products</h1>
                <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-5'>
                    {products?.map(({ imageCover, ratingsAverage, priceAfterDiscount, price, title, id }) => {
                        return <div key={id} className='bg-gray-50 p-5 rounded-2xl hover:shadow-[0px_0px_20px_#1F2B4C] duration-300'>
                            <Link href={`productDetails/${id}`} >
                                <div className='relative'>
                                    <img src={imageCover} alt={title} className='w-full' />
                                    {priceAfterDiscount && <span className='bg-[#1F2B4C] text-white block w-14 text-center absolute top-2 left-2'>{Math.ceil(((price - priceAfterDiscount) / price) * 100)}%</span>}
                                </div>
                                <h4 className='text-[#1F2B4C] font-semibold text-lg py-2'>{title.split(' ', 2).join(' ')}</h4>
                                <div className='flex justify-between pb-2'>
                                    {priceAfterDiscount ? <div>
                                        <span className='font-semibold text-[#FC7732] text-lg mr-2' >${priceAfterDiscount}</span>
                                        <span className='font-semibold text-gray-700 text-sm line-through '>${price}</span>
                                    </div> : <span className='font-semibold text-[#FC7732] text-lg '>${price}</span>}

                                    <span className='text-lg text-[#1F2B4C] font-semibold'><i className='fa fa-star text-yellow-400'></i>{ratingsAverage}</span>
                                </div>
                            </Link>
                            <div className='text-center gap-2 flex justify-around items-center'>
                                <AddToCartBtn prodId={id} />
                                <AddToWishList itemId={id}/>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

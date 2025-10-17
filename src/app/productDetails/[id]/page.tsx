import React from 'react'
import { getProductDetails } from '_/app/_Services/ProductService';
import AddToCartBtn from '_/app/_Component/AddToCart/AddToCartBtn';
import AddToWishList from '_/app/wishlist/AddToWishList';

export const metadata = {
    title: 'Product Details',
};

type ProductPageProps = {
    params: {
        id: string
    }
}

export default async function ProductDetails({ params }: ProductPageProps) {


    const product = await getProductDetails(params.id)

    return (
        <div>
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-6 gap-5 container mx-auto py-15">
                <div className='md:col-span-1 lg:col-span-2'>
                    <img src={product?.imageCover} alt={product?.title} className='w-full' />
                </div>
                <div className='md:col-span-1 lg:col-span-4 flex-col flex gap-2 justify-center '>
                    <h2 className='text-3xl font-semibold text-[#1F2B4C] w-3/4'>{product?.title}</h2>
                    <p className='text-lg font-semibold'><i className="fa-solid fa-star text-yellow-400"></i>{product?.ratingsAverage}</p>
                    {product?.priceAfterDiscount ? <div>
                        <span className='text-[#FC7732] text-2xl font-semibold mr-2' >${product?.priceAfterDiscount}</span>
                        <span className='font-semibold text-gray-700 text-sm line-through '>${product?.price}</span>
                    </div> : <span className='text-[#FC7732] text-2xl font-semibold '>${product?.price}</span>}

                    <p className='text-lg font-semibold'>Quentity : {product?.quantity}</p>
                    <div >
                        <AddToCartBtn prodId={product?.id as string} />
                        <AddToWishList itemId={product?.id as string} isProductdetails />

                    </div>
                    <div className='md:col-span-2 lg:col-span-5 mt-1.5'>
                        <h3 className='font-semibold text-2xl text-[#1F2B4C] mb-1'>Description</h3>
                        <p>{product?.description}</p>
                    </div>
                </div>

            </div>

        </div>
    )
}

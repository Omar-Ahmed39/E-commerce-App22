import React from 'react'
import Image from 'next/image'; // 1. استخدم Image بتاع Next.js عشان الأداء
import type { Metadata } from 'next'; // 2. اعمل import للـ Metadata type
import { getProductDetails } from '_/app/_Services/ProductService';
import AddToCartBtn from '_/app/_Component/AddToCart/AddToCartBtn';
import AddToWishList from '_/app/wishlist/AddToWishList';

// 3. عرّف شكل المنتج عشان تتخلص من أي مشاكل any
interface IProduct {
    _id: string; // أو id حسب الـ API
    title: string;
    imageCover: string;
    ratingsAverage: number;
    price: number;
    priceAfterDiscount?: number;
    quantity: number;
    description: string;
}

// 4. عرّف الـ Props بشكل سليم
type ProductPageProps = {
    params: {
        id: string
    }
}

// 5. عرّف generateMetadata function بنفس الـ Props (ده بيحل مشاكل كتير)
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const product: IProduct | null = await getProductDetails(params.id);
    
    return {
        title: product?.title || 'Product Details',
        description: product?.description || 'Check out the details of this product.',
    }
}

// 6. الـ Page Component نفسه
export default async function ProductDetails({ params }: ProductPageProps) {
    
    // استخدم الـ Interface هنا
    const product: IProduct | null = await getProductDetails(params.id);

    // 7. لازم تتأكد إن المنتج موجود قبل ما تعرضه
    if (!product) {
        return <div className="container mx-auto text-center py-10">Product not found.</div>
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 container mx-auto py-15">
                <div className='md:col-span-1 lg:col-span-2'>
                    {/* استخدم Image component */}
                    <Image src={product.imageCover} alt={product.title} width={500} height={500} className='w-full h-auto' />
                </div>
                <div className='md:col-span-1 lg:col-span-4 flex-col flex gap-2 justify-center '>
                    <h2 className='text-3xl font-semibold text-[#1F2B4C] w-3/4'>{product.title}</h2>
                    <p className='text-lg font-semibold'><i className="fa-solid fa-star text-yellow-400"></i>{product.ratingsAverage}</p>
                    
                    {product.priceAfterDiscount ? (
                        <div>
                            <span className='text-[#FC7732] text-2xl font-semibold mr-2' >${product.priceAfterDiscount}</span>
                            <span className='font-semibold text-gray-700 text-sm line-through '>${product.price}</span>
                        </div>
                    ) : (
                        <span className='text-[#FC7732] text-2xl font-semibold '>${product.price}</span>
                    )}

                    <p className='text-lg font-semibold'>Quantity : {product.quantity}</p>
                    <div>
                        {/* مش محتاجين as string خلاص */}
                        <AddToCartBtn prodId={product._id} />
                        <AddToWishList itemId={product._id} isProductdetails />
                    </div>
                    <div className='md:col-span-2 lg:col-span-5 mt-1.5'>
                        <h3 className='font-semibold text-2xl text-[#1F2B4C] mb-1'>Description</h3>
                        <p>{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
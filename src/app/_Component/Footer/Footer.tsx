"use client"
import React from 'react'
import logo from '_/assets/Images/2a83e717-df05-4a6f-a7d2-cb3677a418bb.png'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'



export default function Footer() {

    const session = useSession()



    return (
        <>{session.data == null ? undefined :
            <div className='bg-[#1F3256] py-5'>
                <div className='max-w-screen-xl mx-auto p-4'>
                    <div className=''>
                        <Image src={logo} alt='trendify' className='w-60 mx-auto mb-10 border-b-2 pb-3' />
                    </div>
                    <div className="grid text-center md:text-left grid-cols-2  md:grid-cols-3 gap-5 border-b-2 pb-2 border-b-gray-500">
                        <div className='text-white'>
                            <h3 className='text-2xl font-bold mb-4 ' > Quick Links</h3>
                            <ul className='flex! flex-col gap-2'>
                                <li><i className="fa-solid fa-house"></i> <Link href='/'>Home</Link></li>
                                <li><i className="fa-solid fa-layer-group"></i> <Link href='/categories'>Categories</Link></li>
                                <li><i className="fa-brands fa-product-hunt"></i> <Link href='/products'>Products</Link></li>
                                <li><i className="fa-solid fa-bag-shopping"></i> <Link href='/brands'>Brands</Link></li>
                                <li><i className="fa-solid fa-heart"></i> <Link href='/wishList'>Wish List</Link></li>
                                <li><i className="fa-solid fa-cart-shopping"></i> <Link href='/cart'>Cart</Link></li>
                            </ul>
                        </div>

                        <div className='text-white'>
                            <h3 className='text-2xl font-bold mb-4 ' >Categories</h3>
                            <ul className='flex! flex-col gap-2'>
                                <li>Electronics</li>
                                <li>Music</li>
                                <li>Men&apos;s Fashion</li>
                                <li>Woman&apos;s Fashion</li>
                                <li>Books</li>
                            </ul>
                        </div>

                        <div className='text-white w-60 md:w-full col-span-2 md:col-auto mx-auto'>
                            <h3 className='text-2xl font-bold mb-4 ' >Stay Update</h3>
                            <form>
                                <input type="text" placeholder='Enter Your Email' className='w-full rounded-xl p-2 mb-3' />
                                <button className='block bg-[#FC7732] text-lg w-full p-2 font-semibold rounded-xl '>Subscribe</button>
                            </form>
                            <ul className='flex! justify-around mt-3'>
                                <li className='w-10 h-10 flex justify-center items-center text-[#1F2B4C] text-xl rounded-full bg-white'><a href="#" target='_blank'> <i className="fa-brands fa-facebook-f"></i></a></li>
                                <li className='w-10 h-10 flex justify-center items-center text-[#1F2B4C] text-xl rounded-full bg-white'><a href="#" target='_blank'> <i className="fa-brands fa-instagram"></i></a></li>
                                <li className='w-10 h-10 flex justify-center items-center text-[#1F2B4C] text-xl rounded-full bg-white'><a href="#" target='_blank'> <i className="fa-brands fa-twitter"></i></a></li>
                                <li className='w-10 h-10 flex justify-center items-center text-[#1F2B4C] text-xl rounded-full bg-white'><a href="#" target='_blank'> <i className="fa-brands fa-tiktok"></i></a></li>
                            </ul>
                        </div>

                    </div>
                    <p className='pt-6  text-center text-white'>© 2025 <Link href='/'>Trendify.</Link> All rights reserved.</p>
                </div>


            </div>}

        </>

    )
}

"use client"
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import logo from "_/assets/Images/2a83e717-df05-4a6f-a7d2-cb3677a418bb.png"
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { cartContext } from '_/app/cart/CartContextProvider';
import { getAddedProduct } from '_/app/_Services/CartService';
import ResetPassword from './ChangePassword/ResetPassword';

export default function Navbar() {
    const path = usePathname()
    const session = useSession()
    const { cartCount } = useContext(cartContext)

    const [initCartCount, setCartCount] = useState<number | undefined>(0)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        getAddedProduct().then(res => {
            return setCartCount(res?.numOfCartItems)
        })
    }, [])

    function handelLogout() {
        signOut({ redirect: true, callbackUrl: '/login' })
    }

    return (
        <>
            {session.data == null ? undefined :
                <nav className="bg-[#1F2B4C] sticky top-0 w-full z-20 start-0 border-b border-gray-600">
                    <div className="container flex flex-wrap items-center justify-between mx-auto p-4">
                        
                        <Link href='/' className="flex-shrink-0">
                            <Image src={logo} alt={'trendify'} className='w-40' />
                        </Link>

                        <div className="flex lg:order-2 space-x-3 lg:space-x-0 rtl:space-x-reverse items-center">
                            <div className='flex items-center'>
                                <div className='pr-3 py-1 relative border-[#FC7732] border-r-2'>
                                    <Link href='/cart'>
                                        <i className={`${path === "/cart" ? "active " : ""} fa fa-shopping-cart text-white text-2xl hover:text-blue-500 duration-150`} aria-hidden="true"></i>
                                        <span className='p-0.5 min-w-5 flex justify-center items-center top-[-5px] right-1 rounded-sm h-5 absolute text-white font-bold bg-[#FC7732]'>{cartCount || initCartCount}</span>
                                    </Link>
                                </div>
                                <span 
                                    onClick={handelLogout} 
                                    className='text-white text-[16px] border-[#FC7732] border-r-2 pr-3 py-1  font-semibold pl-2 cursor-pointer hover:text-blue-500 duration-150'>
                                    Log Out
                                </span>
                                <ResetPassword/>
                            </div>

                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="inline-flex items-center p-0 w-10 h-10 justify-center text-sm rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 text-gray-400 dark:hover:bg-gray-700 focus:ring-gray-600"
                                aria-controls="navbar-sticky"
                                aria-expanded={isOpen}
                            >
                                <span className="sr-only">Open main menu</span>
                                {isOpen ? (
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <div
                            className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 transition-all duration-300 ease-in-out overflow-hidden 
                            ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 lg:opacity-100 lg:max-h-none"}`}
                            id="navbar-sticky"
                        >
                            <ul className="flex flex-col p-4 lg:p-0 mt-4 font-medium border rounded-lg lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 border-gray-700">
                                <li>
                                    <Link href="/" className={`${path === "/" ? "active " : ""} block py-2 px-3 text-white rounded-sm lg:bg-transparent lg:hover:text-blue-500 lg:p-0 duration-150`} aria-current="page">Home</Link>
                                </li>
                                <li>
                                    <Link href="/categories" className={`${path === "/categories" ? "active" : ""} block py-2 px-3 rounded-sm lg:p-0 duration-150 lg:hover:text-blue-500 text-white`}>Categories</Link>
                                </li>
                                <li>
                                    <Link href="/products" className={`${path === "/products" ? "active" : ""} block py-2 px-3 rounded-sm lg:p-0 duration-150 lg:hover:text-blue-500 text-white`}>Products</Link>
                                </li>
                                <li>
                                    <Link href="/brands" className={`${path === "/brands" ? "active" : ""} block py-2 px-3 rounded-sm lg:p-0 duration-150 lg:hover:text-blue-500 text-white`}>Brands</Link>
                                </li>
                                <li>
                                    <Link href="/wishlist" className={`${path === "/wishlist" ? "active" : ""} block py-2 px-3 rounded-sm lg:p-0 duration-150 lg:hover:text-blue-500 text-white`}>Wish List</Link>
                                </li>
                                <li>
                                    <Link href="/cart/allorders" className={`${path === "/cart/allorders" ? "active" : ""} block py-2 px-3 rounded-sm lg:p-0 duration-150 lg:hover:text-blue-500 text-white`}>All Orders</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>}
        </>
    )
}

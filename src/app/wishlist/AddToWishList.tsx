"use client"
import React, { useState } from 'react'
import { AddItem } from './WishList.action'
import toast from 'react-hot-toast'


export default function AddToWishList({ itemId, isProductdetails = false }: { itemId: string, isProductdetails?: boolean }) {

    const [isLoading, setisLoading] = useState(false)
    async function handleAddToWishList() {
        setisLoading(true)
        const res = await AddItem(itemId)
        if (res) {
            setisLoading(false)
            toast.success('added to WishList')
        }
        else {
            setisLoading(false)
            toast.error('An error accurred')
        }
    }


    return (
        <>
            {isProductdetails ? <button onClick={handleAddToWishList} className='w-full p-2 rounded-lg cursor-pointer text-xl font-semibold border-2  border-black hover:bg-black hover:text-white duration-300'>{isLoading ? <i className="fa fa-spinner fa-spin text-2xl text-black" ></i> : 'Add to Wishlist'}</button> : <i onClick={handleAddToWishList} className='fa fa-heart text-2xl cursor-pointer text-[#88411b]'></i>}
        </>
    )
}

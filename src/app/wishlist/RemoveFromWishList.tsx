"use client"
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { deleteItem } from './WishList.action'

export default function RemoveFromWishList({ itemId }: { itemId: string }) {

    const [isLoading, setisLoading] = useState(false)
    async function removeItem() {
        setisLoading(true)
        const res = await deleteItem(itemId)
        if (res) {
            toast.success(res)
            setisLoading(false)

        } else {
            toast.error('An error occurred.')
            setisLoading(false)

        }
    }

    return (
        <p onClick={removeItem} className='cursor-pointer text-red-700'>{isLoading ? <i className="fa fa-spinner fa-spin  text-red-700" ></i> : <i className="fa-solid fa-trash"></i>} Remove</p>
    )
}

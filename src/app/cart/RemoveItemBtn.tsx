"use client"
import React, { useContext, useState } from 'react'
import { deleteItem } from './cart.action'
import toast from 'react-hot-toast'
import { cartContext } from './CartContextProvider'

export default function RemoveItemBtn({ itemId }: { itemId: string }) {

    const [isLoading, setisLoading] = useState(false)

    const { updateCartCount } = useContext(cartContext)

    async function removeItem() {
        setisLoading(true)
        const res = await deleteItem(itemId)
        if (res == null) {
            toast.error('An error occurred.')
            setisLoading(false)
        } else {
            updateCartCount(res);
            toast.success('The product is removed.')
            setisLoading(false)
        }
    }

    return (
        <p onClick={removeItem} className='cursor-pointer text-red-700'>{isLoading ? <i className="fa fa-spinner fa-spin  text-red-700" ></i> : <i className="fa-solid fa-trash"></i>} Remove</p>
    )
}

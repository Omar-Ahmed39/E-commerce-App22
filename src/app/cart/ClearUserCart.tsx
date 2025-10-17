"use client"
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { deleteAllItems } from './cart.action'
import { cartContext } from './CartContextProvider'



export default function ClearUserCart() {
    const [isLoading, setisLoading] = useState(false)
    const router = useRouter()
    const { updateCartCount } = useContext(cartContext)

    async function clearCart() {
        setisLoading(true)
        const res = await deleteAllItems()
        if (res) {
            setisLoading(false)
            updateCartCount(0)
            router.push('/')
        }
    }
    return (
        <button onClick={clearCart} className='p-3 border-2 border-black rounded-lg text-2xl w-60 mx-auto cursor-pointer hover:bg-black hover:text-white duration-400'>{isLoading ? <i className="fa fa-spinner fa-spin text-3xl text-black" ></i> : 'Clear Your Cart'}</button>
    )
}

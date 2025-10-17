"use client"
import React, { useContext, useState } from 'react'
import { AddProduct } from './cart.action'
import toast from 'react-hot-toast'
import { cartContext } from '_/app/cart/CartContextProvider'

export default function AddToCartBtn({ prodId }: { prodId: string }) {
    const [isLoading, setisLoading] = useState(false)

    const { updateCartCount } = useContext(cartContext)

    async function setProductToCart() {
        setisLoading(true)
        const res = await AddProduct(prodId)
        if (res == null) {
            setisLoading(false)

            toast.error('An error occurred.')
        }
        else {
            setisLoading(false)

            toast.success(`Product Added Successfully`)
            updateCartCount(res)
        }
    }
    return (
        <button onClick={setProductToCart} className='w-full p-2 mb-2 rounded-lg cursor-pointer text-xl font-semibold bg-[#FC7732] hover:bg-[#f95f12] duration-300 text-white'>{isLoading ? <i className="fa fa-spinner fa-spin text-2xl text-white" ></i> :'Add to Cart'}</button>
    )
}

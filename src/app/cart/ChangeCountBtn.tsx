"use client"
import React, { useContext, useState } from 'react'
import { changeCount } from './cart.action'
import toast from 'react-hot-toast'
import { cartContext } from './CartContextProvider'

export default function ChangeCountBtn({ isIncrement = false, itemId, newCount }: { isIncrement?: boolean, itemId: string, newCount: number }) {
    const [isLoading, setisLoading] = useState(false)
    const { updateCartCount } = useContext(cartContext)
    async function handelChangeCount() {
        setisLoading(true)
        const res = await changeCount(itemId, newCount)
        if (res == null) {
            toast.error('An error accurred')
            setisLoading(false)
        } else {
            toast.success(`Product count is ${newCount}`)
            updateCartCount(res)
            setisLoading(false)
        }
    }
    return (

        <i onClick={handelChangeCount} className={` cursor-pointer ${isIncrement && isLoading && 'fa fa-spinner fa-spin'} ${isIncrement && !isLoading && 'fa-solid fa-plus'} ${!isIncrement && isLoading && 'fa fa-spinner fa-spin'} ${!isIncrement && !isLoading && 'fa-solid fa-minus'}`}></i>
    )
}

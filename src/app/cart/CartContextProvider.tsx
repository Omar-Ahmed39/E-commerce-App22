"use client"
import React, { createContext, ReactNode, useState } from 'react'


export const cartContext = createContext({cartCount : 0 , updateCartCount:(num : number)=>{}})


export default function CartContextProvider({children} :{children : ReactNode}) {
    const [cartCount, setCartCount] = useState(0)

    function updateCartCount(newCount : number){
        setCartCount(newCount);
    }

    return (
        <cartContext.Provider value={{cartCount , updateCartCount}}>

            {children}
        </cartContext.Provider>
    )
}

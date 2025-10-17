// "use client"
// import React, { createContext, ReactNode, useState } from 'react'
// import { getWishListItems } from './WishList.action'
// import { ProductType } from '../_Interfaces/Product.Typs'

// const wishListContext = createContext({itemsId:null , getItemsId:()=>{}})
// export default function WishListContext({children} : {children : ReactNode}) {
//     const [itemsId, setItemsId] = useState<ProductType[]|null|undefined>()
//     async function getItemsId() {
//         const res = await getWishListItems()
//         setItemsId(res)
//     }
//     return (
//         <wishListContext.Provider value={{itemsId , getItemsId }}>

//             {children}
//         </wishListContext.Provider>
//     )
// }

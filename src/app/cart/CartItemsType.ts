import { ProductType } from "../_Interfaces/Product.Typs"

export type CartItemType = {
    numOfCartItems: number,
    cartId:string,
    data: {
        products: {
            count: number,
            _id: string,
            product: ProductType,
            price: number
        }[],
        totalCartPrice: number,
    }
}
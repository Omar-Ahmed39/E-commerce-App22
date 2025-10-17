"use server"
import { getUserToken } from "_/Utils/Utils"
import { CartItemType } from "../cart/CartItemsType";

// 1. تعريف شكل الـ API Response الكامل
// نفترض أن الـ API يرجع object يحتوي على status و numOfCartItems و data
interface CartApiResponse {
    status: 'success' | 'fail';
    numOfCartItems: number;
    data: CartItemType; // الـ data هي اللي نوعها CartItemType
}

export async function getAddedProduct(): Promise<CartItemType | null> {
    const userToken = await getUserToken();

    if (!userToken) {
        return null;
    }

    try {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
            headers: {
                token: userToken as string
            },
            // cache و next options صحيحة لـ Next.js App Router
            cache: "force-cache", 
            next: { tags: ['cart'] }
        });

        if (!res.ok) {
            // لو الـ request فشل لأي سبب (زي 404 أو 500)
            throw new Error(`Failed to fetch cart data, status: ${res.status}`);
        }

        // 2. استخدمنا الـ Interface عشان نحدد نوع final
        const final: CartApiResponse = await res.json();

        if (final.status === 'success') {
            // 3. بنرجع الـ data property فقط، لأن هي دي اللي بتمثل الـ Cart
            return final.data;
        }

        return null;

    } catch (error) {
        console.error("Error fetching user cart:", error);
        return null;
    }
}
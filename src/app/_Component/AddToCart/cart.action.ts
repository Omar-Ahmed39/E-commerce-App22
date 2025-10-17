"use server"

import { getUserToken } from "_/Utils/Utils"
// revalidatePath كانت مش مستخدمة، فشيلتها
import { revalidateTag } from "next/cache"

// 1. بنعرّف شكل الـ Response اللي متوقعينه من الـ API
interface AddToCartResponse {
    status: 'success' | 'fail';
    message?: string; // ممكن يكون فيه رسالة وممكن لأ
    numOfCartItems: number;
}

export async function AddProduct(productId: string): Promise<number | null> {
    const userToken = await getUserToken();

    if (!userToken) {
        // لو مفيش توكن، نرجع null بدري
        return null;
    }

    try {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
            method: 'POST',
            body: JSON.stringify({ productId }),
            headers: {
                'Content-Type': 'application/json',
                token: userToken as string
            }
        });

        // 2. بنستخدم الـ Interface عشان ندي نوع للمتغير final
        const final: AddToCartResponse = await res.json();
        
        if (final.status === 'success') {
            revalidateTag('cart'); // عشان يعمل refresh للداتا في الأماكن التانية
            return final.numOfCartItems;
        }
        
        // لو الـ status مش success، رجّع null
        return null;

    } catch (error) {
        // في حالة حدوث أي خطأ في الـ fetch نفسها (زي مشكلة في النت)
        console.error("Failed to add product:", error);
        return null;
    }
}
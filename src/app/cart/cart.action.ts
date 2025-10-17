"use server"
import { getUserToken } from "_/Utils/Utils"
import { revalidatePath } from "next/cache"

// 1. تعريف شكل الـ Response لعمليات تحديث السلة (حذف عنصر أو تغيير عدده)
interface CartUpdateResponse {
    status: 'success' | 'fail';
    numOfCartItems: number;
    // قد يحتوي الـ response على بيانات أخرى
    data?: any; 
}

export async function deleteItem(itemId: string): Promise<number | null> {
    const userToken = await getUserToken();
    if (!userToken) return null;

    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${itemId}`, {
            method: 'DELETE',
            headers: { token: userToken as string }
        });

        const final: CartUpdateResponse = await res.json();

        if (res.ok && final.status === 'success') {
            revalidatePath('/cart');
            return final.numOfCartItems;
        }
        return null;

    } catch (error) {
        console.error("Failed to delete cart item:", error);
        return null;
    }
}

// --------------------------------------------------------------------------

// 2. تعريف شكل الـ Response لعملية حذف كل العناصر
interface ClearCartResponse {
    message: 'success' | string;
}

export async function deleteAllItems(): Promise<boolean> {
    const userToken = await getUserToken();
    if (!userToken) return false;

    try {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
            method: 'DELETE',
            headers: { token: userToken as string }
        });

        const final: ClearCartResponse = await res.json();
        
        if (res.ok && final.message === 'success') {
            revalidatePath('/cart');
            return true;
        }
        return false;

    } catch (error) {
        console.error("Failed to clear cart:", error);
        return false;
    }
}

// --------------------------------------------------------------------------

export async function changeCount(itemId: string, count: number): Promise<number | null> {
    const userToken = await getUserToken();
    if (!userToken) return null;

    // لو العدد أقل من 1، الأفضل نحذف العنصر مباشرة
    if (count < 1) {
        return deleteItem(itemId);
    }

    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                token: userToken as string
            },
            body: JSON.stringify({ count })
        });
        
        // 3. بنستخدم نفس الـ Interface بتاع الحذف
        const final: CartUpdateResponse = await res.json();

        if (res.ok && final.status === 'success') {
            revalidatePath('/cart');
            return final.numOfCartItems;
        }
        return null;

    } catch (error) {
        console.error("Failed to update item count:", error);
        return null;
    }
}
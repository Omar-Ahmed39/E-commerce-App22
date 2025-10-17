"use server"

import { getUserToken } from "_/Utils/Utils"
import { PaymentType } from "./page"
import { revalidatePath } from "next/cache"

// 1. تعريف شكل الـ Response المتوقع من الـ API
interface CheckoutApiResponse {
    status: 'success' | 'fail';
    message?: string;
    // قد يحتوي الـ response على بيانات أخرى مثل بيانات الطلب
}

// 2. تعريف شكل الـ return object بتاع الفانكشن
interface ActionResult {
    success: boolean;
    message: string;
}

export async function checkOut(cartId: string, shippingAddress: PaymentType): Promise<ActionResult> {
    const userToken = await getUserToken();

    if (!userToken) {
        return { success: false, message: "Authentication token not found." };
    }

    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
            method: "POST",
            body: JSON.stringify({ shippingAddress }),
            headers: {
                'Content-Type': 'application/json',
                token: userToken as string,
            }
        });

        // 3. استخدام الـ Interface لتحديد نوع الـ response
        const final: CheckoutApiResponse = await res.json();

        if (res.ok && final.status === 'success') {
            revalidatePath('/cart'); // لتحديث بيانات السلة بعد إتمام الطلب
            return { success: true, message: "Checkout successful!" };
        } else {
            // في حالة فشل العملية
            return { success: false, message: final.message || "Checkout failed." };
        }

    } catch (error) {
        console.error("Checkout error:", error);
        return { success: false, message: "An unexpected error occurred. Please try again." };
    }
}
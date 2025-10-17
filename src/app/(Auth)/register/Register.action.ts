"use server"

import { RegisterBodyType } from './schema.type';

// 1. تعريف شكل الـ Response المتوقع من الـ API
interface RegisterApiResponse {
    message: string;
    statusMsg?: 'fail'; // قد تكون موجودة فقط في حالة الفشل
    token?: string;     // قد يرجع token في حالة النجاح
}

// 2. تعريف شكل الـ return object بتاع الفانكشن
interface ActionResult {
    success: boolean;
    message: string;
}

export async function setDataRegister(data: RegisterBodyType): Promise<ActionResult> {
    try {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // 3. استخدام الـ Interface لتحديد نوع الـ response
        const finalRes: RegisterApiResponse = await res.json();

        // التحقق من نجاح الـ request والرسالة اللي راجعة
        if (res.ok && finalRes.message === 'success') {
            return { success: true, message: "Account created successfully!" };
        } else {
            // لو الـ API رجع رسالة فشل (مثل: email already exists)
            return { success: false, message: finalRes.message || "Registration failed." };
        }

    } catch (error) {
        console.error("Failed to register user:", error);
        return { success: false, message: "An unexpected error occurred. Please try again." };
    }
}
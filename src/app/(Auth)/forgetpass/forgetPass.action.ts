"use server"

// 1. تعريف شكل الـ Response المتوقع من الـ API
interface VerifyApiResponse {
    statusMsg: 'success' | 'fail';
    message: string;
}

// 2. تعريف شكل الـ return object بتاع الفانكشن عشان يكون واضح
interface ActionResult {
    success: boolean;
    message: string;
}

export async function sendVerfiy(email: string): Promise<ActionResult> {
    try {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // 3. استخدام الـ Interface لتحديد نوع الـ response
        const final: VerifyApiResponse = await res.json();

        // نتحقق من نجاح الـ request ومن الرسالة اللي راجعة
        if (res.ok && final.statusMsg === 'success') {
            return { success: true, message: final.message };
        } else {
            // لو الـ API رجع رسالة فشل
            return { success: false, message: final.message || "An error occurred." };
        }

    } catch (error) {
        console.error("Failed to send verification email:", error);
        return { success: false, message: "An unexpected error occurred. Please try again." };
    }
}
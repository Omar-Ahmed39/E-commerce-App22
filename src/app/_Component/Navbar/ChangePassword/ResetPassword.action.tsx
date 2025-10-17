"use server"

import { getUserToken } from "_/Utils/Utils";
import { ResetPasswordType } from "./ResetPasswordSchema";

// 1. تعريف شكل الـ Response المتوقع من الـ API
interface ResetPasswordResponse {
    message: string;
    // statusMsg ممكن تكون موجودة في حالة الفشل فقط
    statusMsg?: 'fail'; 
    // الـ API ممكن يرجع token جديد بعد تغيير الباسورد بنجاح
    token?: string; 
}

// 2. تعريف شكل الـ return object بتاع الفانكشن بتاعتنا عشان يكون واضح للمستخدم
interface ActionResult {
    success: boolean;
    message: string;
}

export async function setResetPassword(data: ResetPasswordType): Promise<ActionResult> {
    const userToken = await getUserToken();

    if (!userToken) {
        return { success: false, message: "Authentication token not found." };
    }

    try {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                token: userToken as string,
                'Content-Type': 'application/json'
            }
        });

        // 3. بنستخدم الـ Interface عشان ندي نوع للمتغير finalRes
        const finalRes: ResetPasswordResponse = await res.json();

        // 4. بنحدد إذا كانت العملية نجحت ولا لأ بناءً على الـ response
        if (finalRes.statusMsg === 'fail' || !res.ok) {
            // لو الـ API رجع رسالة فشل صريحة
            return { success: false, message: finalRes.message || "Failed to reset password." };
        }

        // لو كل حاجة تمام
        return { success: true, message: finalRes.message || "Password updated successfully!" };

    } catch (error) {
        // لو حصل أي خطأ في الشبكة
        console.error("Error resetting password:", error);
        return { success: false, message: "An unexpected error occurred. Please try again." };
    }
}
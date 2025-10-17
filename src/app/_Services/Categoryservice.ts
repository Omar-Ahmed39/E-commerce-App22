import { CategoryType } from "../_Interfaces/Product.Typs";

// 1. تعريف شكل الـ API Response الكامل
interface CategoriesApiResponse {
    data: CategoryType[];
    // لو فيه أي بيانات تانية بترجع مع الـ response ممكن نضيفها هنا
}

export async function getAllCategories(): Promise<CategoryType[] | null> {
    try {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/categories');

        // التأكد من أن الـ request نجح
        if (!res.ok) {
            throw new Error(`Network response was not ok, status: ${res.status}`);
        }

        // 2. استخدام الـ Interface لتحديد نوع الـ response
        const finalRes: CategoriesApiResponse = await res.json();
        
        return finalRes.data;
        
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        return null;
    }
}
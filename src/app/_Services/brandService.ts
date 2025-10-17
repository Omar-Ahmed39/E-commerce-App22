import { BrandType } from "../_Interfaces/Product.Typs";

// 1. تعريف شكل الـ API Response الكامل
// الـ API بيرجع object جواه key اسمه data، والـ data دي هي الـ array of brands
interface BrandsApiResponse {
    data: BrandType[];
    // ممكن تضيف أي خصائص تانية بترجع من الـ API زي الـ metadata لو موجودة
}

export async function getAllBrands(): Promise<BrandType[] | null> {
    try {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/brands');

        // من الأفضل دايماً تتأكد إن الـ request نفسه نجح
        if (!res.ok) {
            throw new Error(`Network response was not ok, status: ${res.status}`);
        }
        
        // 2. استخدمنا الـ interface عشان نحدد نوع finalRes
        const finalRes: BrandsApiResponse = await res.json();
        
        return finalRes.data;

    } catch (error) {
        // استخدام console.error أفضل للأخطاء
        console.error('Failed to fetch brands:', error);
        return null;
    }
}
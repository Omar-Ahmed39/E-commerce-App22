import { ProductType } from "../_Interfaces/Product.Typs";

// 1. تعريف شكل الـ Response لقائمة المنتجات
interface ProductsApiResponse {
    data: ProductType[];
    // ممكن نضيف هنا أي بيانات أخرى مثل metadata لو الـ API بيرجعها
}

export async function getAllProducts(): Promise<ProductType[] | null> {
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`);

        if (!res.ok) {
            throw new Error(`Network response was not ok, status: ${res.status}`);
        }

        const finalRes: ProductsApiResponse = await res.json();
        return finalRes.data;

    } catch (error) {
        console.error("Failed to fetch products:", error);
        return null;
    }
}

// --------------------------------------------------------------------------

// 2. تعريف شكل الـ Response لمنتج واحد
interface ProductDetailsApiResponse {
    data: ProductType;
}

export async function getProductDetails(id: string): Promise<ProductType | null> {
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`);

        if (!res.ok) {
            // ممكن يكون المنتج مش موجود (404 Not Found)
            throw new Error(`Failed to fetch product details, status: ${res.status}`);
        }

        const finalRes: ProductDetailsApiResponse = await res.json();
        return finalRes.data;

    } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        return null;
    }
}
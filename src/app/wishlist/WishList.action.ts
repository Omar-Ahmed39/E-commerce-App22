"use server"
import { getUserToken } from "_/Utils/Utils"
import { revalidatePath } from "next/cache"
import { ProductType } from "../_Interfaces/Product.Typs"

// 1. Interface for the response when adding or deleting an item
interface WishlistMutationResponse {
    status: 'success' | 'fail';
    message: string;
    data: string[]; // The API returns an array of the product IDs in the wishlist
}

// 2. Interface for the response when fetching the full wishlist
interface WishlistDataResponse {
    status: 'success' | 'fail';
    count: number;
    data: ProductType[];
}

// 3. A standard return type for actions that perform a mutation (add/delete)
interface ActionResult {
    success: boolean;
    message: string;
    // We can also return the updated data
    data?: string[]; 
}

export async function AddItem(productId: string): Promise<ActionResult> {
    const userToken = await getUserToken();
    if (!userToken) return { success: false, message: "User not authenticated." };

    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: userToken as string
            },
            body: JSON.stringify({ productId }),
        });

        const final: WishlistMutationResponse = await res.json();
        
        if (res.ok && final.status === 'success') {
            revalidatePath('/wishlist');
            return { success: true, message: final.message, data: final.data };
        }
        return { success: false, message: final.message || "Failed to add item." };

    } catch (error) {
        console.error("Error adding to wishlist:", error);
        return { success: false, message: "An unexpected error occurred." };
    }
}

// --------------------------------------------------------------------------

export async function getWishListItems(): Promise<ProductType[]> {
    const userToken = await getUserToken();
    if (!userToken) return []; // Return empty array if not authenticated

    try {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
            headers: { token: userToken as string },
            cache: "no-store", // Use no-store to always get the freshest data
            next: { tags: ['wishlist'] }
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch wishlist, status: ${res.status}`);
        }

        const final: WishlistDataResponse = await res.json();
        return final.data || []; // Return data or an empty array if data is null/undefined

    } catch (error) {
        console.error("Error fetching wishlist items:", error);
        return []; // Return empty array on error
    }
}

// --------------------------------------------------------------------------

export async function deleteItem(itemId: string): Promise<ActionResult> {
    const userToken = await getUserToken();
    if (!userToken) return { success: false, message: "User not authenticated." };

    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${itemId}`, {
            method: 'DELETE',
            headers: { token: userToken as string }
        });
        
        const final: WishlistMutationResponse = await res.json();

        if (res.ok && final.status === 'success') {
            revalidatePath('/wishlist');
            return { success: true, message: final.message, data: final.data };
        }
        return { success: false, message: final.message || "Failed to delete item." };
    
    } catch (error) {
        console.error("Error deleting from wishlist:", error);
        return { success: false, message: "An unexpected error occurred." };
    }
}
import { getUserToken } from '_/Utils/Utils'
import { jwtDecode } from 'jwt-decode';
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "_/components/ui/table"
import Link from 'next/link';

export const metadata = {
    title: 'All Orders',
};
type OrdersType = {
    shippingAddress: { phone: string, city: string },
    totalOrderPrice: number,
    paymentMethodType: string,
    isPaid: boolean,
    isDelivered: boolean,
    user: {
        name: string,
    },
    id: number,
}

export default async function AllOrders() {

    const token = await getUserToken()
    const jwtObj = jwtDecode(token as string)

    // افترض أن OrdersType و jwtObj معرفان في مكان آخر
    // import { OrdersType } from '...';
    // declare const jwtObj: { id: string };

    async function getAllOrders(): Promise<OrdersType[]> {
        // التحقق من وجود jwtObj.id ضروري لتجنب الأخطاء
        if (!jwtObj?.id) {
            console.error("User ID is not available to fetch orders.");
            return []; // نرجع مصفوفة فارغة إذا لم يكن هناك ID
        }

        try {
            const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${jwtObj.id}`);

            if (!res.ok) {
                throw new Error(`Failed to fetch orders, status: ${res.status}`);
            }

            // 1. هنا نفترض أن الـ API يرجع مصفوفة من الطلبات مباشرة
            const final: OrdersType[] = await res.json();

            return final;

        } catch (error) {
            console.error("Error fetching user orders:", error);
            // 2. من الأفضل إرجاع مصفوفة فارغة في حالة الفشل
            return [];
        }
    }

    const allOrders = await getAllOrders()

    return (


        <div className='container mx-auto py-10 '>

            <h1 className='text-4xl text-center text-[#1F2B4C] font-bold mb-5'>All Orders</h1>

            <Table className='text-center bg-white overflow-x-scroll cursor-grab sm:cursor-auto'>
                <TableBody className=' border-b-1 font-semibold'>
                    <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>City</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Total Price</TableCell>
                        <TableCell>Payment</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell >Delivered</TableCell>
                    </TableRow>
                </TableBody>
                <TableBody>
                    {allOrders.map(order =>
                        <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.user.name}</TableCell>
                            <TableCell>{order.shippingAddress.city}</TableCell>
                            <TableCell>{order.shippingAddress.phone}</TableCell>
                            <TableCell>${order.totalOrderPrice}</TableCell>
                            <TableCell>{order.paymentMethodType}</TableCell>
                            <TableCell>{order.isPaid ? <i className="fa-solid fa-check font-semibold text-green-600"></i> : <i className="fa-solid fa-xmark font-semibold text-red-600" ></i>}</TableCell>
                            <TableCell>{order.isDelivered ? <i className="fa-solid fa-check font-semibold text-green-600"></i> : <i className="fa-solid fa-xmark font-semibold text-red-600" ></i>}</TableCell>
                        </TableRow>
                    )}

                </TableBody>
            </Table>
            <Link href='/' className='p-3 font-semibold text-xl cursor-pointer border-2 border-black  block w-fit mt-3 rounded-2xl hover:text-white hover:bg-black duration-300'>Back to home</Link>
        </div>
    )
}

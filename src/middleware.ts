import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export default async function middleware(req : NextRequest) {

    const jwt = await getToken({req});

    if (jwt) {
        return NextResponse.next()
    }

    return NextResponse.redirect(`http://localhost:3000/login`)

}


export const config ={
    matcher : ['/' , '/cart:paht*' , '/wishlist' ,'/prductDetails','/categories','/products','/brands' ]
}

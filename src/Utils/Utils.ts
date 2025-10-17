import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken () {
    const cookie = await cookies();
    const userToken = cookie.get('next-auth.session-token')?.value;
    const decodeToken =await decode({token:userToken, secret:process.env.NEXTAUTH_SECRET || ''})
    return decodeToken?.credentialToken;
}
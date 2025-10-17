import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const nextAuthconfig: NextAuthOptions = {
    providers: [
        Credentials({
            name: 'Trendify',
            async authorize(credentials) {

                const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin', {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })


                const finalRes = await res.json()

                const { id }: { id: string } = jwtDecode(finalRes.token)


                if (finalRes.message === 'success') {
                    return {
                        id: id,
                        name: finalRes.user.name,
                        email: finalRes.user.email,
                        credentialToken: finalRes.token
                    }
                }
                return null;


            },
            credentials: {
                email: { type: 'email', label: 'Email' },
                password: { type: 'password', label: 'Password' }
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        jwt(params) {

            if (params.user) {
                params.token.credentialToken = params.user.credentialToken;
                params.token.userId = params.user.id;
            }
            return params.token
        },
        session(params) {

            params.session.user.id = params.token.userId;

            return params.session

        },
    }


}
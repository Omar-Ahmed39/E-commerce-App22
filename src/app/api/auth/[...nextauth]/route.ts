import { nextAuthconfig } from "_/next-auth/nextAuth.config";
import NextAuth from "next-auth";

const nextAuth =  NextAuth(nextAuthconfig)

export{nextAuth as POST , nextAuth as GET}
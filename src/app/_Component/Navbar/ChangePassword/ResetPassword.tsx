"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "_/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "_/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "_/components/ui/form"
import { Input } from "_/components/ui/input"
import { Label } from "_/components/ui/label"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { setResetPassword } from "./ResetPassword.action"
import { ResetPasswordType, schema } from "./ResetPasswordSchema"
import { useState } from "react"
import { signOut } from "next-auth/react"








export default function ResetPassword() {

    const [isLoading, setisLoading] = useState(false)

    async function ResetPassword(data: ResetPasswordType) {
        setisLoading(true)
        const res = await setResetPassword(data);

        if (res.statusMsg === 'fail') {
            setisLoading(false)

            toast.error(res.message)


        } else {
            setisLoading(false)
            toast.success('Change Password Successfully Please Re-Login')
            signOut({ redirect: true, callbackUrl: '/login' })
        }
    }

    const RHFObj = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            currentPassword: '',
            password: '',
            rePassword: ''
        },
        mode: 'onBlur'

    });
    const { control, handleSubmit } = RHFObj;


    return (
        <Dialog>
            <Form  {...RHFObj}>
                <form id="reset-form" onSubmit={handleSubmit(ResetPassword)}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="bg-transparent border-0 text-white text-[16px]   font-semibold pl-2 cursor-pointer hover:text-blue-500 duration-150 hover:bg-transparent pr-0">Reset Password</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Reset Password</DialogTitle>
                            <DialogDescription>
                                Make changes to your Password here. Click save when you&apos;re
                                done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <FormField
                                control={control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="grid gap-3">
                                                <Label htmlFor="currentPassword-1">Current Password</Label>
                                                <Input id="currentPassword-1" type="password" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage className='p-5 bg-red-200 rounded-lg border-1 border-red-600 font-semibold' />
                                    </FormItem>
                                )} />


                            <FormField
                                control={control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="grid gap-3">
                                                <Label htmlFor="Password-1">Password</Label>
                                                <Input id="Password-1" type="password"  {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage className='p-5 bg-red-200 rounded-lg border-1 border-red-600 font-semibold' />
                                    </FormItem>
                                )} />

                            <FormField
                                control={control}
                                name="rePassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="grid gap-3">
                                                <Label htmlFor="rePassword-1">Confirm Password</Label>
                                                <Input id="rePassword-1" type="password"  {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage className='p-5 bg-red-200 rounded-lg border-1 border-red-600 font-semibold' />
                                    </FormItem>
                                )} />

                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" form="reset-form">{isLoading ? <i className="fa fa-spinner fa-spin text-xl text-white" ></i> : 'Save changes'}</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>

            </Form>

        </Dialog>
    )
}

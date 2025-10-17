import * as zod from 'zod'



export const schema = zod.object({
    name: zod.string().nonempty('name is required').min(3, 'name min length is 3'),
    email: zod.email('email pattern is inavalid').nonempty('email is required'),
    password: zod.string().nonempty('password is required')
        .regex(/(?=.*?[A-Z])/, 'Password must contain at least one uppercase letter (A–Z)')
        .regex(/(?=.*?[a-z])/, 'Password must contain at least one lowercase letter (a–z)')
        .regex(/(?=.*?[0-9])/, 'Password must contain at least one digit (0–9)')
        .regex(/(?=.*?[#?!@$%^&*-])/, 'Password must Contain at least one special character (# ? ! @ $ % ^ & * -)')
        .regex(/.{8,}/, 'Password must be at least 8 characters long'),
    rePassword: zod.string().nonempty('re-Password is required'),
    phone: zod.string().nonempty('phone number is required').regex(/^01[0125][0-9]{8}$/, 'invalid Phone'),
}).refine(({ password, rePassword }) => {
    return password === rePassword
}, {
    path: ['rePassword'],
    error: 'Password confirmation is incorrect'
})
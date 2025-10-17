import * as zod from 'zod'


export type ResetPasswordType = zod.infer<typeof schema>;


export const schema = zod.object({
    currentPassword: zod.string().nonempty('password is required')
        .regex(/(?=.*?[A-Z])/, 'Password must contain at least one uppercase letter (A–Z)')
        .regex(/(?=.*?[a-z])/, 'Password must contain at least one lowercase letter (a–z)')
        .regex(/(?=.*?[0-9])/, 'Password must contain at least one digit (0–9)')
        .regex(/(?=.*?[#?!@$%^&*-])/, 'Password must Contain at least one special character (# ? ! @ $ % ^ & * -)')
        .regex(/.{8,}/, 'Password must be at least 8 characters long'),
    password: zod.string().nonempty('password is required')
        .regex(/(?=.*?[A-Z])/, 'Password must contain at least one uppercase letter (A–Z)')
        .regex(/(?=.*?[a-z])/, 'Password must contain at least one lowercase letter (a–z)')
        .regex(/(?=.*?[0-9])/, 'Password must contain at least one digit (0–9)')
        .regex(/(?=.*?[#?!@$%^&*-])/, 'Password must Contain at least one special character (# ? ! @ $ % ^ & * -)')
        .regex(/.{8,}/, 'Password must be at least 8 characters long'),
    rePassword: zod.string().nonempty('password is required')
        .regex(/(?=.*?[A-Z])/, 'Password must contain at least one uppercase letter (A–Z)')
        .regex(/(?=.*?[a-z])/, 'Password must contain at least one lowercase letter (a–z)')
        .regex(/(?=.*?[0-9])/, 'Password must contain at least one digit (0–9)')
        .regex(/(?=.*?[#?!@$%^&*-])/, 'Password must Contain at least one special character (# ? ! @ $ % ^ & * -)')
        .regex(/.{8,}/, 'Password must be at least 8 characters long'),
}).refine(({ password, rePassword }) => {
    return password === rePassword
}, {
    path: ['rePassword'],
    error: 'Password confirmation is incorrect'
})
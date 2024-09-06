import { z } from 'zod'

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 10 characters long')
const emailSchema = z.string().email('Invalid email address')

export const registerSchema = z
  .object({
    username: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
    acceptTerms: z
      .boolean()
      .refine((value) => value, 'You must agree to the terms')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberDevice: z.boolean()
})

export const forgotPasswordSchema = z.object({
  email: emailSchema.email()
})

export type TRegisterSchema = z.infer<typeof registerSchema>
export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
export type TLoginSchema = z.infer<typeof loginSchema>

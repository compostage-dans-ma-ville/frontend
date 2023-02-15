import { confirmPasswordSchema, emailSchema, passwordSchema } from './user'
import * as yup from 'yup'
import { RemoveIndex } from '@/helpers/typing'

export const forgotPasswordSchema = yup.object().shape({
  ...emailSchema
})

export const updatePasswordSchema = yup.object().shape({
  ...passwordSchema,
  ...confirmPasswordSchema
})

export type ForgotPassword = RemoveIndex<yup.InferType<typeof forgotPasswordSchema>>
export type UpdatePassword = RemoveIndex<yup.InferType<typeof updatePasswordSchema>>

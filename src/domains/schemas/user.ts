import * as yup from 'yup'

import { RemoveIndex } from '@/helpers/typing'

export const DESCRIPTION_MAX_LENGTH = 800
export const passwordSchema = {
  password: yup
    .string()
    .required('errors:required_field')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'errors:valid_pwd'
    )
}

export const emailSchema = {
  email: yup
    .string()
    .email('errors:valid_email')
    .required('errors:required_field')
}

export const confirmPasswordSchema = {
  confirmPassword: yup.string()
    .required('errors:required_field')
    .when('password', {
      is: (val: any) => (!!(val && val.length > 0)),
      then: yup.string().oneOf(
        [yup.ref('password')]
      )
    })
}

export const userFullNameSchema = {
  firstName: yup.string().required('errors:required_field').min(3, 'errors:min3'),
  lastName: yup.string().required('errors:required_field').min(3, 'errors:min3')

}

export const userCreationSchema = yup.object().shape({
  ...userFullNameSchema,
  ...emailSchema,
  ...passwordSchema,
  ...confirmPasswordSchema
})

export const editUserSchema = yup.object().shape({
  ...userFullNameSchema,
  description: yup.string().max(DESCRIPTION_MAX_LENGTH, 'errors:max_length')
})

export const loginUserSchema = yup.object().shape({
  ...emailSchema,
  ...passwordSchema
})

export type LoginUser = RemoveIndex<yup.InferType<typeof loginUserSchema>>
export type UserCreation = RemoveIndex<yup.InferType<typeof userCreationSchema>>
export type EditUser = RemoveIndex<yup.InferType<typeof editUserSchema>>
export type User = Omit<UserCreation, 'password' | 'confirmPassword' | 'email' > & {
  id: number
  avatar: string
}
export type AuthenticatedUser = User & { email: string }

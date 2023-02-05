import * as yup from 'yup'

export const userCreationSchema = yup.object().shape({
  firstname: yup.string().required('firstname is required please !'),
  lastname: yup.string().required('lastname is required please !'),
  email: yup
    .string()
    .email('Please enter a valid email format !')
    .required('Email is required please !'),
  password: yup
    .string()
    .min(4, 'Password must contain at least 4 characters')
    .required('Password is required please !')
})

export type UserCreation = yup.InferType<typeof userCreationSchema>

import * as yup from 'yup'

export const userCreationSchema = yup.object().shape({
  firstName: yup.string().required('errors:required_field').min(3, 'errors:min3'),
  lastName: yup.string().required('errors:required_field').min(3, 'errors:min3'),
  email: yup
    .string()
    .email('errors:valid_email')
    .required('errors:required_field'),
  password: yup
    .string()
    .required('errors:required_field')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'errors:valid_pwd'
    ),
  confirmPassword: yup.string()
    .required('errors:required_field')
    .when('password', {
      is: (val: any) => (!!(val && val.length > 0)),
      then: yup.string().oneOf(
        [yup.ref('password')]
      )
    })
})

export type UserCreation = yup.InferType<typeof userCreationSchema>

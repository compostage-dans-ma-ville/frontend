import axios, { AxiosResponse } from 'axios'
import { ForgotPassword, UpdatePassword } from '../schemas'
import { LoginUser } from '../schemas/user'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const loginUser = (data: LoginUser) => {
  return axios.post<{token: string}>('/auth/login', data)
}

export const resetPassword = (data: ForgotPassword): Promise<AxiosResponse> => {
  return axios.post('/auth/send-reset-password-email', data)
}

export const updatePassword = ({
  password,
  token
}: UpdatePassword & {token: string}): Promise<AxiosResponse> => {
  return axios.post('/auth/reset-password', { password, token })
}

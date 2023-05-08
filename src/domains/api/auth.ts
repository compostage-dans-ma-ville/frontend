/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios, { AxiosResponse } from 'axios'

import { ForgotPassword, UpdatePassword } from '../schemas'
import { LoginUser, UserCreation } from '../schemas/user'

export const registerUser = (data: UserCreation) => {
  return axios.post<{token: string}>('/auth/register', data)
}

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

export const sendEmailValidationToken = (): Promise<AxiosResponse> => {
  return axios.post('auth/send-email-validation-token')
}

export const activateEmailFromToken = (token: string): Promise<AxiosResponse> => {
  return axios.post(`auth/activate/${token}`)
}

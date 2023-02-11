import axios, { AxiosResponse } from 'axios'
import { LoginUser } from '../user'

export const loginUser = (data: LoginUser): Promise<AxiosResponse> => {
  return axios.post('/auth/login', data)
}

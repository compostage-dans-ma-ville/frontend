import axios from 'axios'
import { User } from '../schemas'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getMe = () => {
  return axios.get<User>('/users/me')
}

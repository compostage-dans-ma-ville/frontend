import useSWR from 'swr'
import axios from 'axios'
import { User } from '../../schemas/user'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useUser = () => {
  const {
    data, mutate, error, isLoading
  } = useSWR<User>('/users/me', () => axios.get('/users/me').then(res => res.data))

  return {
    isLoading,
    error,
    user: data,
    mutate
  }
}

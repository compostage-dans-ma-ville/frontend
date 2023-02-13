import useSWR from 'swr'
import axios from 'axios'
import { User } from '../../schemas/user'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useUser = (userId: number) => {
  const {
    data, mutate, error, isLoading
  } = useSWR<User>(`/users/${userId}`, () => axios.get(`/users/${userId}`).then(res => res.data))

  return {
    isLoading,
    error,
    user: data,
    mutate
  }
}

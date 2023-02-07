import useSWR from 'swr'
import axios from 'axios'
import { User } from './user'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useUser = (userId: number) => {
  const {
    data, mutate, error, isLoading
  } = useSWR<User>('api_user', () => axios.get(`/users/${userId}`).then(res => res.data))

  return {
    isLoading,
    error,
    user: data,
    mutate
  }
}

export default useUser

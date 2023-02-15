import useSWR from 'swr'
import axios from 'axios'
import { User } from '../../schemas/user'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useUser = (id?: string) => {
  const path = `/users/${id || 'me'}`

  const {
    data, mutate, error, isLoading
  } = useSWR<User>(path, () => axios.get(path).then(res => res.data))

  return {
    isLoading,
    error,
    user: data,
    mutate
  }
}

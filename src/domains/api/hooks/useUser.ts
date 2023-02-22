import axios from 'axios'
import useSWR from 'swr'

import { User } from '../../schemas/user'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useUser = <T = User>(id?: number) => {
  const path = `/users/${id || 'me'}`

  const {
    data, mutate, error, isLoading
  } = useSWR<T>(
    path,
    () => axios
      .get(path)
      .then(res => res.data)
  )

  return {
    isLoading,
    error,
    user: data,
    mutate
  }
}

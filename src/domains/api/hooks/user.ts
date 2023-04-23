/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios'
import useSWR from 'swr'

import { User } from '../../schemas/user'
import { getUserOrganizations } from '../user'

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

export const useUserOrganizations = (userId: string | number) => {
  const {
    data, error, mutate, isLoading
  } = useSWR(`/users/${userId}/organizations`, () => getUserOrganizations(userId).then((res) => res.data))

  return {
    organizations: data,
    isLoading,
    error,
    mutate
  }
}

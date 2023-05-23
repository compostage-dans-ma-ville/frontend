/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios, { AxiosResponse } from 'axios'
import useSWR, { SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'

import { EditUser, User } from '../../schemas/user'
import { getUserOrganizations, updateUser } from '../user'

const pathToUser = (id?: number | string) => `/users/${id || 'me'}`

export const useUser = <T = User>(id?: number, config?: SWRConfiguration<T>) => {
  const path = pathToUser(id)

  const {
    data, mutate, error, isLoading
  } = useSWR<T>(
    path,
    () => axios
      .get(path)
      .then(res => res.data),
    config
  )

  return {
    isLoading,
    error,
    user: data,
    mutate
  }
}

export const useUpdateUser = (userId: number) => {
  const {
    data, error, trigger, isMutating
  } = useSWRMutation<
    AxiosResponse<User>,
    any,
    string,
    EditUser
  >(pathToUser(userId), (url, { arg }) => updateUser(userId, arg), {
    populateCache(result) {
      return result.data
    },
    revalidate: false
  })

  return {
    data,
    isMutating,
    error,
    trigger
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

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios, { AxiosResponse } from 'axios'
import useSWR, { SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import useSWRMutation from 'swr/mutation'

import { Site } from '@/domains/schemas'

import { EditUser, User, UserSite } from '../../schemas/user'
import { Paginated } from '../helpers'
import { getUserOrganizations, getUserSites, updateUser } from '../user'

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

export const useUserSites = (userId: string | number) => {
  const PER_PAGE = 50
  const userSiteKey = (index: number, previousPageData: AxiosResponse<Paginated<Site>> | null) => {
    const previousPageWasTheLast = previousPageData !== null
      && previousPageData?.data.links.next === undefined

    if (previousPageWasTheLast) return null

    return { url: `/users/${userId}/sites`, page: index + 1, items: PER_PAGE } as const
  }

  const {
    data,
    size,
    isValidating,
    setSize,
    mutate
  } = useSWRInfinite<
    AxiosResponse<Paginated<UserSite>>,
    any,
    typeof userSiteKey
  >(
    userSiteKey,
    (fetcherData) => getUserSites(
      userId,
      { page: fetcherData.page, items: fetcherData.items }
    ),
    { revalidateFirstPage: false }
  )

  return {
    sites: data && data.reduce((acc, elmt) => [...acc, ...elmt.data.data], [] as UserSite[]),
    isLoading: isValidating,
    mutate,
    size,
    setSize,
    canLoadMore: data ? data[data.length - 1].data.links.next !== undefined : true
  }
}

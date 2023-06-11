/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AxiosResponse } from 'axios'
import useSWR, { SWRConfiguration } from 'swr'
import useSWRInfinite from 'swr/infinite'
import useSWRMutation from 'swr/mutation'

import { CreateSite, Site, SiteMember } from '@/domains/schemas'

import { Paginated } from '../helpers'
import {
  addMemberToSite,
  createSite, deleteSite, getSite, getSiteMembers, updateSite
} from '../sites'

const createSiteKey = 'createSite' as const
const useSiteKey = (siteId: string | number) => `/sites/${siteId}` as const

export const useSite = (siteId: string | number, config?: SWRConfiguration) => {
  const {
    data, error, mutate, isLoading
  } = useSWR(
    useSiteKey(siteId),
    () => getSite(siteId).then((res) => res.data),
    config
  )

  return {
    site: data,
    isLoading,
    error,
    mutate
  }
}

export const useCreateSite = () => {
  const {
    data, error, trigger, isMutating
  } = useSWRMutation<
    AxiosResponse<Site>,
    any,
    typeof createSiteKey,
    CreateSite
  >(createSiteKey, (url, { arg }) => createSite(arg))

  return {
    data,
    isMutating,
    error,
    trigger
  }
}

export const useUpdateSite = (siteId: number) => {
  const {
    data, error, trigger, isMutating
  } = useSWRMutation<
    AxiosResponse<Site>,
    any,
    string,
    CreateSite
  >(useSiteKey(siteId), (url, { arg }) => updateSite(siteId, arg), {
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

export const useDeleteSite = (siteId: number) => {
  const {
    data, error, trigger, isMutating
  } = useSWRMutation<
    AxiosResponse,
    any,
    string
  >(`delete/site/${siteId}`, () => deleteSite(siteId))

  return {
    data,
    isMutating,
    error,
    trigger
  }
}

export const useGetSiteMembers = (siteId: number) => {
  const PER_PAGE = 50
  const siteMembersKey = (index: number, previousPageData: AxiosResponse<Paginated<SiteMember>> | null) => {
    const previousPageWasTheLast = previousPageData !== null
      && previousPageData?.data.links.next === undefined

    if (previousPageWasTheLast) return null

    return { url: `/sites/${siteId}/members`, page: index + 1, items: PER_PAGE } as const
  }

  const {
    data,
    size,
    isValidating,
    setSize,
    mutate
  } = useSWRInfinite<
    AxiosResponse<Paginated<SiteMember>>,
    any,
    typeof siteMembersKey
  >(
    siteMembersKey,
    (fetcherData) => getSiteMembers(
      siteId,
      { page: fetcherData.page, items: fetcherData.items }
    ),
    { revalidateFirstPage: false }
  )

  return {
    data,
    isLoading: isValidating,
    mutate,
    size,
    setSize,
    canLoadMore: data ? data[data.length - 1].data.links.next !== undefined : true
  }
}

export const useAddMemberToSite = (siteId: number, token: string, config?: SWRConfiguration) => {
  const {
    data, error, mutate, isLoading
  } = useSWR(
    ['invite-user', siteId, token],
    () => addMemberToSite(siteId, token).then((res) => res.data),
    config
  )

  return {
    data,
    isLoading,
    error,
    mutate
  }
}

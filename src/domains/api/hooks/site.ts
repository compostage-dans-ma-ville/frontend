/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AxiosResponse } from 'axios'
import useSWR, { SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'

import { CreateSite, Site } from '@/domains/schemas'

import { createSite, getSite, updateSite } from '../sites'

const createSiteKey = 'createSite' as const
const useGetSiteKey = (siteId: string | number) => `/sites/${siteId}` as const

export const useSite = (siteId: string | number, config?: SWRConfiguration) => {
  const {
    data, error, mutate, isLoading
  } = useSWR(
    useGetSiteKey(siteId),
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
  >(useGetSiteKey(siteId), (url, { arg }) => updateSite(siteId, arg), {
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

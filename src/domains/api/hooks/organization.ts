/* eslint-disable @typescript-eslint/explicit-function-return-type */
import useSWR from 'swr'

import { getOrganization, getOrganizationMembers, getOrganizationSites } from '../organization'

export const useOrganization = (organizationId: string | number) => {
  const {
    data, error, mutate, isLoading
  } = useSWR(`/organizations/${organizationId}`, () => getOrganization(organizationId).then((res) => res.data))

  return {
    organization: data,
    isLoading,
    error,
    mutate
  }
}

export const useOrganizationSites = (organizationId: string | number) => {
  const {
    data, error, mutate, isLoading
  } = useSWR(`/organizations/${organizationId}/sites`, () => getOrganizationSites(organizationId).then((res) => res.data))

  return {
    sites: data,
    isLoading,
    error,
    mutate
  }
}

export const useOrganizationMembers = (organizationId: string | number) => {
  const {
    data, error, mutate, isLoading
  } = useSWR(`/organizations/${organizationId}/members`, () => getOrganizationMembers(organizationId).then((res) => res.data))

  return {
    members: data,
    isLoading,
    error,
    mutate
  }
}

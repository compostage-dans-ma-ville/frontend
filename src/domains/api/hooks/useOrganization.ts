import useSWR from 'swr'

import { getOrganization } from '../organization'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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

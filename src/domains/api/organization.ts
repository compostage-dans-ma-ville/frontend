/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios'

import { SmallSite, User } from '../schemas'
import { Organization, OrganizationRole } from '../schemas/organization'

export const getOrganization = (organizationId: number | string) => {
  return axios.get<Organization>(`/organizations/${organizationId}`)
}

export const getOrganizationSites = (organizationId: number | string) => {
  return axios.get<SmallSite[]>(`/organizations/${organizationId}/sites`)
}

export const getOrganizationMembers = (organizationId: number | string) => {
  return axios.get<{role: OrganizationRole, member: User}[]>(`/organizations/${organizationId}/members`)
}

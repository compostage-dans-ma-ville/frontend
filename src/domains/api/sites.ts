/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios'

import { Paginated, PaginationQueryParams } from './helpers'
import {
  CreateSite, CreateSiteMember, Site, SiteMember, SmallSite
} from '../schemas'

export interface GetSitesParams {
  latitude?: number
  longitude?: number
  radius?: number
}

export const getSites = (params?: GetSitesParams) => {
  return axios.get<SmallSite[]>('/sites', { params })
}

export const getSite = (siteId: number | string) => {
  return axios.get<Site>(`/sites/${siteId}`)
}

export const createSite = (siteData: CreateSite) => {
  return axios.post<Site>('/sites', siteData)
}

export const updateSite = (siteId: number, siteData: CreateSite) => {
  return axios.put<Site>(`/sites/${siteId}`, siteData)
}

export const deleteSite = (siteId: number | string) => {
  return axios.delete<void>(`/sites/${siteId}`)
}

export const getSiteMembers = (siteId: number | string, params?: PaginationQueryParams) => {
  return axios.get<Paginated<SiteMember>>(`/sites/${siteId}/members`, { params })
}

export const deleteSiteMember = (siteId: number | string, userId: number | string) => {
  return axios.delete<void>(`/sites/${siteId}/members/${userId}`)
}

export const createSiteMember = (siteId: number, data: CreateSiteMember) => {
  return axios.put<void>(`/sites/${siteId}/members`, data)
}

export const addMemberToSite = (siteId: number, token: string) => {
  return axios.post<void>(`/sites/${siteId}/members`, { token })
}

export const updateSiteMember = (siteId: number, memberId: number, data: Pick<SiteMember, 'role'>) => {
  return axios.patch<Site>(`/sites/${siteId}/members/${memberId}`, data)
}

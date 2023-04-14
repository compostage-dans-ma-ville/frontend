/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios'

import { CreateSite, Site, SmallSite } from '../schemas'

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

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios'

import { CreateSite, Site } from '../schemas'

export const getSite = (siteId: number | string) => {
  return axios.get<Site>(`/sites/${siteId}`)
}

export const createSite = (siteData: CreateSite) => {
  return axios.post<Site>('/sites', siteData)
}

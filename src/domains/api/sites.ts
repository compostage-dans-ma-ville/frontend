/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios'
import { Site } from '../schemas'

export const getSite = (siteId: number | string) => {
  return axios.get<Site>(`/sites/${siteId}`)
}

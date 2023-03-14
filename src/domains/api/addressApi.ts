/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios'

import { ApiAddressFeatureCollection } from '../schemas'

const API_BASEURL = 'https://api-adresse.data.gouv.fr'
const API_BASEURL_SEARCH = `${API_BASEURL}/search`

export const getSearchAddress = (address: string) => {
  const urlEncodedAddress = address.replace(/\s/g, '+')
  return axios.get<ApiAddressFeatureCollection>(`${API_BASEURL_SEARCH}/?q=${urlEncodedAddress}&limit=5`)
}

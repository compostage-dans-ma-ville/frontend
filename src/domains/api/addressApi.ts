/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios'

import { ApiAddress, ApiAddressFeatureCollection } from '../schemas'

const API_BASEURL = 'https://api-adresse.data.gouv.fr'
const API_BASEURL_SEARCH = `${API_BASEURL}/search`
const API_BASEURL_REVERSE = `${API_BASEURL}/reverse`

export const getSearchAddress = (address: string) => {
  const urlEncodedAddress = address.replace(/\s/g, '+')

  return axios.get<ApiAddressFeatureCollection>(`${API_BASEURL_SEARCH}/?q=${urlEncodedAddress}&limit=5`, {
    transformRequest: (data, headers) => {
      // remove token from request
      delete headers.Authorization
      return data
    }
  })
}

export const getAddressFromCoord = (latitude: number | string, longitude: number | string) => {
  return axios.get<ApiAddressFeatureCollection>(`${API_BASEURL_REVERSE}/?lon=${longitude}&lat=${latitude}`, {
    transformRequest: (data, headers) => {
      // remove token from request
      delete headers.Authorization
      return data
    }
  })
}

export const getAddressFromMunicipality = (municipalityId: string) => {
  return axios.get<ApiAddressFeatureCollection>(`${API_BASEURL_SEARCH}/?q=${municipalityId}&type=municipality&autocomplete=0&limit=1`, {
    transformRequest: (data, headers) => {
      // remove token from request
      delete headers.Authorization
      return data
    }
  })
}

export const getToNormalizedAddress = (address: ApiAddressFeatureCollection): ApiAddress[] => {
  return address.features.map(feature => {
    const coordinates = feature.geometry.coordinates
    return {
      ...feature.properties,
      lat: coordinates[1],
      lon: coordinates[0]
    }
  })
}

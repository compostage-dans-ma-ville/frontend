import { FeatureCollection, Point } from 'geojson'

import yup from '@/helpers/yup-extended'

export type AddressType = 'municipality' | 'locality' |'street' | 'housenumber'
export interface ApiGetAddress {
  label: string,
  score: number,
  id: string,
  type: AddressType,
  name: string,
  postcode: string,
  housenumber?: string,
  street?: string
  city: string,
  context: string,
  importance: number,
  population: number
}

export interface ApiAddress extends ApiGetAddress {
  lat: number,
  lon: number,
}

export type ApiAddressFeatureCollection = FeatureCollection<Point, ApiGetAddress>

export const apiAddressSchema = yup.object().shape({
  housenumber: yup.string().required(),
  street: yup.string().required(),
  city: yup.string().required(),
  postcode: yup.string().required()
})

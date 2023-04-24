import { Map } from 'leaflet'

import { ApiAddress } from '@/domains/schemas'

export const getAddressPlaceId = (address: Pick<ApiAddress, 'city' | 'postcode'>): string => {
  return encodeURI(`${address.city}-${address.postcode}`.toLocaleLowerCase().replace(/ /g, '-'))
}

export class MapHelper {
  static getMapRadius(map: Map): number {
    const mapBoundNorthEast = map.getBounds().getNorthEast()
    return mapBoundNorthEast.distanceTo(map.getCenter())
  }
}

export const getDefaultRadiusForAddress = ({ type, population, street }: ApiAddress): number => {
  if (type === 'municipality') {
    if (population >= 1_000_000) return 10_000
    if (population >= 120_000) return 6_000
    if (population >= 20_000) return 3_000
  }
  if (street) return 500
  return 1_000
}

export const getZoomLevelFromRadius = (radius: number): number => {
  if (radius >= 40_000) return 10
  if (radius >= 10_000) return 12
  if (radius >= 6_000) return 13
  if (radius >= 3_000) return 14
  if (radius >= 1_000) return 15
  return 17
}

import React from 'react'

import RoomRoundedIcon from '@mui/icons-material/RoomRounded'

import L, { LatLng, LatLngExpression, Map } from 'leaflet'
import {
  useMap
} from 'react-leaflet'

import { MapContainer } from '@/components/map'

import SitesMap from './SitesMap'

export interface SitesMapContainerProps {
}

const DEFAULT_ZOOM = 6
const DEFAULT_CENTER: LatLngExpression = [47.088465592015716, 2.3898765708647445]

const SitesMapContainer: React.FC<SitesMapContainerProps> = () => {
  const ref = React.createRef<Map>()

  return (
    <MapContainer
      ref={ref}
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      height="400px"
    >
      <SitesMap />
    </MapContainer>
  )
}

export default SitesMapContainer

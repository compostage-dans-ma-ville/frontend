import React from 'react'

import { LatLngExpression, Map } from 'leaflet'

import { MapContainer, MapContainerProps } from '@/components/map'

import SitesMap, { SitesMapProps } from './SitesMap'

export interface SitesMapContainerProps extends Partial<MapContainerProps>, SitesMapProps {
}

const DEFAULT_ZOOM = 6
const DEFAULT_CENTER: LatLngExpression = [47.088465592015716, 2.3898765708647445]

const SitesMapContainer: React.FC<SitesMapContainerProps> = ({ ...props }) => {
  const ref = React.createRef<Map>()

  return (
    <MapContainer
      { ...props }
      ref={ref}
      center={props.center || DEFAULT_CENTER}
      zoom={props.zoom || DEFAULT_ZOOM}
      height={props.height || '500px'}
    >
      <SitesMap { ...props }/>
    </MapContainer>
  )
}

export default SitesMapContainer

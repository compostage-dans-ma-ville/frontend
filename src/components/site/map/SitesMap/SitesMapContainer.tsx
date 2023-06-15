import React from 'react'

import { Map } from 'leaflet'

import { MapContainer, MapContainerProps } from '@/components/map'
import { DEFAULT_CENTER, DEFAULT_ZOOM } from '@/helpers/MapHelper'

import SitesMap, { SitesMapProps } from './SitesMap'

export interface SitesMapContainerProps extends Partial<MapContainerProps>, SitesMapProps {
}

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

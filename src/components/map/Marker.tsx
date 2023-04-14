import React from 'react'

import {
  Marker as LeafletMarker,
  // eslint-disable-next-line import/named
  MarkerProps as LeafletMarkerProps
} from 'react-leaflet'

export interface MarkerProps extends LeafletMarkerProps {

}

export const Marker: React.FC<MarkerProps> = ({
  icon,
  position,
  children,
  ...restProps
}) => {
  return (
    <LeafletMarker icon={icon} position={position} {...restProps}>
      {children}
    </LeafletMarker>
  )
}

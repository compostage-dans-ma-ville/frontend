import React from 'react'

import L from 'leaflet'
import {
  Marker as LeafletMarker,
  // eslint-disable-next-line import/named
  MarkerProps as LeafletMarkerProps
} from 'react-leaflet'

const DEFAULT_MARKER = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2c-4.2 0-8 3.22-8 8.2 0 3.18 2.45 6.92 7.34 11.23.38.33.95.33 1.33 0C17.55 17.12 20 13.38 20 10.2 20 5.22 16.2 2 12 2zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></svg>'

export interface MarkerProps extends LeafletMarkerProps {

}

export const Marker: React.FC<MarkerProps> = ({
  icon,
  position,
  children,
  ...restProps
}) => {
  const defaultIcon = new L.Icon({
    iconUrl: `data:image/svg+xml,${DEFAULT_MARKER}`,
    iconSize: [40, 40]
  })

  return (
    <LeafletMarker icon={icon || defaultIcon} position={position} {...restProps}>
      {children}
    </LeafletMarker>
  )
}

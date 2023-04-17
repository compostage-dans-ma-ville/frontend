import React from 'react'

import RoomRoundedIcon from '@mui/icons-material/RoomRounded'

import { LatLng } from 'leaflet'
import {
  useMap
} from 'react-leaflet'

import { ApiAddress } from '@/domains/schemas'

import SitesMap from './SitesMap/SitesMap'

export interface AddressMapProps {
  address: ApiAddress,
  onCenterChange: (center: LatLng) => void
}

const AddressMap: React.FC<AddressMapProps> = ({ address, onCenterChange }) => {
  const map = useMap()

  const onDragend = React.useCallback((): void => {
    onCenterChange(map.getCenter())
  }, [map, onCenterChange])

  React.useEffect(() => {
    if (address) {
      onCenterChange(map.getCenter())
      map.setView([address.lat, address.lon])
    }
  }, [address, map, onCenterChange, onDragend])

  React.useEffect(() => {
    map.addEventListener('moveend', onDragend)

    return () => {
      map.removeEventListener('moveend', onDragend)
    }
  }, [map, onDragend])

  return (
    <>
      <RoomRoundedIcon
        color='primary'
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '2em',
          height: '2em',
          zIndex: 100000
        }}
      />
      <SitesMap />
    </>
  )
}

export default AddressMap

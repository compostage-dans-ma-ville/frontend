import React from 'react'

import { LatLng } from 'leaflet'

// get the distance in meters
export const useDistance = (pointA: LatLng | null, pointB: LatLng | null): number | null => {
  const [distance, setDistance] = React.useState<number | null>(null)

  React.useEffect(() => {
    if (pointA && pointB) {
      setDistance(pointA.distanceTo(pointB))
    }
  }, [pointA, pointB])

  return distance
}

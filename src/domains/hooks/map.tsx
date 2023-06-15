import React from 'react'

import { LatLng, LatLngExpression } from 'leaflet'
import { useRouter } from 'next/router'

import { mapLocationQueriesSchema } from '../schemas'

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

interface LocationQuery {radius?: number, center?: LatLngExpression}

export const useLocationQueries = (): {location?: LocationQuery, error?: string} => {
  const router = useRouter()

  const [location, setLocation] = React.useState<LocationQuery | undefined>(undefined)
  const [error, setError] = React.useState<string | undefined>(undefined)

  const latitude = router.query.latitude as string | undefined
  const longitude = router.query.longitude as string | undefined
  const radius = router.query.radius as string | undefined

  React.useEffect(() => {
    try {
      const result = mapLocationQueriesSchema.validateSync({ latitude, longitude, radius })
      setLocation({
        center: (result.latitude && result.longitude)
          ? [result.latitude, result.longitude] as LatLngExpression
          : undefined,
        radius: result.radius
      })
    } catch (catchError) {
      // @ts-expect-error if there is an error then there is a message
      setError(catchError.message as string)
    }
  }, [latitude, longitude, radius])

  return {
    location,
    error
  }
}

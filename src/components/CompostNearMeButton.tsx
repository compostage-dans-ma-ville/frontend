import React from 'react'

import { useRouter } from 'next/router'

import { getAddressFromCoord } from '@/domains/api/addressApi'
import { Routes } from '@/domains/Routes'
import { getAddressPlaceId } from '@/helpers/MapHelper'

import LocationButton, { Location } from './LocationButton'

export interface CompostNearMeButtonProps {}

const CompostNearMeButton: React.FC<CompostNearMeButtonProps> = () => {
  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState(false)

  const onGetLocation = async ({ latitude, longitude }: Location): Promise<void> => {
    setIsLoading(true)
    const { data } = await getAddressFromCoord(latitude, longitude)

    if (data.features[0]) {
      const placeId = getAddressPlaceId(data.features[0].properties)

      const searchParams: Record<string, string> = {}
      searchParams.latitude = latitude.toString()
      searchParams.longitude = longitude.toString()
      searchParams.radius = '500'

      router.push({
        pathname: Routes.ouComposter(placeId),
        query: searchParams
      })
    }
  }

  return (
    <LocationButton
      loading={isLoading}
      onGetLocation={onGetLocation}
    />
  )
}

export default CompostNearMeButton

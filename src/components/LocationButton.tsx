import React from 'react'

import GpsOffRoundedIcon from '@mui/icons-material/GpsOffRounded'
import MyLocationRoundedIcon from '@mui/icons-material/MyLocationRounded'
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton'
import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'

import { useTranslation } from 'next-i18next'

export type Location = { latitude: number; longitude: number }
export interface LocationButtonProps extends Partial<LoadingButtonProps> {
  onGetLocation: (location: Location) => void
}

const LocationButton: React.FC<LocationButtonProps> = ({ onGetLocation, ...props }) => {
  const { t } = useTranslation([
    'common',
    'pages',
    'errors'
  ])

  const [location, setLocation] = React.useState<GeolocationCoordinates | null>(null)
  const [locationError, setLocationError] = React.useState<number | null>(null) // number is actually the errors from GeolocationPositionError
  const [isWaiting, setIsWaiting] = React.useState(false)

  const getLocation = (): void => {
    setIsWaiting(true)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => { setLocation(position.coords) },
        (error) => { setLocationError(error.code) },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      )
    } else {
      setLocationError(GeolocationPositionError.POSITION_UNAVAILABLE)
    }
  }

  const errorTranslation = React.useCallback(() => {
    if (locationError === GeolocationPositionError.PERMISSION_DENIED) {
      return t('errors:location.need_rights')
    }

    return t('errors:location.failed')
  }, [locationError, t])

  React.useEffect(() => {
    setIsWaiting(false)
  }, [location, locationError])

  React.useEffect(() => {
    if (location) {
      onGetLocation({ latitude: location.latitude, longitude: location.longitude })
    }
  }, [location, onGetLocation])

  return (
    <Grid>
      <Grid item>

        <LoadingButton
          {...props}
          variant="contained"
          onClick={getLocation}
          color={locationError ? 'error' : 'primary'}
          startIcon={locationError ? <GpsOffRoundedIcon /> : <MyLocationRoundedIcon />}
          disabled={isWaiting}
        >
          {t('pages:home.compost_near_position')}
        </LoadingButton>
      </Grid>

      {locationError && (

        <Grid item>
          <Alert severity="warning">{errorTranslation()}</Alert>
        </Grid>
      )}
    </Grid>

  )
}

export default LocationButton

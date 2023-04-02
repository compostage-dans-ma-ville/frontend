import React from 'react'

import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import LoadingButton from '@mui/lab/LoadingButton'

import L, { LatLng, LatLngExpression, Map } from 'leaflet'
import { useTranslation } from 'next-i18next'
import {
  useMap
} from 'react-leaflet'

export interface SitesMapProps {
}

const SitesMap: React.FC<SitesMapProps> = () => {
  const map = useMap()
  const { t } = useTranslation([
    'map'
  ])

  const fetchSites = (): void => {

  }

  return (
    <>
      <LoadingButton
        variant="outlined"
        startIcon={<SearchRoundedIcon />}
        color="primary"
        onClick={fetchSites}
        sx={{
          position: 'absolute',
          top: 5,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'white!important',
          zIndex: 1000
        }}
      >
        {t('map:search_in_area')}
      </LoadingButton>
    </>
  )
}

export default SitesMap

import React from 'react'

import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import LoadingButton from '@mui/lab/LoadingButton'

import { useTranslation } from 'next-i18next'
import {
  useMap
} from 'react-leaflet'

import { MapHelper } from '@/helpers/MapHelper'

export interface SitesMapProps {
}

const SitesMap: React.FC<SitesMapProps> = () => {
  const map = useMap()
  const { t } = useTranslation([
    'map'
  ])
  const [displaySearchButton, setDisplaySearchButton] = React.useState(false)

  const fetchSites = (): void => {
    console.log(MapHelper.getMapRadius(map))
  }

  const onDragend = React.useCallback((): void => {
    setDisplaySearchButton(true)
  }, [setDisplaySearchButton])

  React.useEffect(() => {
    map.addEventListener('moveend', onDragend)

    return () => {
      map.removeEventListener('moveend', onDragend)
    }
  }, [map, onDragend])

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
          zIndex: 1000,
          display: displaySearchButton ? 'flex' : 'none'
        }}
      >
        {t('map:search_in_area')}
      </LoadingButton>
    </>
  )
}

export default SitesMap

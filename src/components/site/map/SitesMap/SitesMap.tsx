import React from 'react'

import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded'
import LoadingButton from '@mui/lab/LoadingButton'
import { useTheme } from '@mui/material/styles'

import L from 'leaflet'
// @ts-ignore
// eslint-disable-next-line import/order, import/named
import { MarkerClusterGroup } from 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

import { useTranslation } from 'next-i18next'
import {
  useMap
} from 'react-leaflet'

import { getSites } from '@/domains/api'
import { SmallSite } from '@/domains/schemas'
import LeafletHelper from '@/helpers/Leaflet'
import { MapHelper } from '@/helpers/MapHelper'

export interface SitesMapProps {
  sites?: SmallSite[]
  onSitesChange?: (sites: SmallSite[]) => void
  onSiteClick?: (site: SmallSite) => void
  selectedSite?: SmallSite
}

const SitesMap: React.FC<SitesMapProps> = ({
  sites: sitesProp,
  onSitesChange,
  onSiteClick,
  selectedSite
}) => {
  const map = useMap()
  const { t } = useTranslation([
    'map'
  ])

  const { palette } = useTheme()
  const [sites, setSites] = React.useState<SmallSite[]>(sitesProp || [])
  const [displaySearchButton, setDisplaySearchButton] = React.useState(false)
  const [isFetchingSites, setIsFetchingSite] = React.useState(false)

  const fetchSites = (): void => {
    setIsFetchingSite(true)
    const { lat, lng } = map.getCenter()

    getSites({
      radius: MapHelper.getMapRadius(map),
      latitude: lat,
      longitude: lng
    }).then(({ data }) => {
      setSites(data)
    }).finally(() => {
      setIsFetchingSite(false)
      setDisplaySearchButton(false)
    })
  }

  const onDragend = React.useCallback((): void => {
    setDisplaySearchButton(true)
  }, [setDisplaySearchButton])

  const siteIcon = React.useMemo(
    () => LeafletHelper.getIcon(LeafletHelper.Icon.SITE({ color: palette.primary.main })),
    [palette.primary.main]
  )

  const selectedSiteIcon = React.useMemo(
    () => LeafletHelper.getIcon(LeafletHelper.Icon.SITE({ color: palette.error.main })),
    [palette.error.main]
  )

  const getSiteMarker = React.useCallback((site: SmallSite): L.Marker => {
    const icon = selectedSite?.id === site.id ? selectedSiteIcon : siteIcon

    const marker = new L.Marker(
      new L.LatLng(site.address.latitude, site.address.longitude),
      { icon }
    )

    marker.on('click', () => {
      if (onSiteClick) {
        onSiteClick(site)
      }
    })

    return marker
  }, [selectedSite?.id, selectedSiteIcon, siteIcon, onSiteClick])

  React.useEffect(() => {
    const markers = new MarkerClusterGroup({
      iconCreateFunction: (cluster: any): L.DivIcon => {
        return LeafletHelper.getClusterIcon(
          cluster.getChildCount(),
          { color: palette.primary.main }
        )
      },
      showCoverageOnHover: false
    })

    sites.forEach((site) => {
      markers.addLayer(getSiteMarker(site))
    })

    map.addLayer(markers)

    return () => {
      map.removeLayer(markers)
    }
  }, [sites, map, palette.primary.main, getSiteMarker])

  React.useEffect(() => {
    if (onSitesChange) onSitesChange(sites)
  }, [sites, onSitesChange])

  React.useEffect(() => {
    if (sitesProp) {
      setSites(sitesProp)
    }
  }, [sitesProp])

  React.useEffect(() => {
    map.addEventListener('moveend', onDragend)

    return () => {
      map.removeEventListener('moveend', onDragend)
    }
  }, [map, onDragend])

  React.useEffect(() => {
    fetchSites()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <LoadingButton
        variant="outlined"
        startIcon={<ReplayRoundedIcon />}
        size='small'
        color="primary"
        onClick={fetchSites}
        loading={isFetchingSites}
        sx={{
          position: 'absolute',
          top: 5,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'white!important',
          zIndex: 1000,
          display: displaySearchButton ? 'flex' : 'none',
          whiteSpace: 'nowrap'
        }}
      >
        {t('map:search_in_area')}
      </LoadingButton>
    </>
  )
}

export default SitesMap

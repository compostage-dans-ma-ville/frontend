import React from 'react'

import Alert from '@mui/material/Alert'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'

import { getSite } from '@/domains/api'
import { useLocationQueries, useWindowDimensions } from '@/domains/hooks'
import { Site, SmallSite } from '@/domains/schemas'
import { getZoomLevelFromRadius } from '@/helpers/MapHelper'

import SiteMapWithDrawer from './SiteMapWithDrawer'

const SitesMapWrapper: React.FC = () => {
  const { height } = useWindowDimensions()
  const { error, location } = useLocationQueries()

  const [selectedSite, setSelectedSite] = React.useState<Site | null>(null)

  const getSiteInfos = (siteId: number): void => {
    getSite(siteId).then(({ data }) => setSelectedSite(data))
  }

  const center = (!error && location?.center) ? location?.center : undefined
  const zoom = (!error && location?.radius) ? getZoomLevelFromRadius(location.radius) : undefined
  const loadMap = center && zoom

  return (
    <>
      {loadMap && (
        <SiteMapWithDrawer
          PaperProps={{
            sx: {
              border: 'none',
              borderRadius: '0'
            }
          }}
          height={height}
          center={center}
          zoom={zoom}
          selectedSite={selectedSite as unknown as SmallSite}
          onSiteClick={({ id }): void => getSiteInfos(id)}
        />
      )}

      {error && (
        <Dialog
          fullWidth
          open
        >
          <DialogContent sx={{
            padding: 0
          }}>
            <Alert severity='error'>
              <Typography fontWeight="bold">
                Error: {error}
              </Typography>
            </Alert>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

export default SitesMapWrapper

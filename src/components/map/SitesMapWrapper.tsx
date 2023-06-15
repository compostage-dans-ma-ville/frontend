import React from 'react'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Drawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { getSite } from '@/domains/api'
import { useLocationQueries, useWindowDimensions } from '@/domains/hooks'
import { Routes } from '@/domains/Routes'
import { Site, SmallSite } from '@/domains/schemas'
import { getZoomLevelFromRadius } from '@/helpers/MapHelper'

import SitesMapContainer from '../site/map/SitesMap/SitesMapContainer'
import SiteInfo from '../site/SiteInfo'

const SitesMapWrapper: React.FC = () => {
  const { height } = useWindowDimensions()
  const { error, location } = useLocationQueries()
  const { t } = useTranslation([
    'common',
    'pages'
  ])

  const [selectedSite, setSelectedSite] = React.useState<Site | null>(null)

  const getSiteInfos = (siteId: number): void => {
    getSite(siteId).then(({ data }) => setSelectedSite(data))
  }

  const center = (!error && location?.center) ? location?.center : undefined
  const zoom = (!error && location?.radius) ? getZoomLevelFromRadius(location.radius) : undefined
  const loadMap = center && zoom

  return (
    <>
      <Link href={Routes.home} target='_blank'>
        <img
          src='/images/icon-with-borders.svg'
          style={{
            position: 'absolute',
            bottom: '2px',
            left: '2px',
            width: '50px',
            zIndex: 1000
          }}
        />
      </Link>

      {loadMap && (
        <SitesMapContainer
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

      <Drawer
        anchor="right"
        open={selectedSite !== null}
        onClose={(): void => setSelectedSite(null)}
        ModalProps={{
          keepMounted: true
        }}
        PaperProps={{
          sx: {
            border: 'none'
          }
        }}
      >
        <Card sx={{
          overflowY: 'scroll',
          maxWidth: '85vw',
          border: 'none'
        }}>
          <CardContent>
            <IconButton
              color='secondary'
              onClick={(): void => setSelectedSite(null)}
              sx={{ float: 'right' }}
            >
              <CloseRoundedIcon />
            </IconButton>
            {selectedSite && (
              <>
                <SiteInfo site={selectedSite}/>

                <Grid mt={2} display="flex" justifyContent="center">
                  <Button
                    variant='contained'
                    color='primary'
                    LinkComponent={Link}
                    target='_blank'
                    href={Routes.site(selectedSite.id)}
                    startIcon={<OpenInNewRoundedIcon />}
                    sx={{ width: '100%' }}
                  >
                    {t('common:more_information')}
                  </Button>
                </Grid>
              </>
            )}
          </CardContent>
        </Card>
      </Drawer>
    </>
  )
}

export default SitesMapWrapper

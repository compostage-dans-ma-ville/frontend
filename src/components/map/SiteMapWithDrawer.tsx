import React from 'react'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'

import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { getSite } from '@/domains/api'
import { useIsMobile } from '@/domains/hooks'
import { Routes } from '@/domains/Routes'
import { Site, SmallSite } from '@/domains/schemas'

import SitesMapContainer, { SitesMapContainerProps } from '../site/map/SitesMap/SitesMapContainer'
import SiteInfo from '../site/SiteInfo'

const SiteMapWithDrawer: React.FC<SitesMapContainerProps> = (props) => {
  const { t } = useTranslation([
    'common',
    'pages'
  ])
  const isMobile = useIsMobile()

  const [selectedSite, setSelectedSite] = React.useState<Site | null>(null)

  const getSiteInfos = (siteId: number): void => {
    getSite(siteId).then(({ data }) => setSelectedSite(data))
  }

  return (
    <Paper
      /* @ts-ignore */
      style={{
        ...props?.PaperProps?.sx,
        position: 'relative',
        overflow: 'hidden'
      }}
    >

      <SitesMapContainer
        {...props}
        PaperProps={{ sx: { border: 'none' } }}
        selectedSite={selectedSite as unknown as SmallSite}
        onSiteClick={({ id }): void => getSiteInfos(id)}
      />

      {selectedSite && (
        <>

          <Card sx={{
            position: 'absolute',
            overflowY: 'auto',
            maxWidth: isMobile ? '85%' : '40%',
            top: 0,
            right: 0,
            zIndex: 100000,
            borderTop: 'none',
            borderRight: 'none',
            borderBottom: 'none',
            height: '100%',
            borderRadius: '0',
            maxHeight: '100%'
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
        </>
      )}
    </Paper>
  )
}

export default SiteMapWithDrawer

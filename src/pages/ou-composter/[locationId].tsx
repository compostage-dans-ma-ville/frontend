import * as React from 'react'

import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Drawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { LatLngExpression } from 'leaflet'
import { GetServerSideProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import MainLayout from '@/components/layouts/MainLayout'
import PageTitle from '@/components/PageTitle'
import SiteInfo from '@/components/site/SiteInfo'
import { getSite, getSites } from '@/domains/api'
import { getAddressFromMunicipality, getToNormalizedAddress } from '@/domains/api/addressApi'
import { useIsMobile } from '@/domains/hooks'
import { Routes } from '@/domains/Routes'
import { ApiAddress, Site, SmallSite } from '@/domains/schemas'
import { getDefaultRadiusForAddress, getZoomLevelFromRadius } from '@/helpers/MapHelper'

const SitesMapContainer = dynamic(
  () => import('@/components/site/map/SitesMap/SitesMapContainer'),
  { ssr: false }
)

interface PageProps {
  address: ApiAddress
  center: LatLngExpression | null
  radius: number | null
  sites: SmallSite[]
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ params, query }) => {
  // Example: metz-57000
  const locationId = params?.locationId as unknown as string
  const isLocationIdValid = /-\d{5}$/.test(locationId)

  if (!isLocationIdValid) return { notFound: true }

  try {
    const { data: addressData } = await getAddressFromMunicipality(locationId)
    const { data: sites } = await getSites(query)

    const address = getToNormalizedAddress(addressData)[0]

    if (!address) return { notFound: true }

    return {
      props: {
        ...(await serverSideTranslations('fr', [
          'common',
          'pages',
          'map'
        ])),
        address,
        center: (query.latitude && query.longitude)
          ? [Number(query.latitude), Number(query.longitude)]
          : null,
        radius: query.radius ? Number(query.radius) : null,
        sites
      }
    }
  } catch (error) {
    return { notFound: true }
  }
}

const Page: NextPage<PageProps> = ({
  address, center, radius, sites
}) => {
  const { t } = useTranslation([
    'common',
    'pages'
  ])
  const isMobile = useIsMobile()

  const mapCenter: LatLngExpression = center || [address.lat, address.lon]
  const zoom = (radius && getZoomLevelFromRadius(radius))
    || getZoomLevelFromRadius(getDefaultRadiusForAddress(address))
  const [sitesOnMap, setSitesOnMap] = React.useState<SmallSite[]>(sites)
  const [selectedSite, setSelectedSite] = React.useState<Site | null>(null)

  const getSiteInfos = (siteId: number): void => {
    getSite(siteId).then(({ data }) => setSelectedSite(data))
  }

  return (
    <MainLayout>
      <PageTitle title={[address.name, t('pages:ouComposter.title')]} />

      <Container maxWidth="md">
        <Typography component="h1" variant="h5">
          {t('pages:ouComposter.where')}{' '}{address.name}?
        </Typography>

        <Box mt={2}>
          <SitesMapContainer
            center={mapCenter}
            zoom={zoom}
            sites={sitesOnMap}
            selectedSite={selectedSite as unknown as SmallSite}
            onSitesChange={setSitesOnMap}
            onSiteClick={({ id }): void => getSiteInfos(id)}
          />
        </Box>

        {(selectedSite && !isMobile) && (
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button
                    variant='outlined'
                    color='secondary'
                    size='small'
                    LinkComponent={Link}
                    href={Routes.site(selectedSite.id)}
                    startIcon={<OpenInNewRoundedIcon />}
                  >
                    {t('common:more_information')}
                  </Button>
                </Grid>
              </Grid>
              <SiteInfo site={selectedSite}/>
            </CardContent>
          </Card>
        )}
      </Container>

      {isMobile && (
        <Drawer
          anchor="bottom"
          open={selectedSite !== null}
          onClose={(): void => setSelectedSite(null)}
          ModalProps={{
            keepMounted: true
          }}
        >
          <Card sx={{ overflowY: 'scroll', maxHeight: '70vh' }}>
            <CardContent>
              {selectedSite && (
                <>
                  <SiteInfo site={selectedSite}/>

                  <Grid mt={2} display="flex" justifyContent="center">
                    <Button
                      variant='contained'
                      color='primary'
                      LinkComponent={Link}
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
      )}

    </MainLayout>
  )
}

export default Page

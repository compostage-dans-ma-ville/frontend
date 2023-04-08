import * as React from 'react'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { LatLngExpression } from 'leaflet'
import { GetServerSideProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import MainLayout from '@/components/layouts/MainLayout'
import PageTitle from '@/components/PageTitle'
import { getAddressFromMunicipality, getToNormalizedAddress } from '@/domains/api/addressApi'
import { ApiAddress } from '@/domains/schemas'
import { getDefaultRadiusForAddress, getZoomLevelFromRadius } from '@/helpers/MapHelper'
const SitesMapContainer = dynamic(
  () => import('@/components/site/map/SitesMap/SitesMapContainer'),
  { ssr: false }
)

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ params, query }) => {
  // Example: metz-57000
  const locationId = params?.locationId as unknown as string
  const isLocationIdValid = /-\d{5}$/.test(locationId)

  if (!isLocationIdValid) return { notFound: true }

  try {
    const { data } = await getAddressFromMunicipality(locationId)
    const address = getToNormalizedAddress(data)[0]

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
        radius: query.radius ? Number(query.radius) : null
      }
    }
  } catch (error) {
    return { notFound: true }
  }
}

interface PageProps {
  address: ApiAddress
  center: LatLngExpression | null
  radius: number | null
}

const Page: NextPage<PageProps> = ({ address, center, radius }) => {
  const { t } = useTranslation([
    'common',
    'pages'
  ])

  const mapCenter: LatLngExpression = center || [address.lat, address.lon]
  const zoom = (radius && getZoomLevelFromRadius(radius))
    || getZoomLevelFromRadius(getDefaultRadiusForAddress(address))

  return (
    <MainLayout>
      <PageTitle title={[address.name, t('pages:ouComposter.title')]} />

      <Container maxWidth="md">
        <Typography component="h1" variant="h5">
          {t('pages:ouComposter.where')}{' '}{address.name}?
        </Typography>

        <Box mt={2}>
          <SitesMapContainer center={mapCenter} zoom={zoom} />
        </Box>
      </Container>

    </MainLayout>
  )
}

export default Page

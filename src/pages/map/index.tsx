import * as React from 'react'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import MainLayout from '@/components/layouts/MainLayout'
import EmbedMapLink from '@/components/map/EmbedMapLink'
import PageTitle from '@/components/PageTitle'
import { useWindowDimensions } from '@/domains/hooks'

export const getStaticProps: GetStaticProps<PageProps> = async () => ({
  props: {
    ...(await serverSideTranslations('fr', [
      'common',
      'errors',
      'pages',
      'map'
    ]))
  }
})

const SiteMapWithDrawer = dynamic(
  () => import('@/components/map/SiteMapWithDrawer'),
  { ssr: false }
)

const MapContainer: React.FC = () => {
  const { height } = useWindowDimensions()

  return (
    <SiteMapWithDrawer height={height - (height * 0.2)} />
  )
}

const Map = dynamic(
  () => Promise.resolve(MapContainer),
  { ssr: false }
)

interface PageProps {
}

const Page: React.FC<PageProps> = () => {
  const { t } = useTranslation([
    'common',
    'map'
  ])

  return (
    <MainLayout>
      <PageTitle title={[t('map:the_map')]} />

      <Container maxWidth="xl">
        <Typography variant='h1'>{t('map:the_map')}</Typography>

        <Map />

        <Grid container justifyContent="flex-end" mt={1}>
          <EmbedMapLink />
        </Grid>
      </Container>
    </MainLayout>
  )
}

export default Page

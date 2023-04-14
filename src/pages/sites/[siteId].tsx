import * as React from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'

import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import MainLayout from '@/components/layouts/MainLayout'
import PageTitle from '@/components/PageTitle'
import SiteCarousel from '@/components/site/SiteCarousel'
import SiteInfo from '@/components/site/SiteInfo'
import { getSite } from '@/domains/api'
import { Site } from '@/domains/schemas'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await getSite(params?.siteId as string)
  const site = await res?.data

  if (!site) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      ...(await serverSideTranslations('fr', [
        'common',
        'pages',
        'errors'
      ])),
      site
    }
  }
}

interface SiteProps {
  site: Site
}

const SitePage: NextPage<SiteProps> = ({ site }) => {
  const { t } = useTranslation([
    'common',
    'pages'
  ])

  return (
    <MainLayout>
      <PageTitle title={[site.name, t('pages:site.composting_site')]} />

      <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Card>
          <SiteCarousel images={site.images}/>

          <CardContent>
            <SiteInfo site={site}/>
          </CardContent>
        </Card>
      </Container>

    </MainLayout>
  )
}

export default SitePage

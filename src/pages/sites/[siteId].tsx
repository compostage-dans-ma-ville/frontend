import * as React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import MainLayout from '@/components/layouts/MainLayout'
import { GetServerSideProps, NextPage } from 'next'
import PageTitle from '@/components/PageTitle'
import { useTranslation } from 'react-i18next'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import { getSite } from '@/domains/api'
import { Site } from '@/domains/schemas'

import Container from '@mui/material/Container'
import SiteCarousel from '@/components/site/SiteCarousel'
import Typography from '@mui/material/Typography'

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

interface UserProfileProps {
  site: Site
}

const UserProfile: NextPage<UserProfileProps> = ({ site }) => {
  const { t } = useTranslation([
    'common'
  ])

  return (
    <MainLayout>
      <PageTitle title={t('common:profile')} />

      <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Card>
          <SiteCarousel images={site.images}/>

          <CardContent>
            <Typography variant="h4" component="h1" >
              {site.name}
            </Typography>

            {site.description && (
              <Typography variant="body1" color="text.secondary" marginLeft={2} marginTop={2}>
                {site.description}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Container>

    </MainLayout>
  )
}

export default UserProfile

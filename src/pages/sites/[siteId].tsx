import * as React from 'react'

import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Typography from '@mui/material/Typography'

import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import MainLayout from '@/components/layouts/MainLayout'
import PageTitle from '@/components/PageTitle'
import ScheduleListItem from '@/components/site/ScheduleListItem'
import SiteCarousel from '@/components/site/SiteCarousel'
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

interface UserProfileProps {
  site: Site
}

const UserProfile: NextPage<UserProfileProps> = ({ site }) => {
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
            <Typography variant="h4" component="h1" >
              {site.name}
            </Typography>

            {site.description && (
              <Typography variant="body1" color="text.secondary" marginLeft={2} marginTop={2}>
                {site.description}
              </Typography>
            )}

            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <ListItem alignItems="center">
                <ListItemAvatar>
                  <LocationOnRoundedIcon fontSize="large" color="primary" />
                </ListItemAvatar>

                <Typography fontWeight="bold">
                  {site.address.houseNumber}&nbsp;
                  {site.address.streetName},&nbsp;
                  {site.address.zipCode}&nbsp;
                  {site.address.city}
                </Typography>

              </ListItem>
              <Divider variant="inset" component="li" />
              <ScheduleListItem schedules={site.schedules}/>
            </List>
          </CardContent>
        </Card>
      </Container>

    </MainLayout>
  )
}

export default UserProfile

import * as React from 'react'

import AddLocationRoundedIcon from '@mui/icons-material/AddLocationRounded'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Can from '@/components/Can'
import CompostNearMeButton from '@/components/CompostNearMeButton'
import CompostSearchbar from '@/components/CompostSearchbar'
import MainLayout from '@/components/layouts/MainLayout'
import SeoMeta from '@/components/SeoMeta'
import { Routes } from '@/domains/Routes'

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    ...(await serverSideTranslations('fr', [
      'common',
      'errors',
      'pages',
      'map'
    ]))
  }
})

const Home: React.FC = () => {
  const { t } = useTranslation([
    'common',
    'pages'
  ])

  return (
    <MainLayout>
      <SeoMeta title={t('common:welcome')}/>

      <Container maxWidth="md">

        <Can I='create' a='site'>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button
                variant='contained'
                LinkComponent={Link}
                href={Routes.sitesNew}
                startIcon={<AddLocationRoundedIcon />}
              >
                {t('pages:home.refer_site')}
              </Button>
            </Grid>
          </Grid>
        </Can>

        <Grid item mt={4} >
          <CompostNearMeButton />
        </Grid>

        <Grid item mt={4} >
          <CompostSearchbar />
        </Grid>
      </Container>

    </MainLayout>
  )
}

export default Home

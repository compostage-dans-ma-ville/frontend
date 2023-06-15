import * as React from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useSnackbar } from 'notistack'

import CanOrLogin from '@/components/authentication/CanOrLogin'
import MainLayout from '@/components/layouts/MainLayout'
// eslint-disable-next-line import/order
import PageTitle from '@/components/PageTitle'

import EditSiteForm from '@/components/site/forms/EditSiteForm'
import { useCreateSite } from '@/domains/api/hooks'
import { Routes } from '@/domains/Routes'
import { CreateSite } from '@/domains/schemas'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      ...(await serverSideTranslations('fr', [
        'common',
        'pages',
        'errors',
        'authentication',
        'map'
      ]))
    }
  }
}

const SitePage: NextPage = () => {
  const { t } = useTranslation([
    'common',
    'pages',
    'errors'
  ])
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const { trigger, isMutating } = useCreateSite()

  const onSubmit = (siteData: CreateSite): void => {
    trigger(siteData).then((res) => {
      if (res?.data) {
        router.push(Routes.site(res.data.id))
      }
    }).catch(() => {
      enqueueSnackbar(t('errors:unknow_error'), { variant: 'error' })
    })
  }

  return (
    <MainLayout>
      <PageTitle title={[t('pages:site.site_creation')]} />

      <CanOrLogin I='create' a='site'>
        <Container maxWidth="md">
          <Card>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

              <Typography variant='h1'>{t('pages:site.site_creation')}</Typography>
              <EditSiteForm onSubmit={onSubmit} isLoading={isMutating} />
            </CardContent>
          </Card>
        </Container>
      </CanOrLogin>
    </MainLayout>
  )
}

export default SitePage

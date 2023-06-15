import React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import MainLayout from '@/components/layouts/MainLayout'
import PageTitle from '@/components/PageTitle'
import { titleFont } from '@/styles/fonts'

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    ...(await serverSideTranslations('fr', [
      'common',
      'pages'
    ]))
  }
})

const Custom404: React.FC = () => {
  const { t } = useTranslation([
    'pages'
  ])

  return (
    <MainLayout>
      <PageTitle title="404" />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        my: 10
      }}>
        <Typography variant="h1">404</Typography>
        <Typography sx={{ mb: 2 }} fontSize="1.5rem" fontFamily={titleFont.style.fontFamily}>{t('pages:404.not_found')}</Typography>
        <Button LinkComponent={Link} href='/' variant="contained">{t('common:back_home')}</Button>
      </Box>
    </MainLayout>
  )
}

export default Custom404

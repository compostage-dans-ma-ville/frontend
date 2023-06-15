import * as React from 'react'

import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import PageTitle from '@/components/PageTitle'
const SitesMapWrapper = dynamic(
  () => import('@/components/map/SitesMapWrapper'),
  { ssr: false }
)

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    ...(await serverSideTranslations('fr', [
      'common',
      'pages',
      'errors',
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
    <>
      <PageTitle title={t('map:the_map')} />
      <SitesMapWrapper />
    </>
  )
}

export default Home

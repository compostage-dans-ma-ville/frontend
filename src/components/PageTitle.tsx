import * as React from 'react'

import Head from 'next/head'
import { useTranslation } from 'next-i18next'

export interface PageTitleProps {
  title: string | string[]
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  const { t } = useTranslation([
    'common'
  ])

  const stringTitle = Array.isArray(title) ? title.join(' • ') : title

  return (
    <Head>
      <title>{`${stringTitle} • ${t('common:app_name')}`}</title>
    </Head>
  )
}

export default PageTitle

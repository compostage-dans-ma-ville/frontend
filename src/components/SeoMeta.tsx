import React from 'react'

import { useTranslation } from 'next-i18next'
import { NextSeo, NextSeoProps } from 'next-seo'

import { BASE_URL } from '@/domains/utils'

export interface SeoMetaProps extends Omit<NextSeoProps, 'title'> {
  title: string | string[]
}

const SeoMeta: React.FC<SeoMetaProps> = ({
  title,
  description
}) => {
  const { t } = useTranslation([
    'common'
  ])

  const stringTitle = `${Array.isArray(title) ? title.join(' • ') : title} • ${t('common:app_name')}`

  return (
    <NextSeo
      title={stringTitle}
      description={description || t('common:app_description')}
      openGraph={{
        title: stringTitle,
        description,
        images: [
          {
            url: `${BASE_URL}/images/meta-logo.png`,
            width: 1200,
            height: 630,
            alt: t('common:app_name'),
            type: 'image/png'
          }
        ],
        siteName: t('common:app_name')
      }}
    />
  )
}

export default SeoMeta

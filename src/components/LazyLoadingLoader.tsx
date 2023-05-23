import React from 'react'

import Typography from '@mui/material/Typography'

import { useTranslation } from 'next-i18next'

export interface LazyLoadingLoaderProps {

}
const LazyLoadingLoader: React.FC<LazyLoadingLoaderProps> = () => {
  const { t } = useTranslation([
    'common'
  ])

  return (
    <Typography textAlign="center" fontWeight="bold">... {t('common:loading')}</Typography>
  )
}

export default LazyLoadingLoader

import React from 'react'

import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import Button, { ButtonProps } from '@mui/material/Button'

import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { Routes } from '@/domains/Routes'

const EmbedMapLink: React.FC<ButtonProps> = (props) => {
  const { t } = useTranslation([
    'common',
    'map'
  ])

  return (
    <Link href={Routes.embeddedMapIntegration} target='_blank'>
      <Button
        {...props}
        sx={{
          border: 'none!important',
          py: 0,
          ...props?.sx
        }}
        variant='outlined'
        color='secondary'
        startIcon={<OpenInNewRoundedIcon />}
      >
        {t('map:embed_map')}
      </Button>
    </Link>
  )
}

export default EmbedMapLink

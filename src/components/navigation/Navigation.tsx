import * as React from 'react'

import Box from '@mui/material/Box'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Routes } from '@/domains/Routes'

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const Navigation: React.FC = () => {
  const { t } = useTranslation([
    'common'
  ])
  const router = useRouter()

  const navigations = [
    {
      label: t('common:the_map'),
      path: Routes.map
    }
  ]

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: { xs: 'column', md: 'row' } }}>
      {navigations.map(({ path, label }) => (
        <Box
          component={Link}
          key={path}
          href={path}
          sx={{
            position: 'relative',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: { xs: 0, md: 3 },
            mb: { xs: 3, md: 0 },
            fontSize: { xs: '1.4rem', md: '1.4rem' },
            ...(router.pathname.startsWith(path) && {
              color: 'primary.main',
              fontWeight: 'bold'
            }),

            '&:hover': {
              color: 'primary.main',
              '&>div': {
                display: 'block'
              }
            }
          }}
        >
          {label}
        </Box>
      ))}
    </Box>
  )
}

export default Navigation

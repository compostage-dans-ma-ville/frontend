import * as React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { useMe } from '@/contexts'
import { Routes } from '@/domains/Routes'

import UserMenu from './UserMenu'

const AuthNavigation: React.FC = () => {
  const { t } = useTranslation('common')

  const { me: user, logout } = useMe()

  return (
    <Box sx={{
      minWidth: '360px',
      '& button:first-child': { mr: 2 },
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      {user
        ? <UserMenu user={user} logout={logout} />
        : (
          <>
            <Link href={Routes.login}>
              <Button variant="outlined">
                {t('login')}
              </Button>
            </Link>
            <Link href={Routes.register}>
              <Button variant="contained">{t('signIn')}</Button>
            </Link>
          </>
        )}

    </Box>
  )
}

export default AuthNavigation

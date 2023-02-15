import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useUser } from '@/domains/contexts'
import UserMenu from './UserMenu'

const AuthNavigation: React.FC = () => {
  const { t } = useTranslation('common')

  const { user, logout } = useUser()

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
            <Link href="/authentification/login">
              <Button variant="outlined">
                {t('login')}
              </Button>
            </Link>
            <Link href="/authentification/register">
              <Button variant="contained">{t('signIn')}</Button>
            </Link>
          </>
        )}

    </Box>
  )
}

export default AuthNavigation

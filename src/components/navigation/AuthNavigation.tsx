import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { useTranslation } from 'next-i18next'
import Link from 'next/link'

const AuthNavigation: React.FC = () => {
  const { t } = useTranslation('common')

  return (
    <Box sx={{ '& button:first-child': { mr: 2 } }}>
      <Link href="/authentification/login">
        <Button variant="outlined">
          {t('login')}
        </Button>
      </Link>
      <Link href="/authentification/register">
        <Button variant="contained">{t('signIn')}</Button>
      </Link>
    </Box>
  )
}

export default AuthNavigation

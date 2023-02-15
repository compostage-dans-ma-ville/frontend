import React from 'react'

import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import Avatar from '@mui/material/Avatar'
import MailOutlineIcon from '@mui/icons-material/MailOutline'

export const CheckEmail: React.FC = () => {
  const { t } = useTranslation([
    'common',
    'authentification',
    'errors',
    'pages'
  ])

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <MailOutlineIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {t('authentification:check_email')}
      </Typography>
      <Typography sx={{ my: 2 }} align="center">
        {t('authentification:password_reset_link_send')}
      </Typography>
    </>
  )
}

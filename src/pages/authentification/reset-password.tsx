import * as React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import MainLayout from '@/components/layouts/MainLayout'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import PageTitle from '@/components/PageTitle'
import { useRouter } from 'next/router'
import { ResetPassword as ResetPasswordComponent } from '@/components/authentification/ResetPassword'
import { Alert } from '@mui/lab'

import Avatar from '@mui/material/Avatar'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import Link from 'next/link'

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    ...(await serverSideTranslations('fr', [
      'common',
      'authentification',
      'errors',
      'pages'
    ]))
  }
})

const ResetPassword: React.FC = () => {
  const { t } = useTranslation([
    'common',
    'authentification',
    'errors',
    'pages'
  ])

  const router = useRouter()

  const token = router.query.token as string

  return (
    <MainLayout>
      <PageTitle title={t('pages:forgot_password.title')}/>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <VpnKeyOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('authentification:reset_password')}
          </Typography>
          {token
            ? <ResetPasswordComponent token={token} />
            : (
              <>
                <Alert severity="error" sx={{ mt: 2 }}>{t('errors:invalid_reset_password_token')}</Alert>
                <Link href="/authentification/forgot-password">
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {t('authentification:reset_password')}
                  </Button>
                </Link>

              </>
            )}
        </Box>
      </Container>
    </MainLayout>
  )
}

export default ResetPassword

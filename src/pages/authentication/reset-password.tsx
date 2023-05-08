import * as React from 'react'

import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined'
import Alert from '@mui/lab/Alert'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ResetPassword as ResetPasswordComponent } from '@/components/authentication/ResetPassword'
import MainLayout from '@/components/layouts/MainLayout'
import PageTitle from '@/components/PageTitle'

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    ...(await serverSideTranslations('fr', [
      'common',
      'authentication',
      'errors',
      'pages'
    ]))
  }
})

const ResetPassword: React.FC = () => {
  const { t } = useTranslation([
    'common',
    'authentication',
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
            {t('authentication:reset_password')}
          </Typography>
          {token
            ? <ResetPasswordComponent token={token} />
            : (
              <>
                <Alert severity="error" sx={{ mt: 2 }}>{t('errors:invalid_reset_password_token')}</Alert>
                <Link href="/authentication/forgot-password">
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {t('authentication:reset_password')}
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

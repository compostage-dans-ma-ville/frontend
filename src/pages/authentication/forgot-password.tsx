import * as React from 'react'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ForgotPassword as ForgotPasswordComponent } from '@/components/authentication/ForgotPassword'
import { ResetPassword } from '@/components/authentication/ResetPassword'
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

const ForgotPassword: React.FC = () => {
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
          {token ? <ResetPassword token={token} /> : <ForgotPasswordComponent />}
        </Box>
      </Container>
    </MainLayout>
  )
}

export default ForgotPassword

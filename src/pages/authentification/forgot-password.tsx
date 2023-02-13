import * as React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import MainLayout from '@/components/layouts/MainLayout'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import PageTitle from '@/components/PageTitle'
import { ForgotPassword as ForgotPasswordComponent } from '@/components/authentification/ForgotPassword'
import { useRouter } from 'next/router'
import { ResetPassword } from '@/components/authentification/ResetPassword'

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

const ForgotPassword: React.FC = () => {
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
          {token ? <ResetPassword token={token} /> : <ForgotPasswordComponent />}
        </Box>
      </Container>
    </MainLayout>
  )
}

export default ForgotPassword

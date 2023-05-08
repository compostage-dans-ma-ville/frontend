import * as React from 'react'

import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import LinearProgress from '@mui/material/LinearProgress'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import MainLayout from '@/components/layouts/MainLayout'
import PageTitle from '@/components/PageTitle'
import { activateEmailFromToken } from '@/domains/api'

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {
    ...(await serverSideTranslations('fr', [
      'common',
      'authentication',
      'errors',
      'pages'
    ]))
  }
})

const ActivateToken: React.FC = () => {
  const { t } = useTranslation([
    'common',
    'authentication',
    'errors',
    'pages'
  ])
  const router = useRouter()
  const { token } = router.query

  const [emailValidated, setEmailValidated] = React.useState<boolean | null>(null) // null is for loading
  const isLoading = emailValidated === null

  React.useEffect(() => {
    if (token) {
      activateEmailFromToken(token as string)
        .then(() => { setEmailValidated(true) })
        .catch(() => { setEmailValidated(false) })
    }
  }, [token])

  return (
    <MainLayout>
      <PageTitle title={t('pages:forgot_password.title')}/>
      <Container maxWidth="lg">
        <Paper sx={{ overflow: 'hidden', width: '100%' }}>
          {isLoading ? (
            <>
              <LinearProgress />
              <Typography
                variant='h5'
                color="primary.main"
                component="h2"
                sx={{
                  margin: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {t('authentication:email_check')}
              </Typography>
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                py: 4,
                px: 2
              }}
            >
              <Avatar
                sx={{
                  m: 1,
                  bgcolor: emailValidated ? 'success.main' : 'error.main',
                  width: 70,
                  height: 70
                }}
              >
                {emailValidated
                  ? <MarkEmailReadRoundedIcon sx={{ width: 50, height: 50 }} />
                  : <ErrorOutlineRoundedIcon sx={{ width: 50, height: 50 }} />
                }
              </Avatar>

              <Typography
                sx={{ mt: 2 }}
                textAlign='center'
                component="h2"
                variant='h5'
                fontWeight="bold"
              >
                {t(emailValidated ? 'authentication:email_checked' : 'authentication:email_not_checked')}
              </Typography>

              <Typography
                sx={{ mt: 2 }}
                textAlign='center'
              >
                {t(emailValidated ? 'authentication:email_checked_description' : 'authentication:email_not_checked_description')}
              </Typography>

              {emailValidated && (
                <Link href="/">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                  >
                    {t('common:back_home')}
                  </Button>
                </Link>
              )}
            </Box>
          )}
        </Paper>
      </Container>
    </MainLayout>
  )
}

export default ActivateToken

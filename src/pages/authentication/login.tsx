import * as React from 'react'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import MuiLink from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { yupResolver } from '@hookform/resolvers/yup'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useForm } from 'react-hook-form'

import MainLayout from '@/components/layouts/MainLayout'
import LoadingButton from '@/components/LoadingButton'
import PageTitle from '@/components/PageTitle'
import { useMe } from '@/contexts'
import { loginUser } from '@/domains/api'
import { AuthService } from '@/domains/AuthService'
import { Routes } from '@/domains/Routes'
import { LoginUser, loginUserSchema } from '@/domains/schemas/user'

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

const Login: React.FC = () => {
  const { t } = useTranslation([
    'common',
    'authentication',
    'errors',
    'pages'
  ])
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginUser>({
    mode: 'onChange',
    resolver: yupResolver(loginUserSchema)
  })

  const router = useRouter()
  const redirection = router.query.redirect_url as string
  const { fetch } = useMe()
  const [loginErrored, setLoginErrored] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const login = React.useCallback((user: LoginUser): void => {
    setIsLoading(true)
    loginUser(user).then(({ data }) => {
      AuthService.setToken(data.token)
      fetch()
      router.push(redirection || '/')
      setIsLoading(false)
    }).catch(() => {
      setLoginErrored(true)
      setIsLoading(false)
    // TODO: handle all errors
    })
  }, [fetch, redirection, router])

  return (
    <MainLayout>
      <PageTitle title={t('pages:login.title')}/>
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h1">
            {t('authentication:login_title')}
          </Typography>
          <Box component="form" onSubmit={handleSubmit(login)} noValidate sx={{ mt: 1 }}>
            {loginErrored && <Alert severity="error" sx={{ my: 3 }}>{t('errors:invalid_login')}</Alert>
            }
            <TextField
              {...register('email')}
              margin="normal"
              required
              fullWidth
              id="email"
              label={t('common:email_addresse')}
              name="email"
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              helperText={errors?.email?.message && t(errors.email.message as string)}
            />
            <TextField
              {...register('password')}
              margin="normal"
              required
              fullWidth
              name="password"
              label={t('common:password')}
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors?.password?.message && t(errors.password.message as string)}
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={isLoading}
              sx={{ mt: 3, mb: 2 }}
            >
              {t('authentication:login')}
            </LoadingButton>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <MuiLink href={Routes.register} component={Link} variant="body2">
                  {t('authentication:no_account')}
                </MuiLink>
              </Grid>
              <Grid item>
                <MuiLink href="/authentication/forgot-password" component={Link} variant="body2">
                  {t('authentication:forgot_pwd')}
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </MainLayout>
  )
}

export default Login

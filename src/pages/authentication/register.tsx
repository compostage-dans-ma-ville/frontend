import * as React from 'react'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import MuiLink from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError } from 'axios'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'

import MainLayout from '@/components/layouts/MainLayout'
import PageTitle from '@/components/PageTitle'
import { useMe, useValidateEmailDialog } from '@/contexts'
import { registerUser as apiRegisterUser } from '@/domains/api'
import { AuthService } from '@/domains/AuthService'
import { Routes } from '@/domains/Routes'
import { UserCreation, userCreationSchema } from '@/domains/schemas/user'

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

const Register: React.FC = () => {
  const { t } = useTranslation([
    'common',
    'authentication',
    'errors',
    'pages'
  ])
  const { enqueueSnackbar } = useSnackbar()
  const { fetch } = useMe()
  const { open: openValidateEmailDialog } = useValidateEmailDialog()

  const router = useRouter()
  const redirection = router.query.redirect_url as string

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserCreation>({
    resolver: yupResolver(userCreationSchema)
  })

  const registerUser = (user: UserCreation): void => {
    // TODO: Extract logic
    apiRegisterUser(user).then(({ data }) => {
      AuthService.setToken(data.token)
      fetch()
      router.push(redirection || '/')
      openValidateEmailDialog()
    }).catch((error: AxiosError) => {
      if (error?.response?.status === 409) {
        enqueueSnackbar(t('errors:email_already_exist'), { variant: 'error' })
      } else {
        enqueueSnackbar(t('errors:unknow_error'), { variant: 'error' })
      }
    })
  }

  return (
    <MainLayout>
      <PageTitle title={t('pages:register.title')} />
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
            {t('authentication:create_account')}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(registerUser)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('lastName')}
                  required
                  fullWidth
                  id="lastName"
                  error={!!errors.lastName}
                  label={t('common:lastname')}
                  name="lastName"
                  autoComplete="family-name"
                  helperText={errors?.lastName?.message && t(errors.lastName.message as string)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('firstName')}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  label={t('common:firstname')}
                  error={!!errors.firstName}
                  helperText={errors?.firstName?.message && t(errors.firstName.message as string)}
                  id="firstName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('email')}
                  required
                  fullWidth
                  id="email"
                  label={t('common:email_addresse')}
                  name="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message && t(errors.email.message as string)}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('password')}
                  required
                  fullWidth
                  name="password"
                  label={t('common:password')}
                  type="password"
                  id="password"
                  error={!!errors.password}
                  autoComplete="new-password"
                  helperText={errors?.password?.message && t(errors.password.message as string)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('confirmPassword')}
                  required
                  fullWidth
                  name="confirmPassword"
                  label={t('common:confirm_password')}
                  type="password"
                  id="confirmPassword"
                  error={!!errors.confirmPassword}
                  autoComplete="new-password"
                  helperText={errors.confirmPassword && t('errors:pwd_not_same')}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t('authentication:create_account_action')}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <MuiLink href={Routes.login} component={Link} variant="body2">
                  {t('authentication:already_account')}
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </MainLayout>
  )
}
export default Register

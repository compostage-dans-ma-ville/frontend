import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import MuiLink from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import MainLayout from '@/components/layouts/MainLayout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { UserCreation, userCreationSchema } from '@/domains/user'
import { useSnackbar } from 'notistack'

import axios, { AxiosError } from 'axios'

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    ...(await serverSideTranslations('fr', [
      'common',
      'authentification',
      'errors'
    ]))
  }
})

const Register: React.FC = () => {
  const { t } = useTranslation([
    'common',
    'authentification',
    'errors'
  ])
  const { enqueueSnackbar } = useSnackbar()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(userCreationSchema)
  })

  const registerUser = (user: UserCreation): void => {
    axios.post('/users', user).then((response) => {
      console.log(response.data)
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
          <Typography component="h1" variant="h5">
            {t('authentification:create_account')}
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
                  autoFocus
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
              {t('authentification:create_account_action')}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <MuiLink href="/authentification/login" component={Link} variant="body2">
                  {t('authentification:already_account')}
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

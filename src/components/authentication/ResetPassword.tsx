import React from 'react'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'

import LoadingButton from '@/components/LoadingButton'
import { updatePassword as apiUpdatePassword } from '@/domains/api'
import { Routes } from '@/domains/Routes'
import { UpdatePassword, updatePasswordSchema } from '@/domains/schemas'

export interface ResetPasswordProps {
  token: string
}
export const ResetPassword: React.FC<ResetPasswordProps> = ({ token }) => {
  const { t } = useTranslation([
    'common',
    'authentication',
    'errors',
    'pages'
  ])

  const [errored, setErrored] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdatePassword>({
    mode: 'onChange',
    resolver: yupResolver(updatePasswordSchema)
  })

  const resetPassword = (data: UpdatePassword): void => {
    setIsLoading(true)

    apiUpdatePassword({ ...data, token }).then(() => {
      router.push(Routes.login)
    }).catch(() => {
      setErrored(true)
      setIsLoading(false)
    })
  }

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(resetPassword)} noValidate sx={{ mt: 1 }}>
        {errored && (
          <Alert severity="error" sx={{ my: 3 }}>
            {t('errors:unknow_error')}
          </Alert>
        )}

        <Grid container spacing={2} sx={{ my: 2 }}>
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
              helperText={errors.confirmPassword && t('errors:pwd_not_same')}
            />
          </Grid>
        </Grid>
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          loading={isLoading}
          sx={{ mt: 3, mb: 2 }}
        >
          {t('authentication:reset_password')}
        </LoadingButton>
      </Box>
    </>
  )
}

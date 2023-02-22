import React from 'react'

import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'

import LoadingButton from '@/components/LoadingButton'
import { resetPassword as apiResetPassword } from '@/domains/api'
import { ForgotPassword as ForgotPasswordDto, forgotPasswordSchema } from '@/domains/schemas'

import { CheckEmail } from './CheckEmail'

export const ForgotPassword: React.FC = () => {
  const { t } = useTranslation([
    'common',
    'authentification',
    'errors',
    'pages'
  ])

  const [loginErrored, setLoginErrored] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isEmailSend, setIsEmailSend] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordDto>({
    mode: 'onChange',
    resolver: yupResolver(forgotPasswordSchema)
  })

  const resetPassword = (data: ForgotPasswordDto): void => {
    setIsLoading(true)

    apiResetPassword(data).then(() => {
      setIsEmailSend(true)
    }).catch(() => {
      setLoginErrored(true)
      setIsLoading(false)
      // TODO: handle all errors
    })
  }

  return (
    <>
      {isEmailSend ? <CheckEmail /> : (<>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <VpnKeyOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('pages:forgot_password.title')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(resetPassword)} noValidate sx={{ mt: 1 }}>
          {loginErrored && <Alert severity="error" sx={{ my: 3 }}>{t('errors:invalid_login')}</Alert>
          }
          <Typography sx={{ my: 2 }}>
            {t('pages:forgot_password.description')}
          </Typography>

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
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            {t('authentification:reset_password')}
          </LoadingButton>
        </Box>
      </>)}
    </>
  )
}

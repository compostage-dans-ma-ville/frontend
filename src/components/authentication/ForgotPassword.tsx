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
import { useSendResetPasswordEmail } from '@/domains/api/hooks'
import { ForgotPassword as ForgotPasswordDto, forgotPasswordSchema } from '@/domains/schemas'

export const ForgotPassword: React.FC = () => {
  const { t } = useTranslation([
    'common',
    'authentication',
    'errors',
    'pages'
  ])

  const {
    trigger: sendResetPasswordEmail, data, isMutating, error
  } = useSendResetPasswordEmail()
  const isEmailSent = data !== undefined

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<ForgotPasswordDto>({
    mode: 'onChange',
    resolver: yupResolver(forgotPasswordSchema)
  })

  const resetPassword = ({ email }: ForgotPasswordDto): void => {
    // TODO: check why I need to catch the useSwrMutation
    sendResetPasswordEmail(email).catch(() => {})
  }

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <VpnKeyOutlinedIcon />
      </Avatar>

      <Typography variant="h1">
        {t(isEmailSent ? 'authentication:check_email' : 'pages:forgot_password.title')}
      </Typography>

      <Box component="form" onSubmit={handleSubmit(resetPassword)} noValidate sx={{ mt: 1 }}>
        {error && (
          <Alert severity="error" sx={{ my: 3 }}>{t('errors:send_reset_password')}</Alert>
        )}

        {isEmailSent
          ? (
            <Alert severity="success" sx={{ my: 3 }}>
              <Typography
                dangerouslySetInnerHTML={{ __html: t('authentication:reset_email_sent', { email: getValues('email') }) }}
              />
            </Alert>
          )
          : (
            <>
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
                loading={isMutating}
                sx={{ mt: 3, mb: 2 }}
              >
                {t('authentication:reset_password')}
              </LoadingButton>
            </>
          )}

      </Box>
    </>
  )
}

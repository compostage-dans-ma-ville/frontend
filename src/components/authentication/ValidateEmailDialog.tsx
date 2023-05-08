import React from 'react'

import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'

import { useTranslation } from 'next-i18next'
import { useSnackbar } from 'notistack'

import { useMe, useValidateEmailDialog } from '@/contexts'
import { sendEmailValidationToken } from '@/domains/api'
const ValidateEmailDialog: React.FC = () => {
  const { t } = useTranslation([
    'common'
  ])
  const { isOpen, close } = useValidateEmailDialog()
  const { me } = useMe()
  const { enqueueSnackbar } = useSnackbar()

  const [isEmailSent, setIsEmailSent] = React.useState(false)

  const onSendEmail = (): void => {
    sendEmailValidationToken().then(() => {
      enqueueSnackbar(t('common:email_successfully_sent'), { variant: 'success' })
    }).catch(() => {
      enqueueSnackbar(t('errors:unknow_error'), { variant: 'error' })
      close()
    }).finally(() => {
      setIsEmailSent(true)
    })
  }

  return (
    <Dialog
      maxWidth='xl'
      fullWidth={true}
      open={isOpen}
      onClose={close}
    >
      <DialogContent>
        <Container maxWidth='md'>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{
              m: 1, bgcolor: 'secondary.main', width: 70, height: 70
            }} >
              <MarkEmailReadRoundedIcon sx={{ width: 50, height: 50 }} />
            </Avatar>

            <Typography
              sx={{ mt: 2 }}
              textAlign='center'
              dangerouslySetInnerHTML={{ __html: t('common:check_inbox_detail', { email: me?.email }) }}
            />

            <Button
              onClick={onSendEmail}
              sx={{ mt: 2 }}
              disabled={isEmailSent}
            >
              {t('common:resend_email')}
            </Button>
          </Box>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button
          variant='outlined'
          onClick={close}
          color='secondary'
        >
          {t('common:valide_email_later')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ValidateEmailDialog

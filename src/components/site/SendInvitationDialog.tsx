import React from 'react'

import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError } from 'axios'
import { useTranslation } from 'next-i18next'
import { useSnackbar } from 'notistack'
import { useForm, useWatch } from 'react-hook-form'

import { sendSiteInvitation } from '@/domains/api'
import {
  DESCRIPTION_MAX_LENGTH, SendInvitation, Site, sendInvitationSchema
} from '@/domains/schemas'

export interface SendInvitationDialogProps {
  site: Site
  isOpen: boolean
  close: () => void
}

const SendInvitationDialog: React.FC<SendInvitationDialogProps> = ({
  isOpen, close, site
}) => {
  const { t } = useTranslation([
    'pages',
    'common'
  ])
  const { enqueueSnackbar } = useSnackbar()
  const {
    control,
    register,
    handleSubmit,
    formState: { isDirty, errors },
    reset
  } = useForm<SendInvitation>({
    resolver: yupResolver(sendInvitationSchema)
  })

  const sendInvitation = (data: SendInvitation): void => {
    sendSiteInvitation(site.id, data)
      .then(() => {
        enqueueSnackbar(t('pages:site.send_invitation_success'), { variant: 'success' })
        reset()
        close()
      })
      .catch((error: AxiosError) => {
        if (error?.response?.status === 409) {
          enqueueSnackbar(t('errors:site.invitation'), { variant: 'error' })
        } else {
          enqueueSnackbar(t('errors:unknow_error'), { variant: 'error' })
        }
      })
  }

  const description = useWatch({ control, name: 'description' })

  return (
    <Dialog
      maxWidth='sm'
      fullWidth={true}
      open={isOpen}
      onClose={close}
    >
      <DialogTitle>
        {t('pages:site.join', { name: site.name })}
      </DialogTitle>
      <form onSubmit={handleSubmit(sendInvitation)} noValidate>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 4 }}>
            {t('pages:site.send_invitation_description')}
          </Alert>

          <TextField
            {...register('description')}
            required
            fullWidth
            label={t('common:description')}
            multiline
            minRows={5}
            error={!!errors.description}
            helperText={
              errors?.description?.message
                ? t(errors.description.message as string)
                : `${description?.length || 0}/${DESCRIPTION_MAX_LENGTH}`
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            onClick={close}
            color='secondary'
          >
            {t('common:cancel')}
          </Button>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={!isDirty}
          >
            {t('common:add')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default SendInvitationDialog

import React from 'react'

import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'next-i18next'
import { useSnackbar } from 'notistack'
import { Controller, useForm } from 'react-hook-form'

import { createSiteMember } from '@/domains/api'
import {
  CreateSiteMember, Site, SiteRole, addMemberToSiteSchema
} from '@/domains/schemas'

import SiteMemberRoleSelect from './SiteMemberRoleSelect'

export interface AddSiteMemberDialogProps {
  site: Site
  isOpen: boolean
  close: () => void
}

const AddSiteMemberDialog: React.FC<AddSiteMemberDialogProps> = ({
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
  } = useForm<CreateSiteMember>({
    resolver: yupResolver(addMemberToSiteSchema),
    defaultValues: {
      email: '',
      role: SiteRole.MEMBER
    }
  })

  const addSiteMember = (data: CreateSiteMember): void => {
    createSiteMember(site.id, data)
      .then(() => {
        enqueueSnackbar(t('pages:site.add_member_success'), { variant: 'success' })
        reset()
        close()
      })
      .catch(() => {
        enqueueSnackbar(t('errors:unknow_error'), { variant: 'error' })
      })
  }

  return (
    <Dialog
      maxWidth='sm'
      fullWidth={true}
      open={isOpen}
      onClose={close}
    >
      <DialogTitle>
        {t('pages:site.add_member')}
      </DialogTitle>
      <form onSubmit={handleSubmit(addSiteMember)} noValidate>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            {t('pages:site.add_member_description')}
          </Alert>

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

          <Controller
            control={control}
            name="role"
            render={({
              field: {
                onChange, value
              }
            }): JSX.Element => (
              <SiteMemberRoleSelect
                value={value}
                onChange={onChange}
                label={'Role'}
              />
            )}
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

export default AddSiteMemberDialog

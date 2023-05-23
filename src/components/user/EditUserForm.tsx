import React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'next-i18next'
import { useSnackbar } from 'notistack'
import { useForm, useWatch } from 'react-hook-form'

import { useUpdateUser } from '@/domains/api/hooks'
import {
  DESCRIPTION_MAX_LENGTH, EditUser, editUserSchema, User
} from '@/domains/schemas'

import EditAvatar from './EditAvatar'
import GoBackButton from '../navigation/GoBackButton'

export interface EditUserFormProps {
  user: User
  goBack: () => void
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, goBack }) => {
  const { t } = useTranslation([
    'common',
    'errors',
    'pages'
  ])

  const { trigger } = useUpdateUser(user.id)
  const { enqueueSnackbar } = useSnackbar()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<EditUser>({
    mode: 'onChange',
    resolver: yupResolver(editUserSchema),
    defaultValues: {
      ...user
    }
  })

  const updateUser = (editedUser: EditUser): void => {
    trigger(editedUser).then(() => {
      goBack()
      enqueueSnackbar(t('common:change_saved'), { variant: 'success' })
    }).catch(() => {
      enqueueSnackbar(t('errors:unknow_error'), { variant: 'error' })
    })
  }
  const description = useWatch({ control, name: 'description' })

  return (
    <Card sx={{ mx: 3 }} >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <Grid container>
          <GoBackButton onGoBack={goBack} label={t('pages:user.back_to_user')} />
        </Grid>

        <EditAvatar user={user} />

        <Box component="form" noValidate onSubmit={handleSubmit(updateUser)} sx={{ mt: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('lastName')}
                required
                fullWidth
                error={!!errors.lastName}
                label={t('common:lastname')}
                helperText={errors?.lastName?.message && t(errors.lastName.message as string)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('firstName')}
                required
                fullWidth
                label={t('common:firstname')}
                error={!!errors.firstName}
                helperText={errors?.firstName?.message && t(errors.firstName.message as string)}
              />
            </Grid>
            <Grid item xs={12}>
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
                    ? t(errors.description.message as string, { max: DESCRIPTION_MAX_LENGTH })
                    : `${description?.length || 0}/${DESCRIPTION_MAX_LENGTH}`
                }
              />
            </Grid>
          </Grid>

          <Grid sx={{ display: 'flex', justifyContent: 'flex-end', my: 3 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!isDirty}
            >
              {t('common:save')}
            </Button>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  )
}

export default EditUserForm

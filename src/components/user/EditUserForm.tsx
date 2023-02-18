import {
  DESCRIPTION_MAX_LENGTH, EditUser, editUserSchema, User
} from '@/domains/schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { useForm, useWatch } from 'react-hook-form'
import EditAvatar from './EditAvatar'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import { updateUser as apiUpdateUser } from '@/domains/api'
import { useUser } from '@/domains/api/hooks'
import { useSnackbar } from 'notistack'

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

  const { mutate } = useUser(user.id)
  const { enqueueSnackbar } = useSnackbar()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EditUser>({
    mode: 'onChange',
    resolver: yupResolver(editUserSchema),
    defaultValues: {
      ...user
    }
  })

  const updateUser = (editedUser: EditUser): void => {
    apiUpdateUser(user.id, editedUser).then(() => {
      mutate()
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
                minRows={3}
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
              type="button"
              fullWidth
              variant="outlined"
              color='error'
              startIcon={<ClearRoundedIcon />}
              onClick={goBack}
              sx={{ mr: 2 }}
            >
              {t('common:cancel')}
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
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

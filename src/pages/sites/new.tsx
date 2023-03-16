import * as React from 'react'

import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import LockRoundedIcon from '@mui/icons-material/LockRounded'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Collapse from '@mui/material/Collapse'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { yupResolver } from '@hookform/resolvers/yup'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useSnackbar } from 'notistack'
import { Controller, useForm, useWatch } from 'react-hook-form'

import MainLayout from '@/components/layouts/MainLayout'
// eslint-disable-next-line import/order
import PageTitle from '@/components/PageTitle'

import AddressInput from '@/components/site/AddressInput'
import SchedulesInput from '@/components/site/SchedulesInput'
import { createSite } from '@/domains/api'
import {
  CreateSite,
  DAY_OF_WEEK,
  DESCRIPTION_MAX_LENGTH,
  Schedule,
  siteCreationSchema
} from '@/domains/schemas'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      ...(await serverSideTranslations('fr', [
        'common',
        'pages',
        'errors'
      ]))
    }
  }
}

const SitePage: NextPage = () => {
  const { t } = useTranslation([
    'common',
    'pages'
  ])
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const defaultValues: CreateSite = {
    name: '',
    description: '',
    // @ts-ignore
    schedules: DAY_OF_WEEK.map(() => ([{ open: '18:00', close: '19:00' }])),
    isPublic: true
  }

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateSite>({
    mode: 'onChange',
    resolver: yupResolver(siteCreationSchema),
    defaultValues
  })
  const description = useWatch({ control, name: 'description' })
  const isPublic = useWatch({
    control,
    name: 'isPublic',
    defaultValue: true
  })

  const onSubmit = (siteData: CreateSite): void => {
    createSite(siteData).then(({ data: site }) => {
      router.push(`/sites/${site.id}`)
    }).catch(() => {
      enqueueSnackbar(t('errors:unknow_error'), { variant: 'error' })
    })
  }

  return (
    <MainLayout>
      <PageTitle title={[t('pages:site.site_creation')]} />

      <Container maxWidth="md">
        <Card>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <Typography variant='h4' component='h1'>{t('pages:site.site_creation')}</Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 5 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    {...register('name')}
                    required
                    fullWidth
                    error={!!errors.name}
                    label={t('common:name')}
                    helperText={errors?.name?.message && t(errors.name.message as string)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    {...register('description')}
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

              <Typography variant='h6' component="h2" mt={3} display="flex" alignItems="center">
                <LocationOnRoundedIcon color="primary" sx={{ mr: 1 }} />
                {t('common:location')}
              </Typography>

              <Box p={2}>
                <Controller
                  control={control}
                  name="address"
                  render={({
                    field: {
                      onChange, value
                    },
                    fieldState: {
                      error
                    }
                  }): JSX.Element => (
                    <AddressInput
                      color={error ? 'error' : 'secondary'}
                      address={value}
                      onChange={onChange}
                    />
                  )}
                />
              </Box>

              <Typography variant='h6' component="h2" mt={3} display="flex" alignItems="center">
                <AccessTimeRoundedIcon color="primary" sx={{ mr: 1 }} />
                {t('common:schedules')}
              </Typography>

              <Grid>
                <Controller
                  control={control}
                  name="schedules"
                  render={({
                    field: {
                      onChange, value
                    }
                  }): JSX.Element => (
                    <SchedulesInput
                      schedules={value as unknown as Schedule[]}
                      onChange={(schedules): void => onChange(schedules)}
                    />
                  )}
                />
              </Grid>

              <Typography variant='h6' component="h2" mt={3} display="flex" alignItems="center">
                <LockRoundedIcon color="primary" sx={{ mr: 1 }} />
                {t('pages:site.access')}
              </Typography>

              <Box p={2}>
                <FormControl>
                  <Controller
                    control={control}
                    name="isPublic"
                    render={({ field: { onChange, ...field } }): JSX.Element => (
                      <RadioGroup
                        {...field}
                        onChange={(e, value): void => {
                          onChange(value === 'true')
                        }}
                        aria-label={t('pages:site.specify_site_visibility')}
                        name="radio-buttons-group"
                      >
                        <FormControlLabel value={true} control={<Radio />} label={t('pages:site.public_description')} />
                        <FormControlLabel value={false} control={<Radio />} label={t('pages:site.private_description')} />
                      </RadioGroup>
                    )}
                  />
                </FormControl>

                <Collapse in={!isPublic}>
                  <Grid item xs={12} mt={3} mb={2}>
                    <Alert severity="info">
                      {t('pages:site.access_description')}
                    </Alert>
                  </Grid>

                  <TextField
                    {...register('accessConditions')}
                    required
                    fullWidth
                    label={t('common:access_condition')}
                    multiline
                    minRows={5}
                    error={!!errors.accessConditions}
                    helperText={
                      errors?.accessConditions?.message
                        ? t(errors.accessConditions.message as string, { max: DESCRIPTION_MAX_LENGTH })
                        : `${description?.length || 0}/${DESCRIPTION_MAX_LENGTH}`
                    }
                  />
                </Collapse>
              </Box>

              <Grid item display="flex" justifyContent="flex-end" mt={3} >
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
      </Container>
    </MainLayout>
  )
}

export default SitePage

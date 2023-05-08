import * as React from 'react'

import CakeRoundedIcon from '@mui/icons-material/CakeRounded'
import Diversity2RoundedIcon from '@mui/icons-material/Diversity2Rounded'
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
import { DatePicker } from '@mui/x-date-pickers'

import { yupResolver } from '@hookform/resolvers/yup'
import { GetServerSideProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useSnackbar } from 'notistack'
import { Controller, useForm, useWatch } from 'react-hook-form'

import CanOrLogin from '@/components/authentication/CanOrLogin'
import FormSection from '@/components/form/FormSection'
import MainLayout from '@/components/layouts/MainLayout'
// eslint-disable-next-line import/order
import PageTitle from '@/components/PageTitle'

const DevTools = dynamic(() => import('@hookform/devtools').then((mod) => mod.DevTool), {
  loading: () => <></>,
  ssr: false
})

import AddressInput from '@/components/site/AddressInput'
import OrganizationInput from '@/components/site/forms/OrganizationInput'
import SchedulesForm from '@/components/site/forms/SchedulesForm'
import { createSite } from '@/domains/api'
import { Routes } from '@/domains/Routes'
import {
  CreateSite,
  DESCRIPTION_MAX_LENGTH,
  siteCreationSchema
} from '@/domains/schemas'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      ...(await serverSideTranslations('fr', [
        'common',
        'pages',
        'errors',
        'authentication',
        'map'
      ]))
    }
  }
}

const SitePage: NextPage = () => {
  const { t } = useTranslation([
    'common',
    'pages',
    'errors'
  ])
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const defaultValues: Partial<CreateSite> = {
    name: '',
    description: '',
    isPublic: true
  }

  const {
    control,
    register,
    handleSubmit,
    setValue,
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
      router.push(Routes.site(site.id))
    }).catch(() => {
      enqueueSnackbar(t('errors:unknow_error'), { variant: 'error' })
    })
  }

  return (
    <MainLayout>
      <PageTitle title={[t('pages:site.site_creation')]} />

      <CanOrLogin I='create' a='site'>
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

                <FormSection title={t('common:location')} Icon={LocationOnRoundedIcon}>
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
                </FormSection>

                <SchedulesForm
                  control={control}
                  name='schedules'
                  // @ts-ignore
                  setValue={(value): void => setValue('schedules', value)}
                />

                <FormSection title={t('pages:site.access')} Icon={LockRoundedIcon}>
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
                          <FormControlLabel value={true} control={<Radio />} label={t('common:public_site_description')} />
                          <FormControlLabel value={false} control={<Radio />} label={t('common:private_site_description')} />
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
                </FormSection>

                <FormSection title={t('pages:site.lauch_date')} Icon={CakeRoundedIcon}>
                  <Controller
                    control={control}
                    name="launchDate"
                    render={({ field: { onChange, ...field } }): JSX.Element => (
                      <DatePicker
                        {...field}
                        views={['year', 'month', 'day']}
                        onChange={onChange}
                        slotProps={{
                          textField: {
                            helperText: errors?.launchDate?.message && t(errors.launchDate.message as string)
                          }
                        }}
                      />
                    )}
                  />
                </FormSection>

                <FormSection title={t('common:responsible_organization')} Icon={Diversity2RoundedIcon}>
                  <Controller
                    control={control}
                    name="organization"
                    render={({
                      field: {
                        onChange, value
                      }
                    }): JSX.Element => (
                      <OrganizationInput
                        organizationId={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </FormSection>

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
      </CanOrLogin>

      {/*
      // @ts-ignore */}
      <DevTools control={control}/>
    </MainLayout>
  )
}

export default SitePage

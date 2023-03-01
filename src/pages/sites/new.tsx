import * as React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { DevTool } from '@hookform/devtools'
import { yupResolver } from '@hookform/resolvers/yup'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Controller, useForm, useWatch } from 'react-hook-form'

import MainLayout from '@/components/layouts/MainLayout'
import PageTitle from '@/components/PageTitle'
import SchedulesInput from '@/components/site/SchedulesInput'
import {
  CreateSite, DAY_OF_WEEK, DESCRIPTION_MAX_LENGTH, Schedule, siteCreationSchema
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

  const defaultValues: CreateSite = {
    name: '',
    description: '',
    // @ts-ignore
    schedules: DAY_OF_WEEK.map(() => ([{ open: '18:00', close: '19:00' }]))
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

  const createSite = (site: CreateSite): void => {
    console.log(site)
  }

  return (
    <MainLayout>
      <PageTitle title={[t('pages:site.site_creation')]} />

      <Container maxWidth="lg">
        <Card sx={{ mx: 3 }} >
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <Typography variant='h4' component='h1'>{t('pages:site.site_creation')}</Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(createSite)} sx={{ mt: 5 }}>
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

              <Typography variant='h6' component="h2" mt={3}>{t('common:schedules')}</Typography>

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

      <DevTool control={control} />
    </MainLayout>
  )
}

export default SitePage

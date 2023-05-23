import React from 'react'

import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import LockRoundedIcon from '@mui/icons-material/LockRounded'
import LoadingButton from '@mui/lab/LoadingButton'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers'

import { yupResolver } from '@hookform/resolvers/yup'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { Controller, useForm, useWatch } from 'react-hook-form'

import FormSection from '@/components/form/FormSection'
import WeightInput from '@/components/form/WeightInput'
import { CreateSite, DESCRIPTION_MAX_LENGTH, siteCreationSchema } from '@/domains/schemas'

import SchedulesForm from './SchedulesForm'
import AddressInput from '../AddressInput'

const DevTools = dynamic(() => import('@hookform/devtools').then((mod) => mod.DevTool), {
  loading: () => <></>,
  ssr: false
})

export interface EditSiteFormProps {
  onSubmit: (siteData: CreateSite) => void
  defaultValues?: Partial<CreateSite>
  isLoading?: boolean
}

const EditSiteForm: React.FC<EditSiteFormProps> = ({
  onSubmit,
  defaultValues,
  isLoading = false
}) => {
  const { t } = useTranslation([
    'common',
    'pages',
    'errors'
  ])

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty }
  } = useForm<CreateSite>({
    mode: 'onChange',
    resolver: yupResolver(siteCreationSchema),
    defaultValues
  })
  const description = useWatch({ control, name: 'description' })
  const isPublic = useWatch({
    control,
    name: 'isPublic',
    defaultValue: defaultValues ? defaultValues.isPublic : true
  })

  return (
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
            maxRows={30}
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
            maxRows={30}
            error={!!errors.accessConditions}
            helperText={
              errors?.accessConditions?.message
                ? t(errors.accessConditions.message as string, { max: DESCRIPTION_MAX_LENGTH })
                : `${description?.length || 0}/${DESCRIPTION_MAX_LENGTH}`
            }
          />
        </Collapse>
      </FormSection>

      <FormSection title={t('pages:site.helpful_information')} Icon={InfoRoundedIcon}>
        <Grid container direction="column" gap={2}>
          <Controller
            control={control}
            name="launchDate"
            render={({ field: { onChange, ...field } }): JSX.Element => (
              <DatePicker
                {...field}
                views={['year', 'month', 'day']}
                label={t('pages:site.lauch_date')}
                onChange={onChange}
                slotProps={{
                  textField: {
                    helperText: errors?.launchDate?.message
                      && t(errors.launchDate.message as string)
                  }
                }}
              />
            )}
          />
          <TextField
            {...register('householdsAmount')}
            type='number'
            fullWidth
            label={t('pages:site.households_amount')}
            error={!!errors.householdsAmount}
            helperText={
              errors?.householdsAmount?.message
                && t(errors.householdsAmount.message as string)
            }
          />
          <Controller
            control={control}
            name="treatedWaste"
            render={({
              field: { ...props }
            }): JSX.Element => (
              <WeightInput
                {...props}
                type='number'
                fullWidth
                label={t('pages:site.treated_waste')}
                error={!!errors.treatedWaste}
                helperText={
                  errors?.treatedWaste?.message
                    && t(errors.treatedWaste.message as string)
                }/>
            )}
          />

        </Grid>
      </FormSection>

      <Grid item display="flex" justifyContent="flex-end" mt={3} >
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          disabled={!isDirty}
          loading={isLoading}
        >
          {t('common:save')}
        </LoadingButton>
      </Grid>

      {/*
      // @ts-ignore */}
      <DevTools control={control}/>
    </Box>
  )
}

export default EditSiteForm

import React from 'react'

import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'

import { useTranslation } from 'next-i18next'
import {
  Controller, UseControllerProps, useWatch
} from 'react-hook-form'

import FormSection from '@/components/form/FormSection'
import SchedulesInput from '@/components/site/forms/SchedulesInput'
import { CreateSite, DAY_OF_WEEK, Schedule } from '@/domains/schemas'

const defaultSchedules: Schedule[] = DAY_OF_WEEK.map(() => ([{ open: '18:00', close: '19:00' }]))

export interface SchedulesFormProps extends UseControllerProps<CreateSite> {
  setValue: (schedules?: Schedule[]) => void
}

const SchedulesForm: React.FC<SchedulesFormProps> = ({ control, setValue }) => {
  const { t } = useTranslation([
    'common',
    'pages'
  ])
  const schedules = useWatch({ control, name: 'schedules' })

  return (
    <FormSection title={t('common:schedules')} Icon={AccessTimeRoundedIcon}>
      <FormGroup sx={{ ml: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={schedules !== undefined}
              onChange={(e, checked): void => setValue(checked ? defaultSchedules : undefined)}
            />
          }
          label={t('pages:site.has_schedules')}
        />
      </FormGroup>

      {schedules && (

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
                onChange={(newSchedules): void => onChange(newSchedules)}
              />
            )}
          />
        </Grid>
      )}
    </FormSection>
  )
}

export default SchedulesForm

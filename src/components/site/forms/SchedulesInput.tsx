import React from 'react'

import EditRoundedIcon from '@mui/icons-material/EditRounded'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'

import { useTranslation } from 'next-i18next'

import {
  DAY_OF_WEEK, Schedule
} from '@/domains/schemas'

import EditDayOpeningsDialog from '../EditDayOpeningsDialog'
import ScheduleListItem from '../ScheduleListItem'

export interface SchedulesInputProps {
  schedules: Schedule[]
  onChange: (schedules: Schedule[]) => void
}

const SchedulesInput: React.FC<SchedulesInputProps> = ({ schedules, onChange }) => {
  const { t } = useTranslation([
    'common',
    'pages'
  ])

  const [openDialog, setOpenDialog] = React.useState(false)
  const [selectedDay, setSelectedDay] = React.useState(DAY_OF_WEEK[0])

  const onChangeDayOpenings = React.useCallback((openings: Schedule) => {
    const updatedSchedules = [...schedules]
    updatedSchedules[selectedDay] = openings
    onChange(updatedSchedules)
  }, [onChange, schedules, selectedDay])

  return (
    <>
      <EditDayOpeningsDialog
        open={openDialog}
        day={selectedDay}
        openings={schedules[selectedDay]}
        onChange={onChangeDayOpenings}
        close={(): void => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      />

      <Grid container>
        <Grid item xs={12}>
          <List>
            {DAY_OF_WEEK.map(dayOfWeek => (
              <React.Fragment key={dayOfWeek}>
                <ScheduleListItem
                  day={dayOfWeek}
                  openings={schedules[dayOfWeek]}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label={t('common:edit')}
                      onClick={(): void => {
                        setSelectedDay(dayOfWeek)
                        setOpenDialog(true)
                      }}
                    >
                      <EditRoundedIcon />
                    </IconButton>
                  }
                />
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Grid>
      </Grid>
    </>
  )
}

export default SchedulesInput

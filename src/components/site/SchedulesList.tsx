import React from 'react'

import { Divider } from '@mui/material'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'

import { DAY_OF_WEEK, Opening, Schedule } from '@/domains/schemas'

import ScheduleListItem from './ScheduleListItem'

export interface SchedulesListProps {
  schedules: Schedule[]
}

const SchedulesList: React.FC<SchedulesListProps> = ({ schedules }) => {
  const getDaySlots = (dayIndex: number): Opening[] | undefined => {
    const daySchedule = schedules.find((schedule) => schedule.dayOfWeek === dayIndex)

    return daySchedule?.openings
  }

  return (
    <Grid container justifyContent="flex-end">
      <Grid item xs={12} md={8}>
        <List>
          {DAY_OF_WEEK.map((dayIndex) => (
            <>
              <ScheduleListItem key={dayIndex} day={dayIndex} openings={getDaySlots(dayIndex)} />
              <Divider />
            </>
          ))}
        </List>
      </Grid>
    </Grid>

  )
}

export default SchedulesList

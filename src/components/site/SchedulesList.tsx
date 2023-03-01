import React from 'react'

import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'

import { DAY_OF_WEEK, Schedule } from '@/domains/schemas'

import ScheduleListItem from './ScheduleListItem'

export interface SchedulesListProps {
  schedules: Schedule[]
}

const SchedulesList: React.FC<SchedulesListProps> = ({ schedules }) => {
  return (
    <Grid container justifyContent="flex-end">
      <Grid item xs={12} md={8}>
        <List>
          {DAY_OF_WEEK.map((dayIndex) => (
            <React.Fragment key={dayIndex}>
              <ScheduleListItem day={dayIndex} openings={schedules[dayIndex]} />
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Grid>
    </Grid>

  )
}

export default SchedulesList

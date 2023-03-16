import React from 'react'

import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem, { ListItemProps } from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'

import { useTranslation } from 'next-i18next'

import { DayOfWeek, Schedule } from '@/domains/schemas'

export interface ScheduleListItemProps extends ListItemProps {
  day: DayOfWeek
  openings: Schedule
}

const ScheduleListItem: React.FC<ScheduleListItemProps> = ({ day, openings, ...restProps }) => {
  const { t } = useTranslation([
    'common'
  ])

  return (
    <ListItem {...restProps}>
      <Grid container justifyContent="space-between">
        <Grid item>
          {t(`common:days.${day}`)}
        </Grid>
        <Grid item >
          {!openings && (
            <Typography color="error.main" fontWeight="bold">{t('common:closed')}</Typography>
          )}

          {openings?.length === 0 && (
            <Typography color="success.main" fontWeight="bold">{t('common:open')}</Typography>
          )}

          {openings && openings?.length > 0 && (
            <List dense sx={{ p: 0 }}>
              {openings.map(({ open, close }, index) => {
                return (
                  <ListItem key={index} sx={{ p: 0, justifyContent: 'flex-end' }}>
                    <Typography textAlign="left" color="success.main" fontWeight="bold">{open}-{close}</Typography>
                  </ListItem>
                )
              })}
            </List>
          )}
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default ScheduleListItem

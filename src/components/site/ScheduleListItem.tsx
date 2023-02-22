import React from 'react'

import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import Typography from '@mui/material/Typography'

import { useTranslation } from 'next-i18next'

import { Hour, Schedule } from '@/domains/schemas'
export interface ScheduleListItemProps {
  schedules: Schedule[]
}

const ScheduleListItem: React.FC<ScheduleListItemProps> = ({ schedules }) => {
  const { t } = useTranslation([
    'common',
    'pages'
  ])

  const [openSchedules, setOpenSchedules] = React.useState(false)
  const now = new Date()
  const currentDayOfWeek = [7, 1, 2, 3, 4, 5, 6][now.getDay()]
  const currentHour = now.getHours()
  const currentMinutes = now.getMinutes()

  const hourAsNumber = (hour: Hour): number => {
    return Number(hour.replace(':', '.'))
  }

  const matchingSchedules = schedules.filter(({ dayOfWeek }) => dayOfWeek === currentDayOfWeek)
  const currentHourAsNumber = hourAsNumber(`${currentHour}:${currentMinutes}`)

  const currentOpenedSlot = matchingSchedules.find(({ open, close }) => {
    if (open && close) {
      return hourAsNumber(open) <= currentHourAsNumber && currentHourAsNumber <= hourAsNumber(close)
    }
    return null
  })

  const nextOpenedSlot = matchingSchedules.find(({ open }) => {
    if (open) {
      return hourAsNumber(open) > currentHourAsNumber
    }
    return null
  })

  return (
    <>
      <ListItemButton alignItems="center" onClick={(): void => setOpenSchedules((state) => !state)}>
        <ListItemAvatar>
          <AccessTimeRoundedIcon fontSize="large" color="primary" />
        </ListItemAvatar>

        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Box>
            <Typography variant='h6' component="span" color={currentOpenedSlot ? 'success.main' : 'error.main'} fontWeight="bold">{t(currentOpenedSlot ? 'common:open' : 'common:closed')}</Typography>
            <Typography component="span">
              {(currentOpenedSlot || nextOpenedSlot) && ' • '}
              {
                currentOpenedSlot
                  ? t('pages:site.close_at', { hour: currentOpenedSlot.close })
                  : nextOpenedSlot && t('pages:site.open_at', { hour: nextOpenedSlot.open })
              }</Typography>
          </Box>

          <Typography variant="body2">{t('pages:site.more_schedule')}</Typography>
        </Box>

        {openSchedules ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}

      </ListItemButton>
      <Collapse in={openSchedules}>
        <Box sx={{ marginLeft: 10 }}>
          Test
        </Box>
      </Collapse>
    </>
  )
}

export default ScheduleListItem

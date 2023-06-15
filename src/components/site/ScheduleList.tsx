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

import { Schedule } from '@/domains/schemas'
import { hourAsNumber } from '@/domains/utils'

import SchedulesList from './SchedulesList'

export interface ScheduleListProps {
  schedules: Schedule[]
}

const ScheduleList: React.FC<ScheduleListProps> = ({ schedules }) => {
  const { t } = useTranslation([
    'common',
    'pages'
  ])

  const [openSchedules, setOpenSchedules] = React.useState(false)
  const now = new Date()
  const currentDayOfWeek = [6, 0, 1, 2, 3, 4, 5][now.getDay()]
  const currentHour = now.getHours()
  const currentMinutes = now.getMinutes()

  const matchingSchedule = schedules[currentDayOfWeek]
  const currentHourAsNumber = hourAsNumber(`${currentHour}:${currentMinutes}`)

  const currentOpenedSlot = matchingSchedule?.find(({ open, close }) => {
    if (open && close) {
      return hourAsNumber(open) <= currentHourAsNumber && currentHourAsNumber <= hourAsNumber(close)
    }
    return null
  })
  const isOpen = currentOpenedSlot || (matchingSchedule && matchingSchedule.length === 0)

  const nextOpenedSlot = matchingSchedule?.find(({ open }) => {
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
            <Typography variant='h5' component="span" color={isOpen ? 'success.main' : 'error.main'} fontWeight="bold">{t(isOpen ? 'common:open' : 'common:closed')}</Typography>
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
        <SchedulesList schedules={schedules} />
      </Collapse>
    </>
  )
}

export default ScheduleList

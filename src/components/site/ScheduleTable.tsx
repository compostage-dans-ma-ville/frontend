import React from 'react'

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'

import { useTranslation } from 'next-i18next'

import { Hour, Schedule } from '@/domains/schemas'
import { hourAsNumber } from '@/domains/utils'

import ScheduleSlotsTableCell from './ScheduleSlotsTableCell'

export interface ScheduleTableProps {
  schedules: Schedule[]
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({ schedules }) => {
  const dayIndexes = [1, 2, 3, 4, 5, 6, 7]
  const { t } = useTranslation([
    'common',
    'pages'
  ])

  const getDaySlots = (dayIndex: number): string[] | null => {
    const matches = schedules.filter((schedule) => schedule.dayOfWeek === dayIndex)

    if (matches.length === 0) return null
    if (matches.length === 1) {
      const { open, close } = matches[0]
      return open && close ? [open + ' - ' + close] : []
    }

    return matches
      .sort((scheduleA, scheduleB): number => {
        return hourAsNumber(scheduleA.open as Hour) - hourAsNumber(scheduleB.open as Hour)
      })
      .map(({ open, close }) => {
        return open + ' - ' + close
      })
  }

  return (
    <Grid container justifyContent="flex-end">
      <Grid item xs={12} md={8}>
        <TableContainer component={Paper}>
          <Table >
            <TableBody>
              {dayIndexes.map((dayIndex) => (
                <TableRow
                  key={dayIndex}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {t(`common:days.${dayIndex}`)}
                  </TableCell>
                  <ScheduleSlotsTableCell slots={getDaySlots(dayIndex)}/>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>

  )
}

export default ScheduleTable

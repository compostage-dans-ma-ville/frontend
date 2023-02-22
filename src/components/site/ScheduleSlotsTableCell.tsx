import React from 'react'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'

import { useTranslation } from 'next-i18next'

export interface ScheduleSlotsTableCellProps {
  slots: string[] | null
}

const ScheduleSlotsTableCell: React.FC<ScheduleSlotsTableCellProps> = ({ slots }) => {
  const { t } = useTranslation([
    'common'
  ])
  return (
    <TableCell align="right">
      {slots === null && (
        <Typography color="error.main" fontWeight="bold">{t('common:closed')}</Typography>
      )}

      {slots?.length === 0 && (
        <Typography color="success.main" fontWeight="bold">{t('common:open')}</Typography>
      )}

      {slots && slots?.length > 0 && (
        <List dense sx={{ p: 0 }}>
          {slots.map(slot => {
            return (
              <ListItem key={slot} sx={{ p: 0, justifyContent: 'flex-end' }}>
                <Typography textAlign="left" color="success.main" fontWeight="bold">{slot}</Typography>
              </ListItem>
            )
          })}
        </List>
      )}
    </TableCell>
  )
}

export default ScheduleSlotsTableCell

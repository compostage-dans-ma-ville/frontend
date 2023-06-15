import React from 'react'

import Typography from '@mui/material/Typography'

export interface OrganizationCounterProps {
  count: number
  label: string
}
const OrganizationCounter: React.FC<OrganizationCounterProps> = ({ count, label }) => {
  return (
    <Typography>
      <Typography color="primary.main" component="span" fontWeight="bold" textAlign="center">
        {count}{' '}
      </Typography>
      <Typography component="span" textAlign="center">
        {label}
      </Typography>
    </Typography>
  )
}

export default OrganizationCounter

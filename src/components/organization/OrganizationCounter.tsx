import React from 'react'

import Typography from '@mui/material/Typography'

export interface OrganizationCounterProps {
  count: number
  label: string
}
const OrganizationCounter: React.FC<OrganizationCounterProps> = ({ count, label }) => {
  return (
    <Typography component="p">
      <Typography color="primary.main" variant='h6' component="span" fontWeight="bold" textAlign="center">
        {count}{' '}
      </Typography>
      <Typography variant='h6' component="span" textAlign="center">
        {label}
      </Typography>
    </Typography>
  )
}

export default OrganizationCounter

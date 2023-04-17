import React from 'react'

import Box from '@mui/material/Box'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SvgIconTypeMap } from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'

export interface FormSectionProps extends React.PropsWithChildren {
  title: string
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
}
const FormSection: React.FC<FormSectionProps> = ({ title, Icon, children }) => {
  return (
    <>
      <Typography variant='h6' component="h2" mt={3} display="flex" alignItems="center">
        <Icon color="primary" sx={{ mr: 1 }} />
        {title}
      </Typography>

      <Box p={2}>
        {children}
      </Box>
    </>
  )
}

export default FormSection

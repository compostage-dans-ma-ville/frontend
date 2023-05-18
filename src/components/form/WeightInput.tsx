import React from 'react'

import InputAdornment from '@mui/material/InputAdornment'
import TextField, { OutlinedTextFieldProps } from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

export interface WeightInputProps extends Omit<OutlinedTextFieldProps, 'variant'> {
}

// @ts-ignore
const WeightInput: React.FC<WeightInputProps> = (props) => {
  return (
    <TextField
      {...props}
      InputProps={{
        endAdornment: <InputAdornment variant='filled' position="end">
          <Typography fontWeight="bold" component="span" variant='h6'>
          kg
          </Typography>
        </InputAdornment>
      }}
    />
  )
}

export default WeightInput

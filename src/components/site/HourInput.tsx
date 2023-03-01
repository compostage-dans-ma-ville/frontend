import * as React from 'react'

import Grid, { GridProps } from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import { Hour } from '@/domains/schemas'

const StyledSelect = styled(Select)({
  border: 'none',
  fontSize: '1em',

  '& svg,input': {
    display: 'none'
  },
  '& button': {
    padding: 0,
    margin: 0
  },
  '&&& .MuiSelect-select': {
    padding: 5,
    paddingRight: 5
  }
})

export interface HourInputProps extends Omit<GridProps, 'onChange'> {
  hour: Hour
  onChange: (hour: Hour) => void
}

const OpeningInput: React.FC<HourInputProps> = ({ hour, onChange, ...restProps }) => {
  const [hh, mm] = hour.split(':')

  return (
    <Grid {...restProps} container m={0} alignItems='center' >
      <Grid item >
        <StyledSelect
          value={hh}
          onChange={(event): void => onChange(`${event.target.value}:${mm}` as Hour)}
          autoWidth
        >
          {[...Array(23).keys()].map(hourInDay => (
            <MenuItem key={hourInDay} value={hourInDay}>{hourInDay}</MenuItem>

          ))}
        </StyledSelect>
      </Grid>

      <Grid item mx="2px">
        <Typography fontSize="1rem" component="span">
        :
        </Typography>
      </Grid>
      <Grid item >
        <StyledSelect
          value={mm}
          onChange={(event): void => onChange(`${hh}:${event.target.value}` as Hour)}
          autoWidth
        >
          {['00', 10, 20, 30, 40, 50].map(minutesInDay => (
            <MenuItem key={minutesInDay} value={minutesInDay}>{minutesInDay}</MenuItem>
          ))}
        </StyledSelect>
      </Grid>
    </Grid>
  )
}

export default OpeningInput

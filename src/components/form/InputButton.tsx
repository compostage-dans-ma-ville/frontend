import React from 'react'

import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import Button, { ButtonProps } from '@mui/material/Button'

export interface InputButtonProps extends React.PropsWithChildren, ButtonProps{}
const InputButton: React.FC<InputButtonProps> = ({ children, onClick, ...restProps }) => {
  return (
    <Button
      {...restProps}
      variant='outlined'
      onClick={onClick}
      endIcon={<ArrowForwardIosRoundedIcon />}
      sx={{
        ...restProps.sx,
        padding: 2,
        justifyContent: 'space-between',
        width: '100%',
        textAlign: 'left'
      }}
    >
      {children}
    </Button>
  )
}

export default InputButton

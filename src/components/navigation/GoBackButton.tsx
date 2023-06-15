import React from 'react'

import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded'
import Button, { ButtonProps } from '@mui/material/Button'
import Typography, { TypographyProps as TypographyPropsType } from '@mui/material/Typography'

export interface GoBackButtonProps extends ButtonProps {
  label: string | JSX.Element
  onGoBack: () => void,
  TypographyProps?: TypographyPropsType
}

const GoBackButton: React.FC<GoBackButtonProps> = ({
  label,
  onGoBack,
  startIcon = <KeyboardBackspaceRoundedIcon />,
  TypographyProps
}) => {
  return (
    <Button color='secondary' onClick={onGoBack} startIcon={startIcon}>
      <Typography {...TypographyProps} component="span" variant="h5" fontWeight="bold">
        {label}
      </Typography>
    </Button>
  )
}

export default GoBackButton

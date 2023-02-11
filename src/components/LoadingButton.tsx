import * as React from 'react'

import { LoadingButton as MuiLoadingButton, LoadingButtonProps } from '@mui/lab'

const LoadingButton: React.FC<LoadingButtonProps> = ({ children, ...props }) => {
  return (
    <MuiLoadingButton {...props}>
      <span>{children}</span>
    </MuiLoadingButton>
  )
}

export default LoadingButton

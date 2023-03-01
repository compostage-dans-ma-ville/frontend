import * as React from 'react'

import MuiLoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton'

const LoadingButton: React.FC<LoadingButtonProps> = ({ children, ...props }) => {
  return (
    <MuiLoadingButton {...props}>
      <span>{children}</span>
    </MuiLoadingButton>
  )
}

export default LoadingButton

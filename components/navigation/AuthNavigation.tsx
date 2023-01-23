import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const AuthNavigation: React.FC = () => {
  return (
    <Box sx={{ '& button:first-child': { mr: 2 } }}>
      <Button variant="outlined">
        Sign In
      </Button>
      <Button variant="contained">Sign Up</Button>
    </Box>
  )
}

export default AuthNavigation

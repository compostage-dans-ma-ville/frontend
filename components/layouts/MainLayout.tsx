import * as React from 'react'
import Box from '@mui/material/Box'
import Footer from '@/components/Footer'
import Index from '@/components/navigation'

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box component="main">
      <Index />
      {children}
      <Footer />
    </Box>
  )
}

export default MainLayout

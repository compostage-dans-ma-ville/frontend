import * as React from 'react'
import Box from '@mui/material/Box'
import Footer from '@/components/Footer'
import Navbar from '@/components/navigation/Navbar'

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Box component="header">
        <Navbar />
      </Box>
      <Box component="main">
        {children}
      </Box>
      <Footer />
    </>
  )
}

export default MainLayout

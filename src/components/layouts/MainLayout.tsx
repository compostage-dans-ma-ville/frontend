import * as React from 'react'

import Box from '@mui/material/Box'

import Head from 'next/head'

import Footer from '@/components/Footer'
import Navbar from '@/components/navigation/Navbar'

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/images/favicon.svg" />
      </Head>

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

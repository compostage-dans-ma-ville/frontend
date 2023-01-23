import * as React from 'react'
import Head from 'next/head'

import Switch from '@mui/material/Switch'
import MainLayout from '@/components/layouts/MainLayout'

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Compostage dans ma ville - POC</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Switch defaultChecked />
      </MainLayout>
    </>
  )
}

export default Home

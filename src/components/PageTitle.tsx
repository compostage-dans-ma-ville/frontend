import Head from 'next/head'
import * as React from 'react'

export interface PageTitleProps {
  title: string
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <Head>
      <title>{`${title} • Compostage dans ma ville`}</title>
    </Head>
  )
}

export default PageTitle

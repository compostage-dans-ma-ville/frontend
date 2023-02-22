import * as React from 'react'

import Head from 'next/head'

export interface PageTitleProps {
  title: string | string[]
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  const stringTitle = Array.isArray(title) ? title.join(' • ') : title

  return (
    <Head>
      <title>{`${stringTitle} • Compostage dans ma ville`}</title>
    </Head>
  )
}

export default PageTitle

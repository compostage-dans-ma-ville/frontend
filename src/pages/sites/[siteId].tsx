import * as React from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'

import { GetServerSideProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Can, { an } from '@/components/Can'
import MainLayout from '@/components/layouts/MainLayout'
import LazyLoadingLoader from '@/components/LazyLoadingLoader'
import PageTitle from '@/components/PageTitle'
import SiteActions from '@/components/site/SiteActions'
import SiteCarousel from '@/components/site/SiteCarousel'
import SiteInfo from '@/components/site/SiteInfo'
import ValidateInvitationDialog from '@/components/site/ValidateInvitationDialog'
import WhatToCompost from '@/components/site/WhatToCompost/WhatToCompost'
import { getSite } from '@/domains/api'
import { useSite } from '@/domains/api/hooks'
import { Site } from '@/domains/schemas'
const EditSite = dynamic(() => import('@/components/site/forms/EditSite'), { loading: LazyLoadingLoader })

interface SiteProps {
  site: Site
  edition: boolean
}

export const getServerSideProps: GetServerSideProps<SiteProps> = async ({ params }) => {
  const res = await getSite(params?.siteId as string)
  const site = await res?.data

  if (!site) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      ...(await serverSideTranslations('fr', [
        'common',
        'pages',
        'errors',
        'whatToCompost'
      ])),
      site,
      edition: false
    }
  }
}

const SitePage: NextPage<SiteProps> = ({ site: siteProp, edition }) => {
  const { t } = useTranslation([
    'common',
    'pages'
  ])
  const [editionMode, setEditionMode] = React.useState<boolean>(edition)
  const fetcher = useSite(siteProp.id, { fallbackData: siteProp })
  const site = fetcher.site as Site

  const router = useRouter()
  const invitationToken = router.query.invitation as string | undefined

  const [isInvitationDialogOpen, setIsInvitationDialogOpen] = React.useState(false)

  React.useEffect(() => {
    if (invitationToken) {
      setIsInvitationDialogOpen(true)
    }
  }, [invitationToken])

  return (
    <MainLayout>
      <PageTitle title={[site.name, t('pages:site.composting_site')]} />

      <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Card>
          {site.images.length > 0 && !editionMode && <SiteCarousel images={site.images}/>}

          <CardContent>

            {editionMode
              ? (<EditSite site={site} onGoBack={(): void => setEditionMode(false)} />)
              : (
                <>
                  <Can do='update' on={an('site', site)}>
                    <SiteActions setEditionMode={setEditionMode} site={site} />
                  </Can>
                  <SiteInfo site={site}/>
                  <WhatToCompost />
                </>
              )
            }

          </CardContent>
        </Card>
      </Container>

      {invitationToken && (
        <ValidateInvitationDialog
          open={isInvitationDialogOpen}
          close={(): void => { setIsInvitationDialogOpen(false) }}
          site={site}
          token={invitationToken}
        />
      )}

    </MainLayout>
  )
}

export default SitePage

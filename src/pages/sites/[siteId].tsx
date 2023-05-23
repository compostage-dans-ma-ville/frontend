import * as React from 'react'

import EditIcon from '@mui/icons-material/Edit'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'

import { GetServerSideProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Can, { an } from '@/components/Can'
import DropdownActions from '@/components/DropdownActions'
import MainLayout from '@/components/layouts/MainLayout'
import LazyLoadingLoader from '@/components/LazyLoadingLoader'
import PageTitle from '@/components/PageTitle'
import SiteCarousel from '@/components/site/SiteCarousel'
import SiteInfo from '@/components/site/SiteInfo'
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
        'errors'
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
                    <DropdownActions sx={{ float: 'right' }}>
                      <MenuItem onClick={(): void => setEditionMode(true)}>
                        <ListItemIcon>
                          <EditIcon />
                        </ListItemIcon>
                        <ListItemText>{t('common:edit')}</ListItemText>
                      </MenuItem>
                    </DropdownActions>
                  </Can>
                  <SiteInfo site={site}/>
                </>
              )
            }

          </CardContent>
        </Card>
      </Container>

    </MainLayout>
  )
}

export default SitePage

import * as React from 'react'

import EditIcon from '@mui/icons-material/EditRounded'
import LinkRoundedIcon from '@mui/icons-material/LinkRounded'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Can, { an } from '@/components/Can'
import MainLayout from '@/components/layouts/MainLayout'
import OrganizationCounter from '@/components/organization/OrganizationCounter'
import OrganizationTabs from '@/components/organization/OrganizationTabs'
import PageTitle from '@/components/PageTitle'
import { getOrganization } from '@/domains/api/organization'
import { Organization } from '@/domains/schemas/organization'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await getOrganization(params?.organizationId as unknown as number)
  const organization = await res?.data

  if (!organization) {
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
      organization
    }
  }
}

interface OrganizationPageProps {
  organization: Organization
}

const OrganizationPage: NextPage<OrganizationPageProps> = ({ organization }) => {
  const { t } = useTranslation([
    'common'
  ])

  return (
    <MainLayout>
      <PageTitle title={[organization.name, t('common:organization')]} />
      <Container maxWidth="lg">
        <Card>
          <ButtonGroup variant="outlined" sx={{ m: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Can do="update" on={an('organization', organization)}>
              <Button startIcon={<EditIcon />}>{t('common:edit')}</Button>
            </Can>
          </ButtonGroup>

          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar src={organization.avatar} sx={{
              width: '150px',
              height: '150px'
            }} />

            <Typography variant="h4" component="h2" fontWeight="bold" textAlign="center" sx={{ mt: 2 }}>
              {organization.name}
            </Typography>

            <Grid container justifyContent="center" mt={1} columnGap={3}>
              <Grid item>
                <OrganizationCounter
                  count={organization.sites.length}
                  label={t('common:site', { count: organization.sites.length })}
                />
              </Grid>
              <Grid item>
                <OrganizationCounter
                  count={organization.members.length}
                  label={t('common:member', { count: organization.members.length })}
                />
              </Grid>
            </Grid>

            {organization.description && (
              <Grid container justifyContent="center" mt={4}>
                <Grid item xs={12} md={8}>
                  <Typography variant="body1" component="p" textAlign="center">
                    {organization.description}
                  </Typography>
                </Grid>
              </Grid>
            )}

            <Grid container justifyContent="center" mt={4} columnGap={3}>
              {organization.links.map((link) => {
                return (
                  <Grid key={link} item>
                    <Button
                      LinkComponent={Link}
                      href={link}
                      startIcon={<LinkRoundedIcon />}
                    >
                      {link}
                    </Button>
                  </Grid>
                )
              })}
            </Grid>

            <Grid container mt={2} justifyContent="center">
              <Grid item xs={12} md={8}>
                <OrganizationTabs organization={organization} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </MainLayout>
  )
}

export default OrganizationPage

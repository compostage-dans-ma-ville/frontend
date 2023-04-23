import * as React from 'react'

import EditIcon from '@mui/icons-material/Edit'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { GetServerSideProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Can, { an } from '@/components/Can'
import MainLayout from '@/components/layouts/MainLayout'
import PageTitle from '@/components/PageTitle'
import UserTabs from '@/components/user/UserTabs'
import { getUser } from '@/domains/api'
import { AuthenticatedUser } from '@/domains/schemas'

const EditUserForm = dynamic(() => import('@/components/user/EditUserForm'))

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await getUser(params?.userId as unknown as number)
  const user = await res?.data

  if (!user) {
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
      user
    }
  }
}

interface UserProfileProps {
  user: AuthenticatedUser
}

const UserProfile: NextPage<UserProfileProps> = ({ user }) => {
  const { t } = useTranslation([
    'common'
  ])
  const [editionMode, setEditionMode] = React.useState(false)

  return (
    <MainLayout>
      <PageTitle title={t('common:profile')} />
      <Container maxWidth="lg">
        {user && (
          editionMode
            ? (
              <EditUserForm
                user={user}
                goBack={(): void => { setEditionMode(false) }}
              />
            )
            : (
              <Card>
                <Can do="update" on={an('user', user)}>
                  <ButtonGroup variant="outlined" sx={{ m: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={(): void => setEditionMode(true)} startIcon={<EditIcon />}>{t('common:edit')}</Button>
                  </ButtonGroup>
                </Can>

                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar src={user.avatar} sx={{
                    width: '150px',
                    height: '150px'
                  }} />

                  <Typography variant="h4" component="h2" fontWeight="bold" sx={{ mt: 2 }}>
                    {user.firstName} {user.lastName}
                  </Typography>

                  {user.description && (
                    <Grid container justifyContent="center" mt={2}>
                      <Grid item xs={12} md={8}>
                        <Typography variant="body1" component="p" textAlign="center">
                          {user.description}
                        </Typography>
                      </Grid>
                    </Grid>
                  )}

                  <Grid container mt={2} justifyContent="center">
                    <Grid item xs={12} md={8}>
                      <UserTabs user={user} />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            )
        )}
      </Container>

    </MainLayout>
  )
}

export default UserProfile

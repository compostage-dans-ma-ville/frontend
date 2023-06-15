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
import LazyLoadingLoader from '@/components/LazyLoadingLoader'
import PageTitle from '@/components/PageTitle'
import UserTabs from '@/components/user/UserTabs'
import { getUser } from '@/domains/api'
import { useUser } from '@/domains/api/hooks'
import { User } from '@/domains/schemas'

const EditUserForm = dynamic(() => import('@/components/user/EditUserForm'), { loading: LazyLoadingLoader })

interface UserProfileProps {
  user: User
  edition: boolean
}

export const getServerSideProps: GetServerSideProps<UserProfileProps> = async ({ params }) => {
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
      user,
      edition: false
    }
  }
}

const UserProfile: NextPage<UserProfileProps> = ({ user: userProps, edition }) => {
  const { t } = useTranslation([
    'common'
  ])
  const [editionMode, setEditionMode] = React.useState(edition)

  const fetcher = useUser(userProps.id, { fallbackData: userProps })
  const user = fetcher.user as User

  return (
    <MainLayout>
      <PageTitle title={t('common:profile')} />
      <Container maxWidth="lg">
        {editionMode
          ? (
            <EditUserForm
              user={user}
              goBack={(): void => { setEditionMode(false) }}
            />
          )
          : (
            <Card>
              <Can do="update" on={an('user', user)}>
                <ButtonGroup variant="outlined" color="secondary" sx={{ m: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button onClick={(): void => setEditionMode(true)} startIcon={<EditIcon />}>{t('common:edit')}</Button>
                </ButtonGroup>
              </Can>

              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar src={user.avatar} sx={{
                  width: '150px',
                  height: '150px'
                }} />

                <Typography variant="h2" fontWeight="bold" sx={{ mt: 2 }}>
                  {user.firstName} {user.lastName}
                </Typography>

                {user.description && (
                  <Grid container justifyContent="center" mt={2}>
                    <Grid item xs={12} md={8}>
                      <Typography textAlign="center">
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
        }
      </Container>

    </MainLayout>
  )
}

export default UserProfile

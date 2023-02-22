import * as React from 'react'

import EditIcon from '@mui/icons-material/Edit'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import MainLayout from '@/components/layouts/MainLayout'
import PageTitle from '@/components/PageTitle'
import { useMe } from '@/contexts'
import { useUser } from '@/domains/api/hooks'

const EditUserForm = dynamic(() => import('@/components/user/EditUserForm'))

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {
    ...(await serverSideTranslations('fr', [
      'common',
      'pages',
      'errors'
    ]))
  }
})

const UserProfile: React.FC = () => {
  const { t } = useTranslation([
    'common'
  ])
  const [editionMode, setEditionMode] = React.useState(false)

  const { query } = useRouter()
  const { user } = useUser(Number(query.userId as string))
  const { me } = useMe()

  const canEdit = (user?.id === me?.id)

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
              <Card sx={{ mx: 3 }} >
                {canEdit && (
                  <ButtonGroup variant="outlined" sx={{ m: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={(): void => setEditionMode(true)} startIcon={<EditIcon />}>{t('common:edit')}</Button>
                  </ButtonGroup>
                )}

                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar src={user.avatar} sx={{
                    width: '150px',
                    height: '150px'
                  }} />

                  <Typography variant="h4" component="h2" fontWeight="bold" sx={{ mt: 2 }}>
                    {user.firstName} {user.lastName}
                  </Typography>
                </CardContent>
              </Card>
            )
        )}
      </Container>

    </MainLayout>
  )
}

export default UserProfile

import * as React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import MainLayout from '@/components/layouts/MainLayout'
import { GetServerSideProps } from 'next'
import PageTitle from '@/components/PageTitle'
import { useTranslation } from 'react-i18next'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import { useRouter } from 'next/router'
import { useUser } from '@/domains/api/hooks'

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {
    ...(await serverSideTranslations('fr', [
      'common'
    ]))
  }
})

const UserProfile: React.FC = () => {
  const { t } = useTranslation([
    'common'
  ])

  const { query } = useRouter()
  const { user } = useUser(query.userId as string)

  return (
    <MainLayout>
      <PageTitle title={t('common:profile')} />
      {user && (
        <Card sx={{ mx: 3 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar src={user.avatar} />
            <h3>{user.firstName} {user.lastName}</h3>
          </CardContent>
        </Card>
      )}
    </MainLayout>
  )
}

export default UserProfile

import React from 'react'

import { useTranslation } from 'next-i18next'
import { useSnackbar } from 'notistack'

import GoBackButton from '@/components/navigation/GoBackButton'
import { useUpdateSite } from '@/domains/api/hooks'
import { CreateSite, Site } from '@/domains/schemas'

import EditSiteForm from './EditSiteForm'

export interface EditSiteProps {
  site: Site
  onGoBack: () => void
}

const EditSite: React.FC<EditSiteProps> = ({ site, onGoBack }) => {
  const { t } = useTranslation([
    'common',
    'pages',
    'errors'
  ])

  const { trigger, isMutating } = useUpdateSite(site.id)
  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = (data: CreateSite): void => {
    trigger(data)
      .then(() => {
        enqueueSnackbar(t('common:saved_modification'), { variant: 'success' })
        onGoBack()
      }).catch(() => {
        enqueueSnackbar(t('errors:unknow_error'), { variant: 'error' })
      })
  }

  return (
    <>
      <GoBackButton onGoBack={onGoBack} label={t('pages:site.back_to_site')} />
      <EditSiteForm
        onSubmit={onSubmit}
        defaultValues={site}
        isLoading={isMutating}
      />
    </>
  )
}

export default EditSite

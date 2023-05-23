import React from 'react'

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import EditIcon from '@mui/icons-material/Edit'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'

import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useSnackbar } from 'notistack'

import { useConfirm } from '@/contexts'
import { useDeleteSite } from '@/domains/api/hooks'
import { Routes } from '@/domains/Routes'
import { Site } from '@/domains/schemas'

import DropdownActions from '../DropdownActions'

export interface SiteActionsProps {
  site: Site
  setEditionMode: (value: boolean) => void
}

const SiteActions: React.FC<SiteActionsProps> = ({ site, setEditionMode }) => {
  const { t } = useTranslation([
    'common',
    'pages'
  ])
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()

  const { confirm } = useConfirm()
  const { trigger: deleteSite } = useDeleteSite(site.id)

  const onDelete = (): void => {
    deleteSite().then(() => {
      enqueueSnackbar(t('common:saved_modification'), { variant: 'success' })
      router.push(Routes.home)
    }).catch(() => {
      enqueueSnackbar(t('errors:unknow_error'), { variant: 'error' })
    })
  }

  return (
    <DropdownActions sx={{ float: 'right' }}>
      <MenuItem onClick={(): void => setEditionMode(true)}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText>{t('common:edit')}</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={(): void => confirm(
        t('pages:site.site_deletion'),
        t('pages:site.site_deletion_description', { name: site.name }),
        onDelete,
        {
          confirmText: t('pages:site.delete_site'),
          variant: 'error'
        }
      )}>
        <ListItemIcon>
          <DeleteRoundedIcon />
        </ListItemIcon>
        <ListItemText>{t('common:delete')}</ListItemText>
      </MenuItem>
    </DropdownActions>
  )
}

export default SiteActions

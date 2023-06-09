import React from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Tooltip from '@mui/material/Tooltip'

import { useTranslation } from 'next-i18next'
import { useSnackbar } from 'notistack'

import { updateSiteMember } from '@/domains/api'
import { Site, SiteMember, SiteRole } from '@/domains/schemas'
import { getUserFullName } from '@/helpers/user'

import SiteMemberRoleSelect from './SiteMemberRoleSelect'

export interface EditSiteMemberDialogProps {
  isOpen: boolean
  onSuccess: () => void
  close: () => void
  site: Site
  member: SiteMember
}

const EditSiteMemberDialog: React.FC<EditSiteMemberDialogProps> = ({
  isOpen, close, onSuccess, site, member
}) => {
  const { t } = useTranslation([
    'pages',
    'common'
  ])
  const [userRole, setUserRole] = React.useState(member.role)
  const { enqueueSnackbar } = useSnackbar()

  const editSiteMember = (): void => {
    updateSiteMember(site.id, member.member.id, { role: userRole })
      .then(() => {
        enqueueSnackbar(t('common:saved_modification'), { variant: 'success' })
        close()
        onSuccess()
      })
      .catch(() => {
        enqueueSnackbar(t('errors:unknow_error'), { variant: 'error' })
      })
  }

  React.useEffect(() => {
    setUserRole(member.role)
  }, [member])

  return (
    <Dialog
      maxWidth='sm'
      fullWidth={true}
      open={isOpen}
      onClose={close}
    >
      <DialogTitle>
        {t('pages:site.edit_member')}: {getUserFullName(member.member)}
      </DialogTitle>
      <DialogContent>
        <Tooltip
          title={member.role === SiteRole.ADMIN ? t('pages:site.impossible_to_edit_admin') : undefined}
          placement='bottom-start'
        >
          <div>
            <SiteMemberRoleSelect
              value={userRole}
              onChange={setUserRole}
              label={'Role'}
              disabled={member.role === SiteRole.ADMIN}
              showHints={member.role !== userRole}
            />
          </div>
        </Tooltip>

      </DialogContent>
      <DialogActions>
        <Button
          variant='outlined'
          onClick={close}
          color='secondary'
        >
          {t('common:cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={editSiteMember}
          disabled={member.role === userRole}
        >
          {t('common:edit')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditSiteMemberDialog

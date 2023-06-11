import React from 'react'

import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { useAddMemberToSite } from '@/domains/api/hooks'
import { Routes } from '@/domains/Routes'
import { Site } from '@/domains/schemas'

export interface ValidateInvitationDialogProps extends DialogProps {
  close: () => void
  site: Site
  token: string
}

const ValidateInvitationDialog: React.FC<ValidateInvitationDialogProps> = ({
  open,
  close,
  site,
  token,
  ...props
}) => {
  const { t } = useTranslation([
    'common'
  ])

  const { isLoading, error } = useAddMemberToSite(site.id, token)
  const success = !isLoading && !error

  return (
    <Dialog
      {...props}
      maxWidth='md'
      fullWidth={true}
      open={open}
      onClose={close}
    >
      {isLoading && <LinearProgress />}

      <DialogContent>
        <Container maxWidth='md'>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{
              m: 1, bgcolor: 'secondary.main', width: 70, height: 70
            }} >
              {success ? (
                <CheckCircleOutlineRoundedIcon sx={{ width: 50, height: 50 }} />
              ) : (
                <GroupAddRoundedIcon sx={{ width: 50, height: 50 }} />
              )}
            </Avatar>

            {}

            <Typography
              sx={{ mt: 2 }}
              textAlign='center'
              fontWeight="bold"
            >
              {success && t('pages:site.invitation.success', { siteName: site.name })}
              {!isLoading && error && t('pages:site.invitation.error', { siteName: site.name })}
            </Typography>
          </Box>
        </Container>
      </DialogContent>
      <DialogActions>
        <Link href={Routes.site(site.id)}>
          <Button
            variant='contained'
            onClick={close}
            color='secondary'
          >
            {t('pages:site.go_to_site')}
          </Button>
        </Link>
      </DialogActions>
    </Dialog>
  )
}

export default ValidateInvitationDialog

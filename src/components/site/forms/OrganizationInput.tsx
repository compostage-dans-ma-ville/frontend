import React from 'react'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import { useTranslation } from 'next-i18next'

import InputButton from '@/components/form/InputButton'
import OrganizationListItemContent from '@/components/organization/OrganizationListItemContent'
import { UserContext } from '@/contexts'
import { getMeOrganizations } from '@/domains/api'
import { Organization } from '@/domains/schemas/organization'

import OrganizationPreview from './OrganizationPreview'

export interface OrganizationInputProps {
  organizationId?: number
  onChange: (organization: number | undefined) => void
}
const OrganizationInput: React.FC<OrganizationInputProps> = ({ organizationId, onChange }) => {
  const { t } = useTranslation([
    'common',
    'pages'
  ])

  const [openDialog, setOpenDialog] = React.useState(false)
  const [userOrganizations, setUserOrganization] = React.useState<Organization[] | null>(null)
  const [
    selectedOrganizationId,
    setSelectedOrganizationId
  ] = React.useState<number | undefined>(organizationId)

  const { me } = React.useContext(UserContext)

  React.useEffect(() => {
    if (me) {
      getMeOrganizations(me).then((resData) => {
        setUserOrganization(resData.map(({ data }) => data))
      })
    }
  }, [me])

  React.useEffect(() => {
    if (organizationId) {
      setSelectedOrganizationId(organizationId)
    }
  }, [organizationId])

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={(): void => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{t('common:responsible_organization')}</DialogTitle>
        <DialogContent>
          <Alert severity="info">
            {t('pages:site.link_organization_benefits')}
          </Alert>

          {selectedOrganizationId && (
            <Grid container display="flex" direction="row" flexWrap="nowrap" alignItems="center" mt={2}>
              <Grid item flexGrow={1}>
                <OrganizationPreview
                  organizationId={selectedOrganizationId}
                />
              </Grid>
              <Grid item>
                <Tooltip title={t('pages:site.disassociate_organizations')}>
                  <IconButton aria-label="fingerprint" color="error" onClick={(): void => setSelectedOrganizationId(undefined)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>

          )}

          <Typography variant='h6' component="h2" mt={3}>
            {t('pages:site.select_my_organizations')}:
          </Typography>

          {userOrganizations && (
            userOrganizations.map((userOrganization) => (
              <ListItem
                key={userOrganization.id}
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={(): void => setSelectedOrganizationId(userOrganization.id)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selectedOrganizationId === userOrganization.id}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <OrganizationListItemContent organization={userOrganization} />
                </ListItemButton>
              </ListItem>
            ))
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            onClick={(): void => {
              setSelectedOrganizationId(organizationId)
              setOpenDialog(false)
            }}
          >{t('common:cancel')}</Button>
          <Button
            variant='contained'
            onClick={(): void => {
              onChange(selectedOrganizationId)
              setOpenDialog(false)
            }}
          >{t('common:save')}</Button>
        </DialogActions>
      </Dialog>

      <InputButton
        onClick={(): void => setOpenDialog(true)}
      >
        {!organizationId ? t('pages:site.link_organization_to_site') : (
          <OrganizationPreview organizationId={organizationId} />
        )}
      </InputButton>
    </>
  )
}

export default OrganizationInput

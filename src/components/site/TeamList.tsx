import React from 'react'

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import EditIcon from '@mui/icons-material/Edit'
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded'
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded'
import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

import { useTranslation } from 'next-i18next'
import { useSnackbar } from 'notistack'

import { AbilityContext, useConfirm } from '@/contexts'
import { deleteSiteMember } from '@/domains/api'
import { useGetSiteMembers } from '@/domains/api/hooks'
import { Site, SiteMember, SiteRole } from '@/domains/schemas'
import { getUserFullName } from '@/helpers/user'

import AddSiteMemberDialog from './AddSiteMemberDialog'
import EditSiteMemberDialog from './EditSiteMemberDialog'
import Can, { an } from '../Can'
import DropdownActions from '../DropdownActions'
import UserListItem from '../UserListItem'

const sortTeamListOrder: Record<SiteRole, number> = {
  [SiteRole.REFEREE]: 0,
  [SiteRole.ADMIN]: 1,
  [SiteRole.MEMBER]: 2
}

export interface TeamListProps {
  site: Site
}

const TeamList: React.FC<TeamListProps> = ({ site }) => {
  const { t } = useTranslation([
    'pages',
    'common'
  ])

  const {
    data,
    isLoading,
    size,
    setSize,
    canLoadMore,
    mutate
  } = useGetSiteMembers(site.id)
  const { confirm } = useConfirm()
  const { enqueueSnackbar } = useSnackbar()

  const [open, setOpen] = React.useState(false)
  const [memberToEdit, setMemberToEdit] = React.useState<SiteMember | undefined>(undefined)
  const [editMemberOpen, setEditMemberOpen] = React.useState(false)
  const [addMemberOpen, setAddMemberOpen] = React.useState(false)

  const ability = React.useContext(AbilityContext)

  const members = data
    ? data
      .reduce((acc, elmt) => [...acc, ...elmt.data.data], [] as SiteMember[])
      .sort((a, b) => sortTeamListOrder[a.role] - sortTeamListOrder[b.role])
    : []

  const onMemberDelete = (userId: number): void => {
    deleteSiteMember(site.id, userId).then(() => {
      mutate()
      enqueueSnackbar(t('common:saved_modification'), { variant: 'success' })
    }).catch(() => {
      enqueueSnackbar(t('errors:unknow_error'), { variant: 'error' })
    })
  }

  return (
    <>
      <ListItemButton alignItems="center" onClick={(): void => setOpen(!open)} >
        <ListItemAvatar>
          <Groups2RoundedIcon fontSize="large" color="primary" />
        </ListItemAvatar>

        <Grid container>
          <Grid item width="100%">
            <Typography fontWeight="bold">
              {t('pages:site.our_team')}
            </Typography>
          </Grid>
        </Grid>

        {open ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
      </ListItemButton>

      <Collapse in={open} sx={{ mx: 2 }}>
        <Can do='update' on={an('site', site)}>
          <Grid container my={2} pl={2}>
            <Button
              variant='outlined'
              color='secondary'
              startIcon={<PersonAddAltRoundedIcon />}
              onClick={(): void => setAddMemberOpen(true)}
            >
              {t('pages:site.add_member')}
            </Button>
          </Grid>
        </Can>

        {members.map(({ role, member }) => (
          <UserListItem
            key={member.id}
            user={member}
            role={role}
            secondaryAction={ability.can('update', an('site', site)) && (
              <DropdownActions
                sx={{ padding: 0, ml: 0.5 }}
              >
                <MenuItem onClick={(): void => {
                  setMemberToEdit({ role, member })
                  setEditMemberOpen(true)
                }}>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText>{t('common:edit')}</ListItemText>
                </MenuItem>

                <Divider />

                <MenuItem onClick={(): void => confirm(
                  t('pages:site.member_deletion'),
                  t('pages:site.member_deletion_description', { name: getUserFullName(member), siteName: site.name }),
                  () => { onMemberDelete(member.id) },
                  {
                    confirmText: t('pages:site.delete_member'),
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
          />
        ))}
        {canLoadMore && (
          <Grid container justifyContent="center">

            <LoadingButton
              color='primary'
              variant='outlined'
              onClick={(): void => { setSize(size + 1) }}
              loading={isLoading}
            >
              {t('common:display_more')}
            </LoadingButton>
          </Grid>
        )}
      </Collapse>

      {memberToEdit && (
        <EditSiteMemberDialog
          isOpen={editMemberOpen}
          member={memberToEdit}
          site={site}
          onSuccess={(): void => { mutate() }}
          close={(): void => { setEditMemberOpen(false) }}
        />
      )}
      <AddSiteMemberDialog
        isOpen={addMemberOpen}
        site={site}
        close={(): void => { setAddMemberOpen(false) }}
      />
    </>
  )
}

export default TeamList

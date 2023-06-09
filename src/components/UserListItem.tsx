import React from 'react'

import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import ListItem, { ListItemProps } from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Typography from '@mui/material/Typography'

import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { Routes } from '@/domains/Routes'
import { OrganizationRole, User } from '@/domains/schemas'
import { getUserFullName } from '@/helpers/user'

import UserRoleChip, { UserRoleChipProps } from './organization/UserRoleChip'

export interface UserListItemProps extends ListItemProps {
  role: UserRoleChipProps['role']
  user: User
  displaySeeUserLink?: boolean
}

const UserListItem: React.FC<UserListItemProps> = ({
  role,
  user,
  displaySeeUserLink = true,
  secondaryAction,
  ...props
}) => {
  const { t } = useTranslation([
    'common'
  ])

  return (
    <ListItem
      {...props}
      secondaryAction={
        <>
          {displaySeeUserLink && (
            <Link href={Routes.user(user.id)}>
              <IconButton
                aria-label={t('common:open_ressource')}
                color="primary"
                sx={{ padding: 0 }}
              >
                <VisibilityRoundedIcon />
              </IconButton>
            </Link>
          )}
          {secondaryAction}
        </>
      }
    >
      <ListItemAvatar>
        <Avatar src={user.avatar} />
      </ListItemAvatar>

      <Grid container alignItems="center" columnGap={2}>
        <Grid item>
          <Typography>
            {getUserFullName(user)}
          </Typography>
        </Grid>
        <Grid item>
          {role !== OrganizationRole.MEMBER && <UserRoleChip role={role}/>}
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default UserListItem

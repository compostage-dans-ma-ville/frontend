import React from 'react'

import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import ListItem, { ListItemProps } from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'

import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { Routes } from '@/domains/Routes'
import { SiteRole, SmallSite } from '@/domains/schemas'
import { getAddressString } from '@/helpers/site'

import UserRoleChip, { UserRoleChipProps } from '../organization/UserRoleChip'
import IsPublicChip from '../site/IsPublicChip'

export interface SiteListItemProps extends ListItemProps {
  role?: UserRoleChipProps['role']
  site: SmallSite
}

const SiteListItem: React.FC<SiteListItemProps> = ({
  role, site, secondaryAction, ...props
}) => {
  const { t } = useTranslation([
    'common'
  ])

  return (
    <ListItem
      {...props}
      secondaryAction={
        <>
          <Link href={Routes.site(site.id)}>
            <IconButton
              aria-label={t('common:open_ressource')}
              color="primary"
              sx={{ padding: 0 }}
            >
              <VisibilityRoundedIcon />
            </IconButton>
          </Link>
          {secondaryAction}
        </>
      }
    >
      <ListItemAvatar>
        <IsPublicChip isPublic={site.isPublic}/>
      </ListItemAvatar>

      <Grid container alignItems="center" columnGap={2}>
        <Grid item>
          <ListItemText primary={site.name} secondary={getAddressString(site.address)} />
        </Grid>

        {role && (
          <Grid item>
            {role !== SiteRole.MEMBER && <UserRoleChip role={role}/>}
          </Grid>
        )}
      </Grid>
    </ListItem>
  )
}

export default SiteListItem

import React from 'react'

import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import Grid, { GridTypeMap } from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { Routes } from '@/domains/Routes'
import { Organization, OrganizationRole } from '@/domains/schemas/organization'

import UserRoleChip from './UserRoleChip'

export interface OrganizationListItemProps extends Partial<GridTypeMap['props']> {
  organization: Omit<Organization, 'sites' | 'members'>
  role?: OrganizationRole | undefined
  showLink?: boolean
}
const OrganizationListItemContent: React.FC<OrganizationListItemProps> = ({
  organization,
  role,
  showLink = false,
  ...props
}) => {
  const { t } = useTranslation([
    'common'
  ])

  return (
    <Grid
      {...props}
      container
      display="flex"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid item>
        <Typography variant='body1' fontWeight="bold">
          {organization.name}
        </Typography>
      </Grid>

      <Grid item display="flex" alignItems="center">
        {role && (
          <Grid item>
            <UserRoleChip role={role} />
          </Grid>
        )}
        {showLink && (
          <Link href={Routes.organization(organization.id)} target="_blank">
            <IconButton
              aria-label={t('common:open_ressource_new_tab')}
              color="primary"
              sx={{ padding: 0 }}
            >
              <OpenInNewRoundedIcon />
            </IconButton>
          </Link>
        )}
      </Grid>
    </Grid>
  )
}

export default OrganizationListItemContent

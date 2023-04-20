import React from 'react'

import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import Grid, { GridTypeMap } from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { UserContext } from '@/contexts'
import { Routes } from '@/domains/Routes'
import { Organization } from '@/domains/schemas/organization'
import { getUserOrganisationRole } from '@/helpers/user'

import UserRoleBadge from './UserRoleBadge'

export interface OrganizationListItemProps extends Partial<GridTypeMap['props']> {
  organization: Organization
}
const OrganizationListItemContent: React.FC<OrganizationListItemProps> = ({ organization, ...props }) => {
  const { t } = useTranslation([
    'common'
  ])

  const { me } = React.useContext(UserContext)

  const userRole = React.useMemo(() => {
    if (me) {
      return getUserOrganisationRole(me, organization)
    }

    return undefined
  }, [me, organization])

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
        {userRole && (
          <Grid item>
            <UserRoleBadge role={userRole} />
          </Grid>
        )}
        <Link href={Routes.organization(organization.id)} target="_blank">
          <IconButton aria-label={t('common:open_ressource_new_tab')} color="primary">
            <OpenInNewRoundedIcon />
          </IconButton>
        </Link>
      </Grid>
    </Grid>
  )
}

export default OrganizationListItemContent

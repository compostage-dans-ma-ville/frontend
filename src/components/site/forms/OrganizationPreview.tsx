import React from 'react'

import OrganizationListItemContent from '@/components/organization/OrganizationListItemContent'
import { UserContext } from '@/contexts'
import { useOrganization } from '@/domains/api/hooks'
import { getUserOrganisationRole } from '@/helpers/user'

export interface OrganizationPreviewProps {
  organizationId: number
}
const OrganizationPreview: React.FC<OrganizationPreviewProps> = ({
  organizationId
}) => {
  const { organization } = useOrganization(organizationId)

  const { me } = React.useContext(UserContext)

  const userRole = React.useMemo(() => {
    if (me && organization) {
      return getUserOrganisationRole(me, organization)
    }

    return undefined
  }, [me, organization])
  if (!organization) return null

  return (
    <OrganizationListItemContent
      sx={{
        bgcolor: 'background.paper',
        border: 1,
        borderRadius: 1,
        p: 2
      }}
      organization={organization}
      role={userRole}
      showLink
    />
  )
}

export default OrganizationPreview

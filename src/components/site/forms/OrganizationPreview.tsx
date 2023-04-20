import React from 'react'

import OrganizationListItemContent from '@/components/organization/OrganizationListItemContent'
import { useOrganization } from '@/domains/api/hooks'

export interface OrganizationPreviewProps {
  organizationId: number
}
const OrganizationPreview: React.FC<OrganizationPreviewProps> = ({
  organizationId
}) => {
  const { organization } = useOrganization(organizationId)

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
    />
  )
}

export default OrganizationPreview

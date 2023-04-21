import { AuthenticatedUser } from '@/domains/schemas'
import { Organization, OrganizationRole } from '@/domains/schemas/organization'

export const getUserOrganisationRole = (
  user: AuthenticatedUser,
  organization: Organization
): OrganizationRole | undefined => {
  return user.organizations.find((userOrganization) => {
    return userOrganization.organizationId === organization.id
  })?.role
}

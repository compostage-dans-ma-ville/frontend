import {
  AbilityBuilder,
  SubjectRawRule,
  ExtractSubjectType,
  createMongoAbility,
  MongoAbility,
  MongoQuery
} from '@casl/ability'

import { AuthenticatedUser, SiteRole, UserRole } from './schemas'
import { OrganizationRole } from './schemas/organization'

export type AbilityAction = 'create' | 'read' | 'update' | 'delete' | 'join' | 'manage'
export type AbilitySubject = 'site' | 'user' |'all' | 'organization' | AuthenticatedUser;

export const CRUD = ['create', 'read', 'update', 'delete'] as AbilityAction[]

export type Rules = SubjectRawRule<AbilityAction, ExtractSubjectType<AbilitySubject>, MongoQuery>[]
export type AppAbility = MongoAbility<
[AbilityAction, AbilitySubject]
>;

export const getDefaultAbilityBuilder = (): AbilityBuilder<AppAbility> => {
  return new AbilityBuilder<AppAbility>(createMongoAbility)
}

export const getUserRules = (
  user: AuthenticatedUser | null
): Rules => {
  const { can, cannot, rules } = getDefaultAbilityBuilder()

  if (user === null) return rules

  can(['read', 'create', 'join'], 'site')

  can(CRUD, 'user', { id: user.id })

  if (user.role === UserRole.ADMIN) {
    can('manage', 'all')
  }

  user.organizations.forEach(({ organizationId, role }) => {
    if (role === OrganizationRole.ADMIN) {
      can('manage', 'organization', { id: organizationId })
    }
  })

  user.sites.forEach(({ siteId, role }) => {
    if (role === SiteRole.ADMIN || role === SiteRole.REFEREE) {
      can('manage', 'site', { id: siteId })
    }

    cannot('join', 'site', { id: siteId })
  })

  return rules
}

import {
  AbilityBuilder,
  SubjectRawRule,
  ExtractSubjectType,
  createMongoAbility,
  MongoAbility,
  MongoQuery
} from '@casl/ability'

import { AuthenticatedUser, UserRole } from './schemas'

export type AbilityAction = 'create' | 'read' | 'update' | 'delete' | 'manage'
export type AbilitySubject = 'site' | 'user' |'all' | AuthenticatedUser;

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
  const { can, rules } = getDefaultAbilityBuilder()

  if (user === null) return rules

  can(['read', 'create'], 'site')

  can(CRUD, 'user', { id: user.id })

  if (user.role === UserRole.ADMIN) {
    can('manage', 'all')
  }

  return rules
}

import {
  AbilityBuilder,
  PureAbility,
  AbilityClass,
  SubjectRawRule,
  ExtractSubjectType
} from '@casl/ability'

import { AuthenticatedUser, UserRole } from './schemas'

type AbilityAction = 'create' | 'read' | 'update' | 'delete'
type AbilitySubject = 'site' | 'user' |'all';

export const CRUD = ['create', 'read', 'update', 'delete'] as AbilityAction[]

export type Ability = PureAbility<[AbilityAction, AbilitySubject]>
export type Rules = SubjectRawRule<AbilityAction, ExtractSubjectType<AbilitySubject>, unknown>[]
export const AppAbility = PureAbility as AbilityClass<Ability>

export const getUserRules = (
  user: AuthenticatedUser | null
): Rules => {
  const { can, rules } = new AbilityBuilder(AppAbility)

  if (user === null) return rules

  switch (user.role) {
  case UserRole.ADMIN:
    can(CRUD, 'all')
    break
  case UserRole.USER: default:
    can(['read', 'create'], 'site')
    break
  }

  return rules
}

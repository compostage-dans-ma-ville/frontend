import {
  AbilityBuilder,
  PureAbility,
  AbilityClass,
  SubjectRawRule,
  ExtractSubjectType,
  createMongoAbility,
  buildMongoQueryMatcher
} from '@casl/ability'

import { AuthenticatedUser, UserRole } from './schemas'

type AbilityAction = 'create' | 'read' | 'update' | 'delete' | 'manage'
type AbilitySubject = 'site' | 'user' |'all' | AuthenticatedUser;
const conditionsMatcher = buildMongoQueryMatcher()

export const CRUD = ['create', 'read', 'update', 'delete'] as AbilityAction[]

export type Ability = PureAbility<[AbilityAction, AbilitySubject]>
export type Rules = SubjectRawRule<AbilityAction, ExtractSubjectType<AbilitySubject>, unknown>[]
export const AppAbility = PureAbility as AbilityClass<Ability>

export const getUserRules = (
  user: AuthenticatedUser | null
): Rules => {
  const { can, rules, build } = new AbilityBuilder(createMongoAbility)

  if (user === null) return rules

  can(['read', 'create'], 'site')
  can(CRUD, 'user', { id: user.id })

  if (user.role === UserRole.ADMIN) {
    can('manage', 'all')
  }

  return rules
}

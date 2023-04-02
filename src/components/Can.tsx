import { subject } from '@casl/ability'
import { BoundCanProps, createContextualCan } from '@casl/react'

import { AbilityContext } from '@/contexts'
import { AppAbility, AbilitySubject } from '@/domains/ability'

export type CanProps = BoundCanProps<AppAbility>

export const an = subject as (sub: AbilitySubject, elmt: any) => any
const Can = createContextualCan(AbilityContext.Consumer)
export default Can

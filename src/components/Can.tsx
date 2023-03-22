import { BoundCanProps, createContextualCan } from '@casl/react'

import { AbilityContext } from '@/contexts'
import { Ability } from '@/domains/ability'

export type CanProps = BoundCanProps<Ability>
export const Can = createContextualCan(AbilityContext.Consumer)

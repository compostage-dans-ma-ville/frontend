import * as React from 'react'

import { Ability, AppAbility } from '@/domains/ability'

export const AbilityContext = React.createContext<Ability>(new AppAbility())

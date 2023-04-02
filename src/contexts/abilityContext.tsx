import * as React from 'react'

import { createMongoAbility } from '@casl/ability'

import { AppAbility } from '@/domains/ability'

export const AbilityContext = React.createContext<AppAbility>(createMongoAbility<AppAbility>())

import React from 'react'

import { getUserRules } from '@/domains/ability'

import { AbilityContext } from './abilityContext'
import { getMe } from '../domains/api'
import { AuthService } from '../domains/AuthService'
import { AuthenticatedUser } from '../domains/schemas'

export interface UserContextData {
  me: AuthenticatedUser | null
  isFetching: boolean
  fetch: () => void
  logout: () => void
  update: (userData: Partial<AuthenticatedUser>) => void
}
export const UserContext = React.createContext<UserContextData>({ me: null } as UserContextData)

export const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = React.useState<AuthenticatedUser | null>(null)
  const [isFetching, setIsFetching] = React.useState(false)
  const ability = React.useContext(AbilityContext)

  const logout = (): void => {
    setUser(null)
    AuthService.removeToken()
  }
  const update = (userData: Partial<AuthenticatedUser>): void => {
    setUser((userState) => ({ ...userState, ...userData } as AuthenticatedUser))
  }

  const fetch = React.useCallback((): void => {
    setIsFetching(true)

    getMe()
      .then(({ data }) => setUser(data))
      .catch(() => logout())
      .finally(() => setIsFetching(false))
  }, [])

  React.useEffect(() => {
    const token = AuthService.getToken()
    if (token) fetch()
  }, [fetch])

  React.useEffect(() => {
    ability.update(getUserRules(user))
  }, [ability, user])

  return (
    <UserContext.Provider value={{
      me: user, fetch, logout, isFetching, update
    }}>
      {children}
    </UserContext.Provider>
  )
}

export const useMe = (): UserContextData => React.useContext(UserContext)

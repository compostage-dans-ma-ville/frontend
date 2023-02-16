import React from 'react'
import { getMe } from '../api'
import { AuthService } from '../AuthService'
import { User } from '../schemas'

export interface UserContextData {
  me: User | null
  isFetching: boolean
  fetch: () => void
  logout: () => void
}
export const UserContext = React.createContext<UserContextData>({ me: null } as UserContextData)

export const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null)
  const [isFetching, setIsFetching] = React.useState(false)

  const logout = (): void => {
    setUser(null)
    AuthService.removeToken()
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

  return (
    <UserContext.Provider value={{
      me: user, fetch, logout, isFetching
    }}>
      {children}
    </UserContext.Provider>
  )
}

export const useMe = (): UserContextData => React.useContext(UserContext)

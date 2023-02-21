export class AuthService {
  public static tokenKey = 'token'

  public static setToken(token: string): void {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(AuthService.tokenKey, token)
  }

  public static getToken(): string | null {
    if (typeof window === 'undefined') return null
    return window.localStorage.getItem(AuthService.tokenKey)
  }

  public static removeToken(): void {
    if (typeof window === 'undefined') return
    window.localStorage.removeItem(AuthService.tokenKey)
  }
}

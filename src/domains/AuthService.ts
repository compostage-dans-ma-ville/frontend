export class AuthService {
  public static tokenKey = 'token'

  public static setToken(token: string): void {
    localStorage.setItem(AuthService.tokenKey, token)
  }

  public static getToken(): string | null {
    return localStorage.getItem(AuthService.tokenKey)
  }

  public static removeToken(): void {
    localStorage.removeItem(AuthService.tokenKey)
  }
}

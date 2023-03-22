export class Routes {
  static login = '/authentification/login'
  static register = '/authentification/register'
  static sites = '/sites'
  static sitesNew = `${Routes.sites}/new`
  static site = (siteId: string | number): string => `${Routes.sites}/${siteId}`
}

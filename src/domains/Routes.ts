export class Routes {
  static login = '/authentification/login'
  static register = '/authentification/register'
  static sites = '/sites'
  static organizations = '/organizations'
  static sitesNew = `${Routes.sites}/new`
  static site = (siteId: string | number): string => `${Routes.sites}/${siteId}`
  static ouComposter = (placeId?: string): string => {
    const base = '/ou-composter'
    if (placeId) return `${base}/${placeId}`
    return base
  }
  static organization = (organizationId: string | number): string => `${Routes.organizations}/${organizationId}`
}

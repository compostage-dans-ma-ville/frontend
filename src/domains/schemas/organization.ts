import { Site } from './sites'

export interface Organization {
  id: number
  name: string
  description?: string
  avatar?: string
  links: string[]
  sites: Site[]
  members: {role: OrganizationRole, userId: number}[]
  createdAt: string
  updatedAt: string
}
export type SmallOrganization = Pick<
  Organization,
  | 'id'
  | 'name'
  | 'description'
  | 'avatar'
  | 'links'
  | 'createdAt'
  | 'updatedAt'
>

// eslint-disable-next-line no-shadow
export enum OrganizationRole {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN'
}

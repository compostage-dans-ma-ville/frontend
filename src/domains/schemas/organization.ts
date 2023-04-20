import { Site } from './sites'

export interface Organization {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  description?: string
  avatar?: string
  links: string[]
  sites: Site[]
  members: {role: OrganizationRole, userId: number}[]
}

// eslint-disable-next-line no-shadow
export enum OrganizationRole {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN'
}

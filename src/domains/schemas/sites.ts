import { RemoveIndex } from '@/helpers/typing'
import yup from '@/helpers/yup-extended'

import { descriptionSchema } from './common'
import { Organization } from './organization'
import { User, emailSchema } from './user'

// eslint-disable-next-line no-shadow
export enum SiteRole {
  MEMBER = 'MEMBER',
  REFEREE = 'REFEREE',
  ADMIN = 'ADMIN'
}
export type Schedule = Opening[] | null
export type Site = {
  id: number
  name: string
  description?: string
  images: string[]
  address: Address
  schedules?: Schedule[] // array of 7 SiteSchedule for each day of week
  isPublic: boolean
  accessConditions?: string
  organization?: Omit<Organization, 'sites'>
  householdsAmount?: number
  treatedWaste?: number
  launchDate?: Date
}
export type SmallSite = Pick<Site, 'id' | 'name' | 'isPublic' | 'address'>

export const NAME_MAX_LENGTH = 100
export const nameSchema = {
  name: yup.string()
    .required('errors:required_field')
    .max(NAME_MAX_LENGTH, 'errors:max_length')
}

export interface Address {
  houseNumber: string
  streetName: string
  zipCode: number
  city: string
  latitude: number
  longitude: number
}

export const addressSchema = {
  houseNumber: yup.string().required('errors:required_field'),
  streetName: yup.string().required('errors:required_field'),
  zipCode: yup.number().required('errors:required_field'),
  city: yup.string().required('errors:required_field'),
  latitude: yup.number().required('errors:required_field'),
  longitude: yup.number().required('errors:required_field')
}

export type Hour = `${number}:${number}`

export interface Opening {
  open: Hour // like 19:00
  close: Hour // like 19:30
}

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6
export const DAY_OF_WEEK = [0, 1, 2, 3, 4, 5, 6] as DayOfWeek[]

export interface SiteMember {
  role: SiteRole,
  member: User
}

// @ts-expect-error Hour type doesn't match the string type
export const openingsSchema: yup.SchemaOf<Opening> = yup.object().shape({
  open: yup.string().required('errors:required_field'),
  close: yup.string().required('errors:required_field')
})

export const scheduleSchema = yup.array().of(openingsSchema).nullable()
export const siteCreationSchema: yup.SchemaOf<Omit<Site, 'id' | 'images' | 'organization'>> = yup.object().shape({
  ...nameSchema,
  description: descriptionSchema,
  address: yup.object().shape({ ...addressSchema }).defined(),
  schedules: yup.array().of(scheduleSchema).optional(),
  isPublic: yup.boolean().default(true),
  launchDate: yup.date().typeError('errors:date').optional(),
  accessConditions: descriptionSchema.when('isPublic', (isPublic, schema) => {
    return !isPublic ? schema.required('errors:required_field') : schema.transform(() => undefined)
  }),
  householdsAmount: yup.number()
    .allowUndefined()
    .typeError('errors:number')
    .positive('errors:positive_number'),
  treatedWaste: yup.number()
    .allowUndefined()
    .typeError('errors:number')
    .positive('errors:positive_number')
})

export const addMemberToSiteSchema = yup.object().shape({
  ...emailSchema,
  role: yup.mixed<SiteRole>().oneOf(Object.values(SiteRole), 'testesr').required('errors:required_field').default(SiteRole.MEMBER)
})

export type CreateSiteMember = RemoveIndex<yup.InferType<typeof addMemberToSiteSchema>>
export type CreateSite = RemoveIndex<yup.InferType<typeof siteCreationSchema>>

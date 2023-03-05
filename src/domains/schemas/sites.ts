import * as yup from 'yup'

import { RemoveIndex } from '@/helpers/typing'

import { descriptionSchema } from './common'

export type Schedule = Opening[] | null
export type Site = {
  id: number
  name: string
  description?: string
  images: string[]
  address: Address
  schedules: Schedule[] // array of 7 SiteSchedule for each day of week
}

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
  latitude: string
  longitude: string
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

export const openingsSchema = yup.object().shape({
  open: yup.string().required('errors:required_field'),
  close: yup.string().required('errors:required_field')
})

export const scheduleSchema = yup.array().of(openingsSchema).required()
export const siteCreationSchema = yup.object().shape({
  ...nameSchema,
  description: descriptionSchema,
  address: yup.object().shape({ ...addressSchema }).defined(),
  schedules: yup.array().of(yup.array().of(scheduleSchema)),
  isPublic: yup.boolean().default(true),
  accessConditions: descriptionSchema.optional()
})

export type CreateSite = RemoveIndex<yup.InferType<typeof siteCreationSchema>>

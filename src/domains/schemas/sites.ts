export interface Site {
  id: number
  name: string
  description?: string
  avatar?: string
  images: string[]
  address: Address
  schedules: Schedule[]
}

export interface Address {
  houseNumber: string
  streetName: string
  zipCode: number
  city: string
  latitude: string
  longitude: string
}

export interface Schedule {
  dayOfWeek:DayOfWeek // beetween 1 and 7
  open?: string // like 19:00
  close?: string // like 19:30
}

export type DayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7

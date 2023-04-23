import { Address } from '@/domains/schemas'

export const getAddressString = (address: Address): string => {
  return `${address.houseNumber} ${address.streetName}, ${address.zipCode} ${address.city}`
}

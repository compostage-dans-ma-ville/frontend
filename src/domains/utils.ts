import { Address, Hour } from './schemas'

export const hourAsNumber = (hour: Hour): number => {
  return Number(hour.replace(':', '.'))
}

export const formatAddress = ({
  houseNumber, streetName, zipCode, city
}: Address): string => {
  return `${houseNumber} ${streetName}, ${zipCode} ${city}`
}

export const isNumeric = (str: string): boolean => {
  // @ts-ignore
  // eslint-disable-next-line no-restricted-globals
  return !isNaN(parseFloat(str)) && isFinite(str)
}

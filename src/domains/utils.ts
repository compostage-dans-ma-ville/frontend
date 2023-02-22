import { Hour } from './schemas'

export const hourAsNumber = (hour: Hour): number => {
  return Number(hour.replace(':', '.'))
}

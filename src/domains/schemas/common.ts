import * as yup from 'yup'

export const DESCRIPTION_MAX_LENGTH = 800

export const descriptionSchema = {
  description: yup.string().max(DESCRIPTION_MAX_LENGTH, 'errors:max_length')
}

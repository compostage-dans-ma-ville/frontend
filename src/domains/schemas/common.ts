import yup from '@/helpers/yup-extended'

export const DESCRIPTION_MAX_LENGTH = 800

export const descriptionSchema = yup.string().emptyAsUndefined().max(DESCRIPTION_MAX_LENGTH, 'errors:max_length')

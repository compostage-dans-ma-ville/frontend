import * as yup from 'yup'

export const MAX_IMAGE_SIZE = 64000000 // 8Mo
export const ALLOWED_IMAGE_EXTENSION = ['png', 'jpeg', 'jpg']

const getFileExtension = (file: File): string => file.name.split('.').pop() as string

export const avatarFileSchema = yup
  .mixed()
  .required()
  .test('fileExtension', 'The file extension is invalid', (value: File) => {
    const fileExtension = getFileExtension(value)
    return ALLOWED_IMAGE_EXTENSION.includes(fileExtension)
  })
  .test('fileSize', 'The file is too large', (value: File) => {
    return value.size <= MAX_IMAGE_SIZE
  })

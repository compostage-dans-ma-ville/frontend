import yup from '@/helpers/yup-extended'

const LAT_LONG_ERROR = 'longitude and latitude parameters should be provided together'

export const mapLocationQueriesSchema = yup.object().shape({
  latitude: yup.number().typeError('latitude must be a number').optional().when('longitude', (longitude, schema) => {
    if (longitude) return schema.required(LAT_LONG_ERROR)
    return schema
  }),
  longitude: yup.number().typeError('longitude must be a number').optional().when('latitude', (latitude, schema) => {
    if (latitude) return schema.required(LAT_LONG_ERROR)
    return schema
  }),
  zoom: yup.number().typeError('zoom must be a number').optional()
}, [['latitude', 'longitude']])

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios'

import { Organization } from '../schemas/organization'

export const getOrganization = (organizationId: number | string) => {
  return axios.get<Organization>(`/organizations/${organizationId}`)
}

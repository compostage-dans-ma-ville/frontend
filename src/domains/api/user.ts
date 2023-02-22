/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios'

import { AuthenticatedUser, EditUser, User } from '../schemas'

export const getMe = () => {
  return axios.get<AuthenticatedUser>('/users/me')
}

export const uploadAvatar = (avatar: Blob) => {
  const formData = new FormData()
  formData.append('avatar', avatar)

  return axios.post<{link: string}>('/users/me/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const updateUser = (userId: number, user: Partial<EditUser>) => {
  return axios.post<User>(`/users/${userId}`, user)
}

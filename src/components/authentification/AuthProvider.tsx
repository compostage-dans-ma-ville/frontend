import React from 'react'

import { useRouter } from 'next/router'
import { AuthService } from '@/domains/AuthService'
import HttpStatusCode from '@/domains/HttpStatusCode'
import axios, { AxiosError } from 'axios'
import { useMe } from '@/contexts'

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const { logout } = useMe()

  axios.interceptors.response.use((response) => {
    return response
  }, (error: AxiosError) => {
    if (error?.response?.status === HttpStatusCode.UNAUTHORIZED) {
      logout()
      router.push({
        pathname: '/authentification/login',
        query: `redirect_url=${window.location.href}`
      })
    } else Promise.reject(error)
  })

  axios.interceptors.request.use(
    config => {
      const token = AuthService.getToken()

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    error => {
      Promise.reject(error)
    }
  )

  return (<>{children}</>)
}

export default AuthProvider

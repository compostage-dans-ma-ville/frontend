import React from 'react'

import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'

import { useMe } from '@/contexts'
import { AuthService } from '@/domains/AuthService'
import HttpStatusCode from '@/domains/HttpStatusCode'
import { Routes } from '@/domains/Routes'

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const { logout } = useMe()

  axios.interceptors.response.use((response) => {
    return response
  }, (error: AxiosError) => {
    if (error?.response?.status === HttpStatusCode.UNAUTHORIZED) {
      logout()
      router.push({
        pathname: Routes.login,
        query: `redirect_url=${window.location.href}`
      })
    }

    return Promise.reject(error)
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

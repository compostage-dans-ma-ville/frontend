import React from 'react'

import { useRouter } from 'next/router'

import { Routes } from '../Routes'

type RedirectToLoginReturn = {
  redirect: () => void
  link: string
}
export const useRedirectToLogin = (): RedirectToLoginReturn => {
  const router = useRouter()

  const redirectUrl = React.useMemo(() => {
    if (typeof window !== 'undefined') return `redirect_url=${window.location.href}`
    return ''
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname])

  const redirect = React.useCallback(() => {
    router.push({
      pathname: Routes.login,
      query: redirectUrl
    })
  }, [redirectUrl, router])

  return {
    redirect,
    link: Routes.login + '?' + redirectUrl
  }
}

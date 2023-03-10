import '@/styles/globals.css'
import React from 'react'

import { CssBaseline, ThemeProvider } from '@mui/material'

import { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import axios from 'axios'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { SnackbarProvider } from 'notistack'
import { SWRConfig } from 'swr'

import AuthProvider from '@/components/authentification/AuthProvider'
import { UserProvider } from '@/contexts'
import { customTheme } from '@/styles/theme'
import createEmotionCache from '@/styles/utils/createEmotionCache'

const clientSideEmotionCache = createEmotionCache()
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASEURL
axios.defaults.withCredentials = false

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const App: React.FC<MyAppProps> = ({ Component, emotionCache = clientSideEmotionCache, pageProps }) => {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false
      }}
    >
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={customTheme}>
          <UserProvider>
            <AuthProvider>
              <SnackbarProvider maxSnack={3}>
                <CssBaseline />
                <Component {...pageProps} />
              </SnackbarProvider>
            </AuthProvider>
          </UserProvider>
        </ThemeProvider>
      </CacheProvider>
    </SWRConfig>
  )
}

export default appWithTranslation(App)

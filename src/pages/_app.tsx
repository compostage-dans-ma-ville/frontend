import '@/styles/globals.css'
import React from 'react'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'

import { createMongoAbility } from '@casl/ability'
import { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import axios from 'axios'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { SnackbarProvider } from 'notistack'
import { SWRConfig } from 'swr'

import AuthProvider from '@/components/authentification/AuthProvider'
import { AbilityContext, UserProvider } from '@/contexts'
import { AppAbility } from '@/domains/ability'
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
          <AbilityContext.Provider value={createMongoAbility<AppAbility>()}>
            <UserProvider>
              <AuthProvider>
                <SnackbarProvider maxSnack={3}>
                  <CssBaseline />
                  <Component {...pageProps} />
                </SnackbarProvider>
              </AuthProvider>
            </UserProvider>
          </AbilityContext.Provider>
        </ThemeProvider>
      </CacheProvider>
    </SWRConfig>
  )
}

export default appWithTranslation(App)

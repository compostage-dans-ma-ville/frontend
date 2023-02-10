import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '@/styles/theme'
import createEmotionCache from '@/styles/utils/createEmotionCache'
import { CacheProvider } from '@emotion/react'
import React from 'react'
import { EmotionCache } from '@emotion/cache'
import { appWithTranslation } from 'next-i18next'
import axios from 'axios'
import { SWRConfig } from 'swr'
import { SnackbarProvider } from 'notistack'

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
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <CssBaseline />
            <Component {...pageProps} />
          </SnackbarProvider>
        </ThemeProvider>
      </CacheProvider>
    </SWRConfig>

  )
}

export default appWithTranslation(App)

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '@/styles/theme'
import createEmotionCache from '@/styles/utils/createEmotionCache'
import { CacheProvider } from '@emotion/react'
import React from 'react'
import { EmotionCache } from '@emotion/cache'
import { appWithTranslation } from 'next-i18next'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import axios from 'axios'

const clientSideEmotionCache = createEmotionCache()
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASEURL

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const App: React.FC<MyAppProps> = ({ Component, emotionCache = clientSideEmotionCache, pageProps }) => {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default appWithTranslation(App)

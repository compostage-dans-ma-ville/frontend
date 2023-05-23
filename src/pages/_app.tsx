import '@/styles/globals.css'
import React from 'react'

import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import CssBaseline from '@mui/material/CssBaseline'
import IconButton from '@mui/material/IconButton'
import { ThemeProvider, styled } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { createMongoAbility } from '@casl/ability'
import { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import axios from 'axios'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { MaterialDesignContent, SnackbarProvider, closeSnackbar } from 'notistack'
import { SWRConfig } from 'swr'

import AuthProvider from '@/components/authentication/AuthProvider'
import ValidateEmailDialog from '@/components/authentication/ValidateEmailDialog'
import {
  AbilityContext,
  UserProvider,
  ValidateEmailDialogProvider,
  ConfirmDialogProvider
} from '@/contexts'
import { AppAbility } from '@/domains/ability'
import { customTheme } from '@/styles/theme'
import createEmotionCache from '@/styles/utils/createEmotionCache'

const clientSideEmotionCache = createEmotionCache()
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASEURL
axios.defaults.withCredentials = false

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const StyledMaterialDesignContent = styled(MaterialDesignContent)(({ theme }) => ({
  border: '2px black solid',

  '&.notistack-MuiContent-success': {
    backgroundColor: theme.palette.success.main
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: theme.palette.error.main
  },
  '&.notistack-MuiContent-info': {
    backgroundColor: theme.palette.info.main
  },
  '&.notistack-MuiContent-warning': {
    backgroundColor: theme.palette.warning.main
  }
}))

const App: React.FC<MyAppProps> = ({ Component, emotionCache = clientSideEmotionCache, pageProps }) => {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false
      }}
    >
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={customTheme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AbilityContext.Provider value={createMongoAbility<AppAbility>()}>
              <UserProvider>
                <AuthProvider>
                  <SnackbarProvider
                    maxSnack={3}
                    Components={{
                      success: StyledMaterialDesignContent,
                      error: StyledMaterialDesignContent,
                      warning: StyledMaterialDesignContent,
                      info: StyledMaterialDesignContent
                    }}
                    action={(snackbarId): JSX.Element => (
                      <>
                        <IconButton aria-label="delete" sx={{ color: 'white' }} onClick={(): void => closeSnackbar(snackbarId)} size="small">
                          <ClearRoundedIcon fontSize="inherit" />
                        </IconButton>
                      </>
                    )}
                  >
                    <ValidateEmailDialogProvider>
                      <ConfirmDialogProvider>
                        <CssBaseline />
                        <Component {...pageProps} />
                      </ConfirmDialogProvider>
                      <ValidateEmailDialog />
                    </ValidateEmailDialogProvider>
                  </SnackbarProvider>
                </AuthProvider>
              </UserProvider>
            </AbilityContext.Provider>
          </LocalizationProvider>
        </ThemeProvider>
      </CacheProvider>
    </SWRConfig>
  )
}

export default appWithTranslation(App)

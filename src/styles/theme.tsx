import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded'
import { frFR as coreFrFR } from '@mui/material/locale'
import { createTheme } from '@mui/material/styles'
import { frFR as datePickerLocale } from '@mui/x-date-pickers/locales'

export const customTheme = createTheme(
  {
    palette: {
      primary: {
        main: '#00523b'
      },
      secondary: {
        main: '#110B11'
      },
      success: {
        main: '#038857'
      },
      warning: {
        main: '#fd9406'
      },
      info: {
        main: '#1E91D6'
      },
      error: {
        main: '#ff5541'
      },
      background: {
        default: '#FEFFF6'
      }
    },
    shape: {
      borderRadius: 8
    },
    components: {
      MuiAvatar: {
        styleOverrides: {
          root: ({ theme }) => theme.unstable_sx({
            border: 'solid',
            borderColor: theme.palette.primary.main,
            borderWidth: 3
          })
        }
      },
      MuiAlert: {
        defaultProps: {
          iconMapping: {
            info: <TipsAndUpdatesRoundedIcon />
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: ({ theme }) => theme.unstable_sx({
            textTransform: 'none',
            width: 'fit-content'
          })
        }
      },
      MuiDialog: {
        styleOverrides: {
          root: ({ theme }) => theme.unstable_sx({
            backdropFilter: 'blur(3px)'
          })
        }
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: '#FEFFF6 !important'
          }
        }
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: ({ theme }) => theme.unstable_sx({
            backdropFilter: 'blur(3px)'
          })
        }
      }
    }
  },
  datePickerLocale,
  coreFrFR
)

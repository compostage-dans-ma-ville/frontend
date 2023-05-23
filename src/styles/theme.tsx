import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded'
import { frFR as coreFrFR } from '@mui/material/locale'
import { createTheme } from '@mui/material/styles'
import { frFR as datePickerLocale } from '@mui/x-date-pickers/locales'

import { Anton } from '@next/font/google'

// TODO: add nice font to site
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const font = Anton({
  subsets: ['latin'],
  weight: '400'
})

export const customTheme = createTheme(
  {
    palette: {
      primary: {
        main: '#00523b'
      },
      secondary: {
        main: '#000'
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
        main: '#CC0000'
      },
      background: {
        default: '#FEFFF6'
      }
    },
    shape: {
      borderRadius: 8
    },
    typography: {
      fontFamily: [
        // font.style.fontFamily,
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif'
      ].join(',')
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
        },
        styleOverrides: {
          root: ({ theme }) => theme.unstable_sx({
            border: 'none'
          })
        }
      },
      MuiButton: {
        styleOverrides: {
          root: ({ theme, ownerState }) => theme.unstable_sx({
            textTransform: 'none',
            width: 'fit-content',
            ':hover': {
              boxShadow: 'none'
            },
            ...(ownerState.variant === 'contained'
             && {
               border: 'solid black 1px',
               boxShadow: 'none',

               ...(ownerState.disabled && {
                 borderColor: 'transparent'
               })
             })
          })
        }
      },
      MuiChip: {
        styleOverrides: {
          root: ({ theme }) => theme.unstable_sx({
            border: 'solid black 1px'
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
      MuiDialog: {
        styleOverrides: {
          root: ({ theme }) => theme.unstable_sx({
            backdropFilter: 'blur(3px)'
          })
        }
      },
      MuiDivider: {
        styleOverrides: {
          root: ({ theme }) => theme.unstable_sx({
            borderColor: 'rgba(0,0,0,0.4)'
          })
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => theme.unstable_sx({
            boxShadow: 'none',
            border: 'solid black 2px'
          })
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

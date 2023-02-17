import { createTheme } from '@mui/material/styles'

export const customTheme = createTheme({
  palette: {
    primary: {
      main: '#0A6259'
    },
    error: {
      main: '#FD7064'
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
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => theme.unstable_sx({
          textTransform: 'none',
          width: 'fit-content'
        })
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#FEFFF6 !important'
        }
      }
    }
  }
})

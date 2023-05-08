import React from 'react'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import LinearProgress from '@mui/material/LinearProgress'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { useRedirectToLogin } from '@/domains/hooks'

import Can, { CanProps } from '../Can'

export type CanOrLoginProps = CanProps
const CanOrLogin: React.FC<CanProps> = ({ children, ...restProps }) => {
  const { t } = useTranslation([
    'common',
    'authentication'
  ])
  const { link } = useRedirectToLogin()

  const [isChecking, setIsChecking] = React.useState(true)

  React.useEffect(() => {
    setTimeout(() => {
      setIsChecking(false)
    }, 500)
  }, [])

  return (
    <>
      <Can {...restProps}>
        {children}
      </Can>
      <Can not {...restProps}>
        <Container maxWidth='lg'>
          <Paper sx={{ overflow: 'hidden' }}>
            {isChecking
              ? (
                <>
                  <LinearProgress />
                  <Typography
                    variant='h5'
                    color="primary.main"
                    component="h2"
                    sx={{
                      margin: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <LockOutlinedIcon />
                    {t('common:ability_check')}
                  </Typography>
                </>
              )
              : (
                <Grid container margin={2} direction='column' alignItems='center'>
                  <Grid item>
                    <Typography
                      variant='h5'
                      color="primary.main"
                      component="h2"
                      textAlign='center'
                    >
                      {t('common:restricted_to_users')}
                    </Typography>
                  </Grid>

                  <Grid item mt={2} justifyContent='center'>
                    <Link href={link}>
                      <Button variant="contained">
                        {t('authentication:login_title')}
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              )}

          </Paper>
        </Container>
      </Can>
    </>
  )
}

export default CanOrLogin

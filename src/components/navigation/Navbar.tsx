import * as React from 'react'

import Close from '@mui/icons-material/Close'
import Menu from '@mui/icons-material/Menu'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import Navigation from '@/components/navigation/Navigation'
import { useIsMobile } from '@/domains/hooks'
import { Routes } from '@/domains/Routes'

import AuthNavigation from './AuthNavigation'

const Navbar: React.FC = () => {
  const { t } = useTranslation([
    'common'
  ])
  const [visibleMenu, setVisibleMenu] = React.useState<boolean>(false)
  const { breakpoints } = useTheme()
  const matchMobileView = useMediaQuery(breakpoints.down('md'))
  const isMobile = useIsMobile()

  return (
    <Box>
      <Container sx={{ py: { xs: 2, md: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href={Routes.home} aria-label={t('common:app_name')}>
            <Image src={`/images/${isMobile ? 'icon' : 'icon-with-text-right'}.svg`} alt={t('common:app_name')} width={isMobile ? 70 : 180} height={isMobile ? 20 : 30} />
          </Link>

          <Box sx={{ ml: 'auto', display: { xs: 'inline-flex', md: 'none' } }}>
            <IconButton onClick={(): void => setVisibleMenu(!visibleMenu)}>
              <Menu />
            </IconButton>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', md: 'row' },

              transition: (theme) => theme.transitions.create(['top']),
              ...(matchMobileView && {
                py: 6,
                backgroundColor: 'background.default',
                zIndex: 'appBar',
                position: 'fixed',
                height: { xs: '100vh', md: 'auto' },
                top: visibleMenu ? 0 : '-120vh',
                left: 0
              })
            }}
          >
            <Box /> {/* Magic space */}
            <Navigation />
            <AuthNavigation />
            {visibleMenu && matchMobileView && (
              <IconButton
                sx={{
                  position: 'fixed',
                  top: 10,
                  right: 10
                }}
                onClick={(): void => setVisibleMenu(!visibleMenu)}
              >
                <Close />
              </IconButton>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar

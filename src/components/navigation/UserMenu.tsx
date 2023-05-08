import React from 'react'

import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { green } from '@mui/material/colors'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useTheme } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { useValidateEmailDialog } from '@/contexts'
import { useIsMobile } from '@/domains/hooks'
import { Routes } from '@/domains/Routes'
import { AuthenticatedUser } from '@/domains/schemas'

export interface UserMenuProps {
  user: AuthenticatedUser
  logout: () => void
}

const UserMenu: React.FC<UserMenuProps> = ({ user, logout }) => {
  const theme = useTheme()
  const isMobile = useIsMobile()
  const { t } = useTranslation([
    'common'
  ])
  const { open } = useValidateEmailDialog()

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = (): void => {
    setAnchorElUser(null)
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip
        title={t('common:validate_email')}
        arrow
        placement='left'
        open={!isMobile && !user.isEmailConfirmed}
        sx={{ zIndex: 'appBar' }}
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: theme.palette.primary.main
            }
          }
        }}
      >
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user.firstName} src={user.avatar} sx={{ bgcolor: green[500] }}/>
        </IconButton>
      </Tooltip>

      <Menu
        sx={{ mt: '45px', zIndex: 'appBar' }}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Box sx={{ mx: 2, lineHeight: 0.3, mb: 1 }}>
          <Typography sx={{ fontWeight: 'bold', minWidth: 200 }}>{user.firstName} {user.lastName}</Typography>
          <Typography variant="caption" sx={{ mt: -2 }} >{user.email}</Typography>
        </Box>

        {!user.isEmailConfirmed && (
          <Box sx={{
            mx: 2, mb: 1, display: 'flex', justifyContent: 'center'
          }}>
            <Button
              variant='contained'
              color='primary'
              size='small'
              startIcon={<ArrowUpwardRoundedIcon />}
              onClick={(): void => {
                open()
                handleCloseUserMenu()
              }}
            >
              {t('common:validate_email')}
            </Button>
          </Box>

        )}

        <Divider />

        <Link href={Routes.user(user.id)}>
          <MenuItem onClick={handleCloseUserMenu}>
            <ListItemIcon>
              <AccountCircleRoundedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{t('common:profile')}</ListItemText>
          </MenuItem>
        </Link>

        <Divider />

        <MenuItem onClick={():void => {
          handleCloseUserMenu()
          logout()
        }}>
          <ListItemIcon>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('common:logout')}</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default UserMenu

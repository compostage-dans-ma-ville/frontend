import React from 'react'
import { AuthenticatedUser } from '@/domains/schemas'

import Avatar from '@mui/material/Avatar'
import { green } from '@mui/material/colors'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'

export interface UserMenuProps {
  user: AuthenticatedUser
  logout: () => void
}

const UserMenu: React.FC<UserMenuProps> = ({ user, logout }) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const { t } = useTranslation()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = (): void => {
    setAnchorElUser(null)
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar alt={user.firstName} src={user.avatar} sx={{ bgcolor: green[500] }}/>
      </IconButton>
      <Menu
        sx={{ mt: '45px' }}
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

        <Divider />

        <Link href={`/users/${user.id}`}>
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

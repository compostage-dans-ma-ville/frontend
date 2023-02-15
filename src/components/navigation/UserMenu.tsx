import React from 'react'
import { User } from '@/domains/schemas'

import Avatar from '@mui/material/Avatar'
import { green } from '@mui/material/colors'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export interface UserMenuProps {
  user: User
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
        id="menu-appbar"
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
        <MenuItem onClick={handleCloseUserMenu}>
          <Link href={`/users/${user.id}`}>
            <Typography textAlign="center">{t('common:profile')}</Typography>
          </Link>
        </MenuItem>
        <MenuItem onClick={():void => {
          handleCloseUserMenu()
          logout()
        }}>
          <Typography textAlign="center">{t('common:logout')}</Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default UserMenu

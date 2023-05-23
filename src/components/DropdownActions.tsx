import React from 'react'

import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'

import { useTranslation } from 'next-i18next'

export interface DropdownActionsProps extends IconButtonProps{}

const DropdownActions: React.FC<React.PropsWithChildren<DropdownActionsProps>> = ({ children, ...props }) => {
  const { t } = useTranslation([
    'common'
  ])
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (): void => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        {...props}
        aria-label={t('common:see_actions')}
        color='secondary'
        onClick={handleClick}
      >
        <MoreVertRoundedIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        sx={{ padding: 0 }}
        MenuListProps={{
          dense: true
        }}
      >
        {children}
      </Menu>
    </>
  )
}

export default DropdownActions

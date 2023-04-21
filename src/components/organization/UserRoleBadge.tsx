import React from 'react'

import Chip, { ChipTypeMap } from '@mui/material/Chip'
import { OverridableComponent } from '@mui/material/OverridableComponent'

import { useTranslation } from 'next-i18next'

import { OrganizationRole } from '@/domains/schemas/organization'

export interface UserRoleBadgeProps extends Partial<OverridableComponent<ChipTypeMap<{}, 'div'>>> {
  role: OrganizationRole
}
const UserRoleBadge: React.FC<UserRoleBadgeProps> = ({ role, ...props }) => {
  const { t } = useTranslation([
    'common'
  ])

  const getTranslation = (): string => {
    if (role === OrganizationRole.ADMIN) return t('common:admin')
    if (role === OrganizationRole.MEMBER) return t('common:member')
    return ''
  }

  return (
    <Chip {...props} label= {getTranslation()} />
  )
}

export default UserRoleBadge

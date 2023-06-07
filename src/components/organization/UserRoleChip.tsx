import React from 'react'

import Chip, { ChipProps } from '@mui/material/Chip'

import { useTranslation } from 'next-i18next'

import { OrganizationRole, SiteRole } from '@/domains/schemas'

export interface UserRoleChipProps extends Partial<ChipProps> {
  role: OrganizationRole | SiteRole
}
const UserRoleChip: React.FC<UserRoleChipProps> = ({ role, ...props }) => {
  const { t } = useTranslation([
    'common'
  ])

  const getTranslation = (): string => {
    if (role === OrganizationRole.ADMIN) return t('common:admin')
    if (role === OrganizationRole.MEMBER) return t('common:member')
    if (role === SiteRole.REFEREE) return t('common:referee')
    return ''
  }

  return (
    <Chip {...props} size={props?.size || 'small'} label= {getTranslation()} />
  )
}

export default UserRoleChip

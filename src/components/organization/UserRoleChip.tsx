import React from 'react'

import Chip, { ChipProps } from '@mui/material/Chip'

import { useTranslation } from 'next-i18next'

import { OrganizationRole } from '@/domains/schemas/organization'

export interface UserRoleChipProps extends Partial<ChipProps> {
  role: OrganizationRole
}
const UserRoleChip: React.FC<UserRoleChipProps> = ({ role, ...props }) => {
  const { t } = useTranslation([
    'common'
  ])

  const getTranslation = (): string => {
    if (role === OrganizationRole.ADMIN) return t('common:admin')
    if (role === OrganizationRole.MEMBER) return t('common:member')
    return ''
  }

  return (
    <Chip {...props} size={props?.size || 'small'} label= {getTranslation()} />
  )
}

export default UserRoleChip

import React from 'react'

import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded'
import LockRoundedIcon from '@mui/icons-material/LockRounded'
import Chip, { ChipProps } from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'

import { useTranslation } from 'next-i18next'

export interface IsPublicChipProps extends Partial<ChipProps> {
  isPublic: boolean
}
const IsPublicChip: React.FC<IsPublicChipProps> = ({ isPublic, ...props }) => {
  const { t } = useTranslation([
    'common'
  ])

  return (
    <Tooltip title={isPublic ? t('common:public_site_description') : t('common:private_site_description')}>
      <Chip
        {...props}
        icon={isPublic ? <LockOpenRoundedIcon /> : <LockRoundedIcon />}
        label={isPublic ? t('common:public') : t('common:private')}
        color={isPublic ? 'success' : 'error'}
        size={props.size || 'small'}
        sx={{ fontWeight: 'bold', mr: 2 }}
      />
    </Tooltip>
  )
}

export default IsPublicChip

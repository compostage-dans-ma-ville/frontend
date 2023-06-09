import React from 'react'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectProps } from '@mui/material/Select'

import { useTranslation } from 'next-i18next'

import { SiteRole } from '@/domains/schemas'

export interface SiteMemberRoleSelectProps extends Omit<SelectProps, 'onChange'> {
  value?: SiteRole
  onChange: (site: SiteRole) => void
}

const SiteMemberRoleSelect: React.FC<SiteMemberRoleSelectProps> = ({ onChange, ...props }) => {
  const { t } = useTranslation([
    'pages'
  ])

  return (
    <FormControl fullWidth sx={{ mt: 1 }}>
      <InputLabel id="SiteMemberRoleSelect-select-label">{props.label}</InputLabel>
      <Select
        labelId="SiteMemberRoleSelect-select-label"
        onChange={(event): void => {
          onChange(event.target.value as SiteRole)
        }}
        {...props}
      >
        {Object.keys(SiteRole).map((role) => (
          <MenuItem key={role} value={role}>{t(`pages:site.roleEnum.${role}`)}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SiteMemberRoleSelect

import React from 'react'

import Alert from '@mui/material/Alert'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectProps } from '@mui/material/Select'

import { useTranslation } from 'next-i18next'

import { SiteRole } from '@/domains/schemas'

export interface SiteMemberRoleSelectProps extends Omit<SelectProps, 'onChange'> {
  value: SiteRole
  onChange: (site: SiteRole) => void
  showHints?: boolean
}

const SiteMemberRoleSelect: React.FC<SiteMemberRoleSelectProps> = ({
  onChange, value, showHints = true, defaultValue = SiteRole.MEMBER, ...props
}) => {
  const { t } = useTranslation([
    'pages'
  ])

  return (
    <>
      <FormControl fullWidth sx={{ mt: 1 }}>
        <InputLabel id="SiteMemberRoleSelect-select-label">{props.label}</InputLabel>
        <Select
          labelId="SiteMemberRoleSelect-select-label"
          onChange={(event): void => {
            onChange(event.target.value as SiteRole)
          }}
          value={value}
          defaultValue={defaultValue}
          {...props}
        >
          {Object.keys(SiteRole).map((role) => (
            <MenuItem key={role} value={role}>{t(`pages:site.roleEnum.${role}`)}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {showHints && value === SiteRole.REFEREE && (
        <>
          <Alert sx={{ mt: 2 }} severity="info">{t('pages:site.info_role_referee')}</Alert>
          <Alert sx={{ mt: 2 }} severity="error">{t('pages:site.warning_role_referee')}</Alert>
        </>
      )}

      {showHints && value === SiteRole.ADMIN && (
        <Alert sx={{ mt: 2 }} severity="error">{t('pages:site.warning_role_admin')}</Alert>
      )}
    </>
  )
}

export default SiteMemberRoleSelect

import React from 'react'

import Diversity2RoundedIcon from '@mui/icons-material/Diversity2Rounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded'
import LockRoundedIcon from '@mui/icons-material/LockRounded'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import { useTranslation } from 'next-i18next'

import { Site } from '@/domains/schemas'

import ScheduleList from './ScheduleList'
import OrganizationListItemContent from '../organization/OrganizationListItemContent'

export interface SiteInfoProps {
  site: Site
}

const SiteInfo: React.FC<SiteInfoProps> = ({ site }) => {
  const { t } = useTranslation([
    'common',
    'pages'
  ])

  return (
    <>
      <Typography variant="h4" component="h1" >
        {site.name}
      </Typography>

      <Box>
        <Tooltip title={site.isPublic ? t('pages:site.public_description') : t('pages:site.private_description')}>
          <Chip
            icon={site.isPublic ? <LockOpenRoundedIcon /> : <LockRoundedIcon />}
            label={site.isPublic ? t('common:public') : t('common:private')}
            color={site.isPublic ? 'success' : 'error'}
            size="small"
            sx={{ fontWeight: 'bold' }}
          />
        </Tooltip>
      </Box>

      {site.description && (
        <Typography variant="body1" color="text.secondary" marginLeft={2} marginTop={2}>
          {site.description}
        </Typography>
      )}

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <LocationOnRoundedIcon fontSize="large" color="primary" />
          </ListItemAvatar>

          <Typography fontWeight="bold">
            {site.address.houseNumber}&nbsp;
            {site.address.streetName},&nbsp;
            {site.address.zipCode}&nbsp;
            {site.address.city}
          </Typography>

        </ListItem>
        {site.schedules && (
          <>
            <Divider variant="inset" component="li" />
            <ScheduleList schedules={site.schedules}/>
          </>
        )}

        {site.organization && (
          <>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="center">
              <ListItemAvatar>
                <Diversity2RoundedIcon fontSize="large" color="primary" />
              </ListItemAvatar>

              <Grid container>
                <Grid item width="100%">
                  <Typography variant='body2'>
                    {t('pages:site.site_handled_by')}:
                  </Typography>
                  <OrganizationListItemContent
                    organization={site.organization}
                    showLink
                  />
                </Grid>
              </Grid>
            </ListItem>
          </>
        )}

      </List>
    </>
  )
}

export default SiteInfo

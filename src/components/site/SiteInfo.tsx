import React from 'react'

import Diversity2RoundedIcon from '@mui/icons-material/Diversity2Rounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Typography from '@mui/material/Typography'

import { useTranslation } from 'next-i18next'

import { Site } from '@/domains/schemas'

import IsPublicChip from './IsPublicChip'
import ScheduleList from './ScheduleList'
import TeamList from './TeamList'
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
      <Typography variant="h4" component="h1">
        {site.name}
      </Typography>

      <Box>
        <IsPublicChip isPublic={site.isPublic}/>
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

        {site.accessConditions && (
          <>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="center">
              <ListItemAvatar>
                <LockOutlinedIcon fontSize="large" color="primary" />
              </ListItemAvatar>

              <Box>
                <Typography variant='body1' component="p" fontWeight="bold">{t('common:access_condition')}</Typography>
                <Typography variant='body2' component="p" sx={{ whiteSpace: 'pre-wrap' }}>
                  {site.accessConditions}
                </Typography>
              </Box>
            </ListItem>
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

        <Divider variant="inset" component="li" />
        <TeamList site={site} />
      </List>
    </>
  )
}

export default SiteInfo

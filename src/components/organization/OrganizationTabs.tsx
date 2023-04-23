import React from 'react'

import AddRoundedIcon from '@mui/icons-material/AddRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'

import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { useOrganizationMembers, useOrganizationSites } from '@/domains/api/hooks'
import { Routes } from '@/domains/Routes'
import { Organization, OrganizationRole } from '@/domains/schemas/organization'
import { getAddressString } from '@/helpers/site'
import { getUserFullName } from '@/helpers/user'

import UserRoleChip from './UserRoleChip'
import Can, { an } from '../Can'
import IsPublicChip from '../site/IsPublicChip'

type TabName = 'members' | 'sites'

export interface OrganizationTabsProps {
  organization: Organization
}

const OrganizationTabs: React.FC<OrganizationTabsProps> = ({ organization }) => {
  const { t } = useTranslation([
    'common',
    'pages'
  ])
  const { sites } = useOrganizationSites(organization.id)
  const { members } = useOrganizationMembers(organization.id)
  const [currentTab, setCurrentTab] = React.useState<TabName>('sites')

  const handleTabChange = (event: React.SyntheticEvent, newValue: TabName): void => {
    setCurrentTab(newValue)
  }

  const organizationSubject = React.useMemo(() => {
    return an('organization', organization)
  }, [organization])

  return (
    <TabContext value={currentTab}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label={t('common:site', { count: sites?.length })} value="sites" sx={{ textTransform: 'none' }} />
            <Tab label={t('common:member', { count: members?.length })} value="members" sx={{ textTransform: 'none' }} />
          </Tabs>
        </Box>

        <TabPanel value="sites">
          <List sx={{ maxHeight: '400px', overflowY: 'auto' }}>
            {sites?.map((site) => (
              <ListItem
                key={site.id}
                secondaryAction={
                  <Link href={Routes.site(site.id)}>
                    <IconButton
                      aria-label={t('common:open_ressource')}
                      color="primary"
                      sx={{ padding: 0 }}
                    >
                      <VisibilityRoundedIcon />
                    </IconButton>
                  </Link>
                }
              >
                <ListItemAvatar>
                  <IsPublicChip isPublic={site.isPublic}/>
                </ListItemAvatar>
                <ListItemText primary={site.name} secondary={getAddressString(site.address)} />
              </ListItem>
            ))}
          </List>

          <Can do="update" on={organizationSubject}>
            <Grid container justifyContent="center" mt={2}>
              <Grid item>
                <Button
                  variant='outlined'
                  startIcon={<AddRoundedIcon />}
                >
                  {t('pages:organization.add_sites')}
                </Button>
              </Grid>
            </Grid>
          </Can>
        </TabPanel>

        <TabPanel value="members">
          <List sx={{ maxHeight: '400px', overflowY: 'auto' }}>
            {members?.map(({ role, member }) => (
              <ListItem
                key={member.id}
                secondaryAction={
                  <Link href={Routes.user(member.id)}>
                    <IconButton
                      aria-label={t('common:open_ressource')}
                      color="primary"
                      sx={{ padding: 0 }}
                    >
                      <VisibilityRoundedIcon />
                    </IconButton>
                  </Link>
                }
              >
                <ListItemAvatar>
                  <Avatar src={member.avatar} />
                </ListItemAvatar>

                <Grid container alignItems="center" columnGap={2}>
                  <Grid item>
                    <Typography>
                      {getUserFullName(member)}
                    </Typography>
                  </Grid>
                  <Grid item>
                    {role !== OrganizationRole.MEMBER && <UserRoleChip role={role}/>}
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>

          <Can do="update" on={organizationSubject}>
            <Grid container justifyContent="center" mt={2}>
              <Grid item>
                <Button
                  variant='outlined'
                  startIcon={<AddRoundedIcon />}
                >
                  {t('pages:organization.add_member')}
                </Button>
              </Grid>
            </Grid>
          </Can>
        </TabPanel>
      </Box>
    </TabContext>

  )
}

export default OrganizationTabs

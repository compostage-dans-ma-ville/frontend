import React from 'react'

import AddRoundedIcon from '@mui/icons-material/AddRounded'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import { useTranslation } from 'next-i18next'

import { useOrganizationMembers, useOrganizationSites } from '@/domains/api/hooks'
import { Organization } from '@/domains/schemas/organization'

import Can, { an } from '../Can'
import SiteListItem from '../site/SiteListItem'
import UserListItem from '../UserListItem'

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
              <SiteListItem key={site.id} site={site} />
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
              <UserListItem
                key={member.id}
                user={member}
                role={role}
              />
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

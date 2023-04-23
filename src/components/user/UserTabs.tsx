import React from 'react'

import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { useUserOrganizations } from '@/domains/api/hooks'
import { Routes } from '@/domains/Routes'
import { User } from '@/domains/schemas'
import { OrganizationRole } from '@/domains/schemas/organization'

import OrganizationListItemContent from '../organization/OrganizationListItemContent'

type TabName = 'organizations'

export interface UserTabsProps {
  user: User
}

const UserTabs: React.FC<UserTabsProps> = ({ user }) => {
  const { t } = useTranslation([
    'common'
  ])
  const [currentTab, setCurrentTab] = React.useState<TabName>('organizations')

  const { organizations } = useUserOrganizations(user.id)

  const handleTabChange = (event: React.SyntheticEvent, newValue: TabName): void => {
    setCurrentTab(newValue)
  }

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
            <Tab
              label={t('common:organization', { count: organizations?.length })}
              value="organizations"
              sx={{ textTransform: 'none' }}
            />
          </Tabs>
        </Box>

        <TabPanel value="organizations">
          <List sx={{ maxHeight: '400px', overflowY: 'auto' }}>
            {organizations?.map(({ role, organization }) => (
              <ListItem
                key={organization.id}
                secondaryAction={
                  <Link href={Routes.organization(organization.id)}>
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
                <OrganizationListItemContent
                  organization={organization}
                  role={role !== OrganizationRole.MEMBER ? role : undefined} />
              </ListItem>
            ))}
          </List>
        </TabPanel>
      </Box>
    </TabContext>

  )
}

export default UserTabs

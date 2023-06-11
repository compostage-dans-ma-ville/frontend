import React from 'react'

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import { useTranslation } from 'next-i18next'
import { useSnackbar } from 'notistack'

import { useConfirm } from '@/contexts'
import { deleteSiteMember } from '@/domains/api'
import { useUserSites } from '@/domains/api/hooks'
import { User } from '@/domains/schemas'

import LoadingButton from '../LoadingButton'
import SiteListItem from '../site/SiteListItem'

type TabName = 'organizations' | 'sites'

export interface UserTabsProps {
  user: User
}

const UserTabs: React.FC<UserTabsProps> = ({ user }) => {
  const { t } = useTranslation([
    'common',
    'pages'
  ])
  const [currentTab, setCurrentTab] = React.useState<TabName>('sites')
  const { enqueueSnackbar } = useSnackbar()
  const { confirm } = useConfirm()

  // const { organizations } = useUserOrganizations(user.id)
  const {
    sites,
    mutate: mutateSites,
    canLoadMore,
    size,
    setSize,
    isLoading
  } = useUserSites(user.id)

  const handleTabChange = (event: React.SyntheticEvent, newValue: TabName): void => {
    setCurrentTab(newValue)
  }

  const onSiteDelete = (siteId: number): void => {
    deleteSiteMember(siteId, user.id).then(() => {
      mutateSites()
      enqueueSnackbar(t('common:saved_modification'), { variant: 'success' })
    }).catch(() => {
      enqueueSnackbar(t('errors:unknow_error'), { variant: 'error' })
    })
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
              label={t('common:site', { count: sites?.length })}
              value="sites"
              sx={{ textTransform: 'none' }}
            />
            {/*
              hide organizations for now

            <Tab
              label={t('common:organization', { count: organizations?.length })}
              value="organizations"
              sx={{ textTransform: 'none' }}
            />
            */}
          </Tabs>
        </Box>

        {/*
          hide organizations for now

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
        */}

        <TabPanel value="sites">
          <List sx={{ maxHeight: '400px', overflowY: 'auto' }}>
            {sites?.map(({ role, site }) => (
              <SiteListItem
                key={site.id}
                site={site}
                role={role}
                secondaryAction={
                  <IconButton
                    color='error'
                    onClick={(): void => confirm(
                      t('pages:user.site.remove'),
                      t('pages:user.site.remove_description', { name: site.name }),
                      (): void => onSiteDelete(site.id),
                      {
                        confirmText: t('pages:user.site.remove'),
                        variant: 'error'
                      }
                    )}
                  >
                    <DeleteRoundedIcon />
                  </IconButton>
                }
              />
            ))}
          </List>
          {canLoadMore && (
            <Grid container justifyContent="center">

              <LoadingButton
                color='primary'
                variant='outlined'
                onClick={(): void => { setSize(size + 1) }}
                loading={isLoading}
              >
                {t('common:display_more')}
              </LoadingButton>
            </Grid>
          )}
        </TabPanel>
      </Box>
    </TabContext>

  )
}

export default UserTabs

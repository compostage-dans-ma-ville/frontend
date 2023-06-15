import React from 'react'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'

export interface WhatToCompostListProps {
  items: Record<string, string[] | null>
}
const WhatToCompostList: React.FC<WhatToCompostListProps> = ({ items }) => {
  return (
    <List sx={{ my: 0 }}>
      {Object.entries(items).map(([title, entries]) => (
        <React.Fragment key={title}>
          <ListItem sx={{ px: 0 }}>
            <Typography fontWeight="bold" variant='h4'>{title}</Typography>
          </ListItem>
          {entries && (
            <List sx={{ p: 0, pl: 2, listStyleType: 'disc' }}>
              {entries.map((entry) => (
                <ListItem key={title + entry} sx={{ py: 0 }}>
                  <Typography margin={0} sx={{ display: 'list-item' }}>{entry}</Typography>
                </ListItem>
              ))}
            </List>
          )}
        </React.Fragment>
      ))}

    </List>
  )
}

export default WhatToCompostList

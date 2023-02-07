import * as React from 'react'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Link from 'next/link'
import Typography from '@mui/material/Typography'

import { styled } from '@mui/material/styles'

const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center'
  },
  nav: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(0),

    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginLeft: 'auto',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2)
    },

    ' a': {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(2)
      }
    }
  }
}))

const Footer: React.FC = () => {
  const content = {
    brand: { image: 'https://webstockreview.net/images/google-clipart-emblem-3.png' },
    copy: '© 2023 compostage All rights reserved.',
    link1: 'First Link',
    link2: 'Second Link',
    link3: 'Third Link',
    link4: 'Fourth Link'
  }

  return (
    <Box component="footer">
      <Container maxWidth="lg">
        <StyledBox py={6} display="flex" flexWrap="wrap" alignItems="center">
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: 700, '& span': { color: 'primary.main' } }}
          >
            Com<span>postage</span>
          </Typography>
          <Box component="nav">
            <Link href="#" color="textPrimary">{content.link1}</Link>
            <Link href="#" color="textPrimary">{content.link2}</Link>
            <Link href="#" color="textPrimary">{content.link3}</Link>
            <Link href="#" color="textPrimary">{content.link4}</Link>
          </Box>
          <Typography color="textSecondary" component="p" variant="caption" gutterBottom={false}>{content.copy}</Typography>
        </StyledBox>
      </Container>
    </Box>
  )
}

export default Footer

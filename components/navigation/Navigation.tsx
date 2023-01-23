import * as React from 'react'
import Box from '@mui/material/Box'
import Link from 'next/link'

const navigations = [
  {
    label: 'Home',
    path: '#' // '/',
  },
  {
    label: 'Courses',
    path: 'popular-course' // '/popular-course',
  },
  {
    label: 'Testimonial',
    path: 'testimonial' // '/testimonial',
  },
  {
    label: 'Mentor',
    path: 'mentors' // '/mentors',
  }
]

const Navigation: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      {navigations.map(({ path: destination, label }) => (
        <Box
          component={Link}
          key={destination}
          href={destination}
          sx={{
            position: 'relative',
            color: 'text.disabled',
            cursor: 'pointer',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: { xs: 0, md: 3 },
            mb: { xs: 3, md: 0 },
            fontSize: { xs: '1.2rem', md: 'inherit' },
            ...(destination === '/' && {
              color: 'primary.main'
            }),

            '& > div': { display: 'none' },

            '&.current>div': { display: 'block' },

            '&:hover': {
              color: 'primary.main',
              '&>div': {
                display: 'block'
              }
            }
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              transform: 'rotate(3deg)',
              '& img': { width: 44, height: 'auto' }
            }}
          >
          </Box>
          {label}
        </Box>
      ))}
    </Box>
  )
}

export default Navigation

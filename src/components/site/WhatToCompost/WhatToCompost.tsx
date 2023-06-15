import React from 'react'

import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded'
import ThumbsUpDownRoundedIcon from '@mui/icons-material/ThumbsUpDownRounded'
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box, { BoxProps } from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import WhatToCompostList from './WhatToCompostList'

export interface WhatToCompostProps extends BoxProps {}

const WhatToCompost: React.FC<WhatToCompostProps> = ({ ...props }) => {
  const { t } = useTranslation([
    'common',
    'pages',
    'whatToCompost'
  ])

  const withoutHesitation: Record<string, string[] | null> = t('whatToCompost:without_hesitation', { returnObjects: true })
  const withModeration: Record<string, string[] | null> = t('whatToCompost:with_moderation', { returnObjects: true })
  const toAvoid: Record<string, string[] | null> = t('whatToCompost:to_avoid', { returnObjects: true })

  return (
    <Box mt={2} mx={2} {...props}>
      <Typography variant="h2" color="primary.main" display="flex" alignItems="center">
        {t('pages:site.what_to_compost')}
      </Typography>

      <Box mt={2}>
        <Accordion sx={{ borderColor: 'success.main' }}>
          <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
            <Typography variant='h3' display="flex" alignItems="center">
              <ThumbUpAltRoundedIcon sx={{ color: 'success.main' }} />
              <Typography component="span" ml={1} fontWeight="bold">
                {t('pages:site.without_hesitation')}
              </Typography>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <WhatToCompostList items={withoutHesitation}/>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ borderColor: 'warning.main' }}>
          <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
            <Typography variant='h3' display="flex" alignItems="center">
              <ThumbsUpDownRoundedIcon sx={{ color: 'warning.main' }} />
              <Typography component="span" ml={1} fontWeight="bold">
                {t('pages:site.with_moderation')}
              </Typography>
            </Typography>

          </AccordionSummary>
          <AccordionDetails>
            <WhatToCompostList items={withModeration}/>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ borderColor: 'error.main' }}>
          <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
            <Typography variant='h3' display="flex" alignItems="center">
              <ThumbDownAltRoundedIcon sx={{ color: 'error.main' }} />
              <Typography component="span" ml={1} fontWeight="bold">
                {t('pages:site.to_avoid')}
              </Typography>
            </Typography>

          </AccordionSummary>
          <AccordionDetails>
            <WhatToCompostList items={toAvoid}/>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Grid container justifyContent="flex-end">
        <Link href="https://librairie.ademe.fr/cadic/6991/guide-reussir-compost.pdf" target='_blank'>
          <Button color='secondary'>
            <Typography color="secondary.main" fontStyle="italic">{t('common:source')}: Ademe</Typography>
          </Button>
        </Link>
      </Grid>
    </Box>
  )
}

export default WhatToCompost

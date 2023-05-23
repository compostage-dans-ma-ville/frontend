import React from 'react'

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import { useTheme } from '@mui/material/styles'

import { useTranslation } from 'next-i18next'
import SwipeableViews from 'react-swipeable-views'

export interface SiteCarouselProps {
  images: string[]
}

const SiteCarousel: React.FC<SiteCarouselProps> = ({ images }) => {
  const theme = useTheme()
  const { t } = useTranslation('common')

  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = images.length

  const handleNext = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStepChange = (step: number): void => {
    setActiveStep(step)
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((url, index) => (
          <Box key={url} sx={{ display: 'flex', justifyContent: 'center' }}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                sx={{
                  width: '100%',
                  height: '400px',
                  backgroundImage: `url(${url})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            ) : null}
          </Box>
        ))}
      </SwipeableViews>
      <Button
        size="small"
        variant='contained'
        color='secondary'
        onClick={handleBack}
        disabled={activeStep === 0}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '20px'
        }}
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
        {t('previous')}

      </Button>
      <Button
        size="small"
        variant='contained'
        color='secondary'
        onClick={handleNext}
        disabled={activeStep === maxSteps - 1}
        sx={{
          position: 'absolute',
          top: '50%',
          right: '20px'
        }}
      >
        {t('next')}
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </Button>

      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        bottom: '10px',
        width: '100%',
        fontWeight: 'bold'
      }}>
        <Chip color="secondary" label={`${activeStep + 1} / ${images.length}`}/>
      </Box>
    </Box>
  )
}

export default SiteCarousel

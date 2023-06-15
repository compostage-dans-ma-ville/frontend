import React from 'react'

import AddRoundedIcon from '@mui/icons-material/AddRounded'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Paper, { PaperProps as PaperPropsType } from '@mui/material/Paper'

import { Map } from 'leaflet'
import { useTranslation } from 'next-i18next'
import {
  MapContainer as LeafletMapContainer,
  // eslint-disable-next-line import/named
  MapContainerProps as LeafletMapContainerProps,
  TileLayer
} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

const MAX_ZOOM = 19

export interface MapContainerProps extends LeafletMapContainerProps {
  height: number | string
  PaperProps?: PaperPropsType
}

// @ts-ignore
const _MapContainer: React.ForwardRefRenderFunction<Map, MapContainerProps> = ({
  height,
  children,
  PaperProps,
  ...restProps
}, ref: React.MutableRefObject<Map> | null) => {
  const { t } = useTranslation([
    'common'
  ])

  return (
    <Paper
      {...PaperProps}
      sx={{ overflow: 'hidden', position: 'relative', ...PaperProps?.sx }}
    >
      <ButtonGroup
        orientation="vertical"
        sx={{
          position: 'absolute',
          top: 5,
          left: 5,
          zIndex: 1000
        }}
      >
        <Button
          variant='contained'
          onClick={(): void => { ref?.current?.zoomIn() }}
          aria-label={t('common:map.zoomIn')}
          size="small"
        >
          <AddRoundedIcon />
        </Button>
        <Button
          variant='contained'
          onClick={(): void => { ref?.current?.zoomOut() }}
          aria-label={t('common:map.zoomOut')}
          size="small"
        >
          <RemoveRoundedIcon />
        </Button>
      </ButtonGroup>

      <LeafletMapContainer
        ref={ref}
        zoomControl={false}
        style={{ height }}
        maxZoom={MAX_ZOOM}
        {...restProps}
      >
        <TileLayer
          maxNativeZoom={MAX_ZOOM}
          maxZoom={MAX_ZOOM}
          attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
      </LeafletMapContainer>
    </Paper>
  )
}

export const MapContainer = React.forwardRef(_MapContainer)

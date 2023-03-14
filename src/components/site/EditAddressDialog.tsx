import React from 'react'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'

import L, { LatLng, Map } from 'leaflet'
import { useTranslation } from 'next-i18next'

import { useDistance } from '@/domains/hooks'
import {
  Address, ApiAddress, apiAddressSchema
} from '@/domains/schemas'

import AddressSelect from './AddressSelect'
import AddressMap from './map/AddressMap'
import { MapContainer } from '../map'

const DEFAULT_ZOOM = 19

export interface EditAddresseDialogProps extends Omit<DialogProps, 'onChange'> {
  address?: Address
  onChange: (address: Address) => void
  close: () => void
}

const EditAddresseDialog: React.FC<EditAddresseDialogProps> = ({
  address: addressProps,
  onChange,
  open: IsModalOpen,
  onClose,
  close: closeModal,
  ...restProps
}) => {
  const { t } = useTranslation([
    'pages',
    'errors'
  ])

  const [address, setAddress] = React.useState<ApiAddress | undefined>(addressProps && {
    housenumber: addressProps.houseNumber,
    postcode: addressProps.zipCode.toString(),
    lat: addressProps.latitude,
    lon: addressProps.longitude,
    street: addressProps.streetName
  } as unknown as ApiAddress)

  const [localisation, setLocalisation] = React.useState<LatLng | null>(null)
  const distance = useDistance(
    address ? new L.LatLng(address?.lat, address?.lon) : null,
    localisation
  )
  const ref = React.createRef<Map>()

  const isDistanceTooLong = React.useCallback((): boolean => {
    if (distance) return distance > 30 // distance higher to 30 meters
    return false
  }, [distance])

  const isAddressValid = React.useCallback((): boolean => {
    return apiAddressSchema.isValidSync(address)
  }, [address])

  React.useEffect(() => {
    if (addressProps) {
      setAddress({
        ...addressProps,
        housenumber: addressProps.houseNumber,
        postcode: addressProps.zipCode.toString(),
        lat: addressProps.latitude,
        lon: addressProps.longitude,
        street: addressProps.streetName
      } as unknown as ApiAddress)
    }
  }, [addressProps])

  return (
    <Dialog
      {...restProps}
      fullWidth={true}
      open={IsModalOpen}
      onClose={onClose}
    >
      <DialogTitle>{t('pages:site.update_localisation')}</DialogTitle>
      <DialogContent
        sx={{
          minHeight: '60vh'
        }}>
        <Box mt={2}>
          <AddressSelect
            address={address}
            onChange={setAddress}
            error={(address && !isAddressValid()) ? t('errors:address') : undefined}
          />

          {address && isAddressValid() && (
            <Grid container>
              <Grid item xs={12} mt={3}>
                <Alert severity="info">
                  {t('pages:site.update_location_on_map')}
                </Alert>
              </Grid>
              <Grid item xs={12} sx={{ flexGrow: 1 }} mt={3}>
                <MapContainer
                  ref={ref}
                  center={[address.lat, address.lon]}
                  zoom={DEFAULT_ZOOM}
                  height="400px"
                >
                  <AddressMap address={address} onCenterChange={setLocalisation}/>
                  {isDistanceTooLong() && (
                    <Alert
                      severity="error"
                      sx={{
                        position: 'absolute',
                        bottom: 5,
                        left: 5,
                        zIndex: 1000
                      }}
                    >
                      {t('pages:site.position_is_distant')}
                    </Alert>
                  )}
                </MapContainer>
              </Grid>

              <Grid item xs={12} mt={2} display='flex' justifyContent='center'>
                <Button
                  variant={isDistanceTooLong() ? 'contained' : 'outlined'}
                  onClick={(): void => {
                    ref.current?.setView([address.lat, address.lon], DEFAULT_ZOOM)
                  }}
                >
                  {t('pages:site.reset_map')}
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>

      </DialogContent>
      <DialogActions>
        <Button
          variant='outlined'
          onClick={(): void => closeModal()}
        >{t('common:cancel')}</Button>
        <Button
          variant='contained'
          disabled={!isAddressValid()}
          onClick={(): void => {
            if (address && isAddressValid() && localisation) {
              onChange({
                houseNumber: address.housenumber as string,
                streetName: address.street as string,
                zipCode: Number(address.postcode),
                city: address.city,
                latitude: localisation.lat,
                longitude: localisation.lng
              })
            }
            closeModal()
          }}
        >{t('common:save')}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditAddresseDialog

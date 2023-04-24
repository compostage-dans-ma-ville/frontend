import React from 'react'

import Box, { BoxProps } from '@mui/material/Box'
import Button from '@mui/material/Button'

import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Controller, useForm, useWatch } from 'react-hook-form'

import { Routes } from '@/domains/Routes'
import { ApiAddress } from '@/domains/schemas'
import { getAddressPlaceId, getDefaultRadiusForAddress } from '@/helpers/MapHelper'

import AddressSelect from './site/AddressSelect'

export interface CompostSearchbarProps extends BoxProps {}

interface WhereToCompostFormValues {
  address: ApiAddress
}

const CompostSearchbar: React.FC<CompostSearchbarProps> = ({ ...props }) => {
  const { t } = useTranslation([
    'common'
  ])
  const router = useRouter()
  const {
    control,
    handleSubmit
  } = useForm<WhereToCompostFormValues>()

  const address = useWatch({ control, name: 'address' })

  const goToSite = React.useCallback((): void => {
    if (address) {
      const { lat, lon, type } = address
      const placeId = getAddressPlaceId(address)

      const searchParams: Record<string, string> = {}
      if (type !== 'municipality') {
        searchParams.latitude = lat.toString()
        searchParams.longitude = lon.toString()
        searchParams.radius = getDefaultRadiusForAddress(address).toString()
      }

      router.push({
        pathname: Routes.ouComposter(placeId),
        query: searchParams
      })
    }
  }, [address, router])

  return (
    <Box component="form" display="flex" onSubmit={handleSubmit(goToSite)} {...props}>
      <Controller
        control={control}
        name="address"
        render={({
          field: {
            onChange, value
          }
        }): JSX.Element => (
          <AddressSelect
            label={null}
            address={value}
            onChange={onChange}
            sx={{ width: '100%' }}
          />
        )}
      />
      <Button
        type="submit"
        variant='contained'
        color='primary'
        sx={{ ml: 1, whiteSpace: 'nowrap' }}
        disabled={!address}

      >
        {t('common:where_to_compost')}
      </Button>
    </Box>
  )
}

export default CompostSearchbar

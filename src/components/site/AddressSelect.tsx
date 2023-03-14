import React from 'react'

import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import TextField, { TextFieldProps } from '@mui/material/TextField'

import { useTranslation } from 'next-i18next'

import { getSearchAddress } from '@/domains/api/addressApi'
import { ApiAddress } from '@/domains/schemas'
import { isNumeric } from '@/domains/utils'

export interface AddressSelectProps {
  address?: ApiAddress
  onChange: (address: ApiAddress) => void
  error?: TextFieldProps['error']
}

const AddressSelect: React.FC<AddressSelectProps> = ({ address, onChange, error }) => {
  const { t } = useTranslation([
    'common'
  ])

  const [search, setSearch] = React.useState('')
  const [addresses, setAddresses] = React.useState<ApiAddress[]>(address ? [address] : [])

  const filterOptions = (
    options: ApiAddress[]
  ): ApiAddress[] => options

  const fetchAddressMatches = React.useCallback((): void => {
    const sanitizedSearch = search.trim()

    if (!isNumeric(sanitizedSearch)) {
      getSearchAddress(sanitizedSearch).then(({ data }) => {
        const fetchedAddresses: ApiAddress[] = data.features.map(feature => {
          const coordinates = feature.geometry.coordinates
          return {
            ...feature.properties,
            lat: coordinates[1],
            lon: coordinates[0]
          }
        })

        setAddresses(fetchedAddresses)
      }).catch(() => {
      // TODO: handle error
      })
    }
  }, [search])

  const getOptionLabel = ({
    housenumber, street, postcode, city
  }: ApiAddress): string => {
    return `${housenumber || ''} ${street || ''}${(street || housenumber) && ', '}${postcode} ${city}`
  }

  React.useEffect(() => {
    if (search.length > 2) {
      fetchAddressMatches()
    }
  }, [fetchAddressMatches, search])

  return (
    <Autocomplete
      disablePortal
      value={address || null}
      onChange={(e, value): void => {
        if (value) onChange(value)
      }}
      options={addresses}
      filterOptions={filterOptions}
      noOptionsText={t('common:no_address_match')}
      inputValue={search}
      getOptionLabel={getOptionLabel}
      onInputChange={(_, value): void => {
        setSearch(value)
      }}
      isOptionEqualToValue={(option, value): boolean => option.id === value.id}
      renderInput={(params): JSX.Element => (
        <>
          {/* @ts-ignore */}
          <TextField
            {...params}
            variant='outlined'
            required
            label={t('common:address')}
            error={error !== undefined}
            helperText={error}
          />
        </>
      )}
      renderOption={(
        props,
        {
          housenumber,
          street,
          postcode,
          city
        }
      ): JSX.Element => (
        <Box
          component="li"
          sx={{ fontWeight: 500 }}
          {...props}
        >
          {housenumber} {street}{(street || housenumber) && ', '}{postcode} {city}
        </Box>
      )}
    />
  )
}

export default AddressSelect

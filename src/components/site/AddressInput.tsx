import React from 'react'

import { ButtonProps } from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'

import { Address } from '@/domains/schemas'
import { formatAddress } from '@/domains/utils'

import InputButton from '../form/InputButton'
import LazyLoadingLoader from '../LazyLoadingLoader'

const EditAddresseDialog = dynamic(
  () => import('./EditAddressDialog'),
  {
    loading: LazyLoadingLoader,
    ssr: false
  }
)

export interface AddressInputProps extends Omit<ButtonProps, 'onChange'> {
  address?: Address
  onChange: (address: Address) => void
}

const AddressInput: React.FC<AddressInputProps> = ({ address, onChange, ...restProps }) => {
  const { t } = useTranslation([
    'common'
  ])

  const [isModalOpen, setIsModalOpen] = React.useState(false)

  return (
    <>
      <EditAddresseDialog
        address={address}
        onChange={onChange}
        open={isModalOpen}
        close={(): void => setIsModalOpen(false)}
      />

      <InputButton
        {...restProps}
        onClick={(): void => { setIsModalOpen(true) }}
        sx={{
          ...restProps.sx
        }}
      >
        <Typography>
          {address ? formatAddress(address) : t('common:add_address') + ' *'}
        </Typography>
      </InputButton>
    </>
  )
}

export default AddressInput

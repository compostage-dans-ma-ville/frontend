import React from 'react'

import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import Button, { ButtonProps } from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { useTranslation } from 'next-i18next'

import { Address } from '@/domains/schemas'
import { formatAddress } from '@/domains/utils'

import EditAddresseDialog from './EditAddressDialog'

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

      <Button
        {...restProps}
        variant='outlined'
        onClick={(): void => { setIsModalOpen(true) }}
        endIcon={<ArrowForwardIosRoundedIcon />}
        sx={{
          ...restProps.sx,
          padding: 2,
          justifyContent: 'space-between',
          width: '100%',
          textAlign: 'left'
        }}
      >
        <Typography variant='body1' component='span'>
          {address ? formatAddress(address) : t('common:add_address')}
        </Typography>
      </Button>
    </>
  )
}

export default AddressInput

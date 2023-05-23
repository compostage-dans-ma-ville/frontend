import React from 'react'

import Button, { ButtonProps } from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import { useTranslation } from 'next-i18next'

export interface ConfirmDialogContextData {
  isOpen: boolean
  confirm: (
    title: string,
    description: string | JSX.Element,
    onConfirm: () => void,
    options?: {
      variant?: ButtonProps['color'],
      confirmText?: string
    }
    ) => void
  close: () => void
}
export const ConfirmDialogContext = React.createContext<ConfirmDialogContextData>(
  {} as ConfirmDialogContextData
)

export const ConfirmDialogProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation([
    'common'
  ])

  const [isOpen, setIsOpen] = React.useState(false)
  const [titleState, setTitleState] = React.useState('')
  const [descriptionState, setDescriptionState] = React.useState<string | JSX.Element>('')
  const [buttonColor, setButtonColor] = React.useState<ButtonProps['color']>('error')
  const [confirmTextState, setConfirmTextState] = React.useState<string>('')

  const [onConfirmState, setOnConfirmState] = React.useState<() => void>(() => {})

  const close = (): void => {
    setIsOpen(false)
  }

  const confirm: ConfirmDialogContextData['confirm'] = (
    title,
    description,
    onConfirm,
    options
  ): void => {
    setTitleState(title)
    setDescriptionState(description)
    setOnConfirmState(() => () => {
      onConfirm()
      close()
    })

    setButtonColor(options?.variant || 'primary')
    setConfirmTextState(options?.confirmText || t('common:confirm'))

    setIsOpen(true)
  }

  return (
    <ConfirmDialogContext.Provider
      value={{
        isOpen,
        close,
        confirm
      }}
    >
      <Dialog
        maxWidth='sm'
        fullWidth={true}
        open={isOpen}
        onClose={close}
      >
        <DialogTitle>
          {titleState}
        </DialogTitle>
        <DialogContent>
          {descriptionState}
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            onClick={close}
            color='secondary'
          >
            {t('common:cancel')}
          </Button>
          <Button variant='contained' color={buttonColor} onClick={(): void => onConfirmState()}>
            {confirmTextState}
          </Button>
        </DialogActions>
      </Dialog>
      {children}
    </ConfirmDialogContext.Provider>
  )
}

export const useConfirm = (): ConfirmDialogContextData=> {
  return React.useContext(ConfirmDialogContext)
}

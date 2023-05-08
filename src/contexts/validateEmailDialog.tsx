import React from 'react'

export interface ValidateEmailDialogContextData {
  isOpen: boolean
  open: () => void
  close: () => void
}
export const ValidateEmailDialogContext = React.createContext<ValidateEmailDialogContextData>(
  {} as ValidateEmailDialogContextData
)

export const ValidateEmailDialogProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const open = (): void => {
    setIsOpen(true)
  }

  const close = (): void => {
    setIsOpen(false)
  }
  return (
    <ValidateEmailDialogContext.Provider
      value={{ isOpen, open, close }}
    >
      {children}
    </ValidateEmailDialogContext.Provider>
  )
}

export const useValidateEmailDialog = (): ValidateEmailDialogContextData=> {
  return React.useContext(ValidateEmailDialogContext)
}

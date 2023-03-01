import React from 'react'

import AddRoundedIcon from '@mui/icons-material/AddRounded'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'

import { useTranslation } from 'next-i18next'

import { DayOfWeek, Opening, Schedule } from '@/domains/schemas'

import HourInput from './HourInput'

export interface EditDayOpeningsDialogProps extends Omit<DialogProps, 'onChange'> {
  day: DayOfWeek
  openings: Schedule
  onChange: (openings: Schedule) => void
  close: () => void
}

const defaultOpenings = [
  {
    open: '18:00',
    close: '19:00'
  }
] as Opening[]

const EditDayOpeningsDialog: React.FC<EditDayOpeningsDialogProps> = ({
  day,
  onChange,
  openings: openingsProps,
  open: IsModalOpen,
  onClose,
  close: closeModal,
  ...restProps
}) => {
  const { t } = useTranslation([
    'common',
    'pages'
  ])
  const [openings, setOpenings] = React.useState(openingsProps)

  const setDayAsOpenH24 = (): void => {
    setOpenings([])
  }

  const setDayAsClosed = (): void => {
    setOpenings(null)
  }

  const addOpening = React.useCallback(() => {
    setOpenings([...(openings || []), defaultOpenings[0]])
  }, [openings])

  const updateOpening = React.useCallback((openingIndex: number, opening: Opening) => {
    if (openings?.length) {
      const updatedOpenings = [...openings]
      updatedOpenings[openingIndex] = opening
      setOpenings(updatedOpenings)
    }
  }, [openings])

  const deleteOpening = React.useCallback((openingIndex: number): void => {
    if (openings?.length) {
      const updatedOpenings = [...openings]
      updatedOpenings.splice(openingIndex, 1)
      setOpenings(updatedOpenings)
    }
  }, [openings])

  React.useEffect(() => {
    setOpenings(openingsProps)
  }, [openingsProps])

  return (
    <Dialog
      {...restProps}
      open={IsModalOpen}
      onClose={onClose}
    >
      <DialogTitle>{t('pages:site.opening_of')} {t(`common:days.${day}`)}:</DialogTitle>
      <DialogContent>
        <Grid container columnSpacing={3}>
          <Grid item>
            <FormControlLabel
              control={<Checkbox checked={openings?.length === 0} color='secondary' />}
              onChange={(_, checked): void => {
                if (checked) {
                  setDayAsOpenH24()
                } else {
                  setOpenings(defaultOpenings)
                }
              }}
              label={t('common:open_h24')}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={openings === null}
                  color='secondary'
                />
              }
              onChange={(_, checked): void => {
                if (checked) {
                  setDayAsClosed()
                } else {
                  setOpenings(defaultOpenings)
                }
              }}
              label={t('common:closed')} />
          </Grid>
          {openings && (
            <Grid item xs={12} mt={2} display='flex' flexDirection='column' alignItems='center'>
              <List sx={{ width: '100%' }}>
                {openings.map(({ open, close }, index) => {
                  return (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label={t('common:delete')}
                          onClick={(): void => deleteOpening(index)}
                        >
                          <ClearRoundedIcon />
                        </IconButton>
                      }
                    >
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography fontWeight="bold" component="h3">
                            {t('common:opening')}:
                          </Typography>
                          <HourInput
                            sx={{ fontSize: '1.2rem', ml: 2 }}
                            hour={open}
                            onChange={(hour): void => {
                              updateOpening(index, { open: hour, close })
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography fontWeight="bold" component="h3">
                            {t('common:closing')}:
                          </Typography>
                          <HourInput
                            sx={{ fontSize: '1.2rem', ml: 2 }}
                            hour={close}
                            onChange={(hour): void => {
                              updateOpening(index, { open, close: hour })
                            }}
                          />
                        </Grid>
                      </Grid>
                    </ListItem>
                  )
                })}
              </List>
              <Button
                variant='outlined'
                color='secondary'
                startIcon={<AddRoundedIcon />}
                onClick={addOpening}
                sx={{ mt: 1 }}
              >
                {t('pages:site.add_opening')}
              </Button>
            </Grid>
          )}

        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant='outlined'
          onClick={(): void => closeModal()}
        >{t('common:cancel')}</Button>
        <Button
          variant='contained'
          onClick={(): void => {
            onChange(openings)
            closeModal()
          }}
        >{t('common:save')}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditDayOpeningsDialog

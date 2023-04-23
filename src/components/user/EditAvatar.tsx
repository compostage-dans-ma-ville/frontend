import React, { FormEvent } from 'react'

import EditIcon from '@mui/icons-material/EditRounded'
import UploadRoundedIcon from '@mui/icons-material/UploadRounded'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'

import { useTranslation } from 'next-i18next'
import AvatarEditor from 'react-avatar-editor'

import { useMe } from '@/contexts'
import { uploadAvatar } from '@/domains/api'
import { useUser } from '@/domains/api/hooks'
import { User } from '@/domains/schemas'
import { avatarFileSchema } from '@/domains/schemas/avatar'

export interface EditAvatarProps {
  user: User
}

const EditAvatar: React.FC<EditAvatarProps> = ({ user }) => {
  const { t } = useTranslation([
    'common',
    'pages'
  ])
  const { update } = useMe()
  const { mutate } = useUser(user.id)

  const editor = React.useRef<AvatarEditor | null>(null)
  const [imageSource, setImageSource] = React.useState(user.avatar)
  const [openDialog, setOpenDialog] = React.useState(false)
  const [zoomLevel, setZoomLevel] = React.useState(1)
  const [imageErrored, setImageErrored] = React.useState(false)

  const userUploaded = React.useMemo(() => {
    return imageSource !== user.avatar || zoomLevel !== 1
  }, [imageSource, user.avatar, zoomLevel])

  const handleChange = (e: FormEvent<HTMLInputElement>): void => {
    const file = (e?.target as HTMLInputElement)?.files?.[0] as File
    if (file) {
      if (avatarFileSchema.isValidSync(file)) {
        setImageSource(URL.createObjectURL(file))
        setZoomLevel(1)
        setImageErrored(false)
      } else {
        setImageErrored(true)
      }
    }
  }

  const removeAvatar = (): void => {
    // TODO: send request
  }

  const save = (): void => {
    if (editor.current) {
      editor.current.getImage().toBlob((blob) => {
        if (blob) {
          uploadAvatar(blob)
            .then(({ data }) => {
              update({ avatar: data.link })
              mutate()
              setOpenDialog(false)
            })
            .catch(() => {})
        }
      })
    }
  }

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={(): void => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{t('common:update_avatar')}</DialogTitle>
        <DialogContent sx={{
          minWidth: '300px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {imageErrored && (
            <Alert severity="error" sx={{ mt: 2 }}>{t('errors:avatar_image')}</Alert>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <AvatarEditor
              ref={editor}
              image={imageSource as string}
              width={200}
              height={200}
              borderRadius={200}
              border={10}
              color={[0, 0, 0, 0.6]}
              scale={zoomLevel}
              crossOrigin={'anonymous'}
            />
          </Box>

          <Box
            sx={{ width: 200 }}
          >
            <Typography gutterBottom sx={{ mt: 2, textAlign: 'left', width: '100%' }}>
              {t('pages:user.adjust_zoom')}
            </Typography>
            <Slider
              defaultValue={1}
              value={zoomLevel}
              min={1}
              max={2}
              step={0.1}
              marks={[
                {
                  value: 1,
                  label: '-'
                },
                {
                  value: 2,
                  label: '+'
                }
              ]}
              onChange={(e, zoom): void => {
                setZoomLevel(zoom as number)
              }}
            />
          </Box>

        </DialogContent>
        <DialogActions>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            {!userUploaded && (
              <Button size='small' variant='outlined' color='error' onClick={removeAvatar}>
                {t('pages:user.delete_avatar')}
              </Button>
            )}

            <Button
              component="label"
              variant={userUploaded ? 'outlined' : 'contained'}
              color='secondary'
              startIcon={<UploadRoundedIcon />}
            >
              {t('common:upload_image')}
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onInput={handleChange}
                hidden
              />
            </Button>

            {userUploaded && (
              <Button
                variant='contained'
                onClick={save}
              >{t('common:save_changes')}</Button>
            )}

          </Box>
        </DialogActions>
      </Dialog>

      <Box sx={{ position: 'relative' }}>
        <Avatar
          src={user.avatar}
          sx={{
            width: '150px',
            height: '150px'
          }}
        />
        <Button
          startIcon={<EditIcon />}
          variant="contained"
          size='small'
          sx={{ position: 'absolute', bottom: 10, left: 5 }}
          onClick={(): void => setOpenDialog(true)}
        >{t('common:edit')}</Button>
      </Box>
    </>
  )
}

export default EditAvatar

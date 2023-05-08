/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AxiosResponse } from 'axios'
import useSWRMutation from 'swr/mutation'

import { resetPassword } from '../auth'

const resetPasswordEmailKey = '/auth/sendResetPasswordEmail' as const

export const useSendResetPasswordEmail = () => {
  const {
    data, error, trigger, isMutating
  } = useSWRMutation<
    AxiosResponse,
    any,
    typeof resetPasswordEmailKey,
    string
  >(resetPasswordEmailKey, (url, { arg }) => resetPassword({ email: arg }))

  return {
    data,
    isMutating,
    error,
    trigger
  }
}

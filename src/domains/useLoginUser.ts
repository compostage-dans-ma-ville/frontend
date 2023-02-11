import { LoginUser } from './user'
import useSWRMutation from 'swr/mutation'

import { loginUser } from './api'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useLoginUser = () => {
  return useSWRMutation('login_user', (url, data) => loginUser(data as unknown as LoginUser))
}

export default useLoginUser

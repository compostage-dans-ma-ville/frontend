// eslint-disable-next-line no-restricted-imports
import * as yup from 'yup'
import { AnyObject, Maybe } from 'yup/lib/types'

yup.addMethod<yup.StringSchema>(yup.string, 'emptyAsUndefined', function () {
  return this.transform((value) => (value || undefined))
})

declare module 'yup' {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends yup.BaseSchema<TType, TContext, TOut> {
    emptyAsUndefined(): StringSchema<TType, TContext>;
  }
}

export default yup

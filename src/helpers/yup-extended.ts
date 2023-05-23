// eslint-disable-next-line no-restricted-imports
import * as yup from 'yup'
import { AnyObject, Maybe } from 'yup/lib/types'

yup.addMethod<yup.StringSchema>(yup.string, 'emptyAsUndefined', function () {
  return this.transform((value) => (value || undefined))
})

yup.addMethod<yup.NumberSchema>(yup.number, 'allowUndefined', function () {
  return this.transform((currentValue, originalValue) => originalValue === '' ? undefined : currentValue).notRequired()
})

declare module 'yup' {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends yup.BaseSchema<TType, TContext, TOut> {
    emptyAsUndefined(): StringSchema<TType, TContext>;
  }

  interface NumberSchema<
    TType extends Maybe<number> = number | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends yup.BaseSchema<TType, TContext, TOut> {
    allowUndefined(): NumberSchema<TType, TContext>;
  }
}

export default yup

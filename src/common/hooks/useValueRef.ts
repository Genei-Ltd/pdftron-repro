import { MutableRefObject, useLayoutEffect, useRef } from 'react'

export const useValueRef = <T>(value: T): MutableRefObject<T> => {
  const ref = useRef(value)
  useLayoutEffect(() => {
    ref.current = value
  }, [ value ])
  return ref
}

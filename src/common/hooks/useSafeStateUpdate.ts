import { useCallback } from 'react'
import { unstable_batchedUpdates } from 'react-dom'
import { useMountedRef } from './useMountedRef'

export const useSafeStateUpdate = () => {
  const mountedRef = useMountedRef()

  return useCallback((update: () => any) => {
    unstable_batchedUpdates(() => {
      if (!mountedRef.current) return
      update()
    })
  }, [ mountedRef ])
}

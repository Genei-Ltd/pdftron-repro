import { useEffect, useState } from 'react'
import { useSafeStateUpdate, useValueRef } from 'common/hooks'
import { MaybePromise } from 'utils/types'
import { Core } from '../types'

async function fetchDocument(url: string) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(response.status.toString(10))
  }
  const blob = await response.blob()
  return blob
}

export type LoadDocumentOptions = {
  getCached?: () => MaybePromise<Blob | null | undefined>
  setCached?: (blob: Blob) => MaybePromise<any>
}

export const useLoadDocument = (docViewer: Core.DocumentViewer | null, url: string, options?: LoadDocumentOptions) => {
  const safeUpdate = useSafeStateUpdate()
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null)
  const [error, setError] = useState<Error | undefined>(undefined)
  const optionsRef = useValueRef(options)
  useEffect(() => {
    if (!docViewer) return
    let canceled = false
    const loadDocument = async () => {
      setError(undefined)
      try {
        let blob: Blob
        const cachedBlob = await optionsRef.current?.getCached?.()
        if (cachedBlob) {
          blob = cachedBlob
        } else {
          blob = await fetchDocument(url)
          optionsRef.current?.setCached?.(blob)
        }
        if (canceled) return
        await docViewer.loadDocument(blob, { extension: 'pdf' })
        safeUpdate(() => setLoadedUrl(url))
      } catch (error) {
        if (canceled) return
        console.error(`Failed to load document`, error)
        setError(new Error('Failed to load document'))
      }
    }
    loadDocument()
    return () => {
      canceled = true
      docViewer.closeDocument()
      docViewer.dispose()
    }
  }, [docViewer, url, optionsRef, safeUpdate])
  const isReady = loadedUrl === url
  return { isReady, error }
}

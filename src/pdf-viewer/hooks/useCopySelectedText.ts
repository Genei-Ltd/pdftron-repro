import { useEffect } from 'react'
import { isModC } from 'utils/hotkeys'
import { usePdfController } from './usePdfController'
import { Core } from '../types'

export const useCopySelectedText = (docViewer: Core.DocumentViewer | null) => {
  const pdfController = usePdfController()
  useEffect(() => {
    if (!docViewer || !pdfController) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (!isModC(e)) return
      pdfController.copySelectedText(docViewer)
    }
    docViewer.addEventListener('keyDown', onKeyDown)
    return () => docViewer.removeEventListener('keyDown', onKeyDown)
  }, [ docViewer, pdfController ])
}



import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { usePdfController } from './usePdfController'
import { Core, Zoom, ZoomController } from '../types'

export const useZoom = (docViewer: Core.DocumentViewer | null, isDocReady: boolean): ZoomController => {
  const [ zoom, setZoom ] = useState<Zoom>('fit-page')
  const pdfController = usePdfController()
  useEffect(() => {
    if (!isDocReady) setZoom('fit-page')
  }, [ isDocReady ])
  useLayoutEffect(() => {
    if (!docViewer || !pdfController || !isDocReady) return
    pdfController.setZoom(docViewer, zoom)
  }, [ pdfController, docViewer, isDocReady, zoom ])
  useLayoutEffect(() => {
    if (!docViewer) return
    const onZoomUpdated = () => window.dispatchEvent(new Event('resize'))
    docViewer.addEventListener('zoomUpdated', onZoomUpdated)
    return () => docViewer.removeEventListener('zoomUpdated', onZoomUpdated)
  }, [ docViewer ])
  const fitPage = useCallback(() => setZoom('fit-page'), [])
  const fitWidth = useCallback(() => setZoom('fit-width'), [])
  const changeBy = useCallback((delta: number) => setZoom((z) => {
    if (!docViewer || !pdfController) return z
    return pdfController.getZoom(docViewer, delta)
  }), [ docViewer, pdfController ])
  return { fitPage, fitWidth, changeBy }
}

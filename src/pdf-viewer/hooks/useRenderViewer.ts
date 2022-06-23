import { useRef, useLayoutEffect } from 'react'
import useResizeObserver from 'use-resize-observer'
import throttle from 'lodash.throttle'
import { useDocViewer, usePDFTron } from '../PDFTronProvider'
import {
  getHighlightAnnotationClass, getEntityAnnotationClass
} from '../Annotations'
import { TCore, Core } from '../types'

const setupDocViewer = (docViewer: Core.DocumentViewer, Core: TCore) => {
  docViewer.getDisplayModeManager().disableVirtualDisplayMode()
  docViewer.enableAnnotations()
  docViewer.setToolMode(docViewer.getTool('AnnotationEdit'))
  docViewer.setTextHighlightColor('rgba(12, 105, 255, 0.3)')
  const HighlightAnnotation = getHighlightAnnotationClass(Core)
  const EntityAnnotation = getEntityAnnotationClass(Core)
  const annotManager = docViewer.getAnnotationManager()
  annotManager.registerAnnotationType(HighlightAnnotation.prototype.elementName, HighlightAnnotation)
  annotManager.registerAnnotationType(EntityAnnotation.prototype.elementName, EntityAnnotation)
}

export const useRenderViewer = (id: string) => {
  const scrollViewRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<HTMLDivElement>(null)
  const docViewer = useDocViewer(id)
  const { createDocViewer, deleteDocViewer } = usePDFTron()
  useLayoutEffect(() => {
    const scrollViewElement = scrollViewRef.current
    const viewerElement = viewerRef.current
    if (!scrollViewElement || !viewerElement) return undefined
    createDocViewer(id, scrollViewElement, viewerElement, setupDocViewer)
    return () => deleteDocViewer(id)
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps
  useResizeObserver({
    ref: scrollViewRef,
    onResize: throttle(() => {
      if (!docViewer) return
      docViewer.scrollViewUpdated()
    }, 200, { trailing: true })
  })
  return { scrollViewRef, viewerRef }
}

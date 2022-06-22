import { ZoomControls } from './ZoomControls'
import { useDocViewer } from './PDFTronProvider'
import {
  LoadDocumentOptions, useCopySelectedText, useLoadDocument, useRenderViewer, useZoom
} from './hooks'
import { DocViewerId } from './types'
import './PdfViewer.css'

export type PdfViewerProps = {
  id: DocViewerId
  url: string
  loadOptions?: LoadDocumentOptions
}

export const PdfViewer = (props: PdfViewerProps) => {
  const { id, url, loadOptions } = props
  const docViewer = useDocViewer(id)
  const { scrollViewRef, viewerRef } = useRenderViewer(id)
  const { isReady } = useLoadDocument(docViewer, url, loadOptions)
  const zoom = useZoom(docViewer, isReady)
  useCopySelectedText(docViewer)
  return (
    <>
      <div
        id={`pdf-scroll-view[id=${id}]`}
        className='scroll-view'
        ref={scrollViewRef}
      >
        <div
          id={`pdf-viewer[id=${id}]`}
          className='viewer'
          ref={viewerRef}
        />
      </div>
      <ZoomControls zoom={zoom} />
    </>
  )
}

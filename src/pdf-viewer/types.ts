import type { Core } from '@pdftron/webviewer'

export type { Core } from '@pdftron/webviewer'
export type TCore = typeof Core
export type TPDFNet = typeof Core.PDFNet

export type GetCore = () => TCore
export type GetPDFNet = () => TPDFNet

export type DocViewerId = string

export type DocViewerMap = {
  [key: DocViewerId]: Core.DocumentViewer
}

export type GetDocViewer = (id: DocViewerId) => Core.DocumentViewer | null

export type CreateDocViewer = (
  id: DocViewerId,
  scrollViewElement: Element,
  viewerElement: Element,
  setupDocViewer?: (docViewer: Core.DocumentViewer, Core: TCore) => void
) => Core.DocumentViewer

export type DeleteDocViewer = (id: DocViewerId) => void

export type QuadData = [number, number, number, number, number, number, number, number]
export type RectData = [number, number, number, number]
export type QuadCoords = { x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number }
export type RectCoords = { x1: number, y1: number, x2: number, y2: number }

export type Zoom = 'fit-width' | 'fit-page' | number
export type ZoomController = {
  fitPage: () => void
  fitWidth: () => void
  changeBy: (delta: number) => void
}

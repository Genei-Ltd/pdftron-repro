import { cleanStringWhitespace } from 'utils/common'
import { copyToClipboard } from 'utils/dom'
import {
  TAnnotations, getHighlightAnnotationClass, getEntityAnnotationClass
} from './Annotations'
import {
  TCore, Core, QuadData, QuadCoords, RectData, RectCoords, Zoom
} from './types'

export type EnhancedCore = TCore & {
  Annotations: TCore['Annotations'] & Required<TAnnotations>
}

export class PdfController {
  public readonly isReady: true = true
  private readonly Core: EnhancedCore

  constructor(Core: TCore) {
    this.Core = PdfController.createEnhancedCore(Core)
  }

  public setZoom(docViewer: Core.DocumentViewer, zoom: Zoom) {
    if (zoom === 'fit-width') {
      // @ts-ignore FitMode not available on DocumentViewer class?
      docViewer.setFitMode(docViewer.FitMode.FitWidth)
    } else if (zoom === 'fit-page') {
      // @ts-ignore
      docViewer.setFitMode(docViewer.FitMode.FitPage)
    } else {
      // @ts-ignore
      docViewer.setFitMode(docViewer.FitMode.Zoom)
      docViewer.zoomTo(zoom)
    }
  }

  public getZoom(docViewer: Core.DocumentViewer, delta: number = 0) {
    return docViewer.getZoomLevel() + delta
  }

  public copySelectedText(docViewer: Core.DocumentViewer, raw?: boolean) {
    const text = this.getSelectedText(docViewer, raw)
    return copyToClipboard(text)
  }

  public getSelectedText(docViewer: Core.DocumentViewer, raw?: boolean) {
    const text = docViewer.getSelectedText()
    if (raw) return text
    return cleanStringWhitespace(text)
  }

  public createHighlightAnnotation(docViewer: Core.DocumentViewer) {
    const { Math, Annotations } = this.Core
    const annotManager = docViewer.getAnnotationManager()
    const highlight = new Annotations.HighlightAnnotation({
      PageNumber: 1,
      Quads: [ new Math.Quad(0, 0, 50, 0, 50, 50, 0, 50) ]
    })
    annotManager.addAnnotation(highlight)
  }

  public createQuad(data: QuadData) {
    const { Math } = this.Core
    return new Math.Quad(...data)
  }

  public createRect(data: RectData) {
    const { Math } = this.Core
    return new Math.Rect(...data)
  }

  public makeQuad(quad: Core.Math.Quad | QuadCoords) {
    const { Math } = this.Core
    if (quad instanceof Math.Quad) return quad
    const {
      x1, y1, x2, y2, x3, y3, x4, y4
    } = quad
    return this.createQuad([ x1, y1, x2, y2, x3, y3, x4, y4 ])
  }

  public makeRect(rect: Core.Math.Rect | RectCoords) {
    const { Math } = this.Core
    if (rect instanceof Math.Rect) return rect
    const {
      x1, y1, x2, y2
    } = rect
    return this.createRect([x1, y1, x2, y2])
  }

  public static createEnhancedCore(Core: TCore): EnhancedCore {
    return {
      ...Core,
      Annotations: {
        ...Core.Annotations,
        HighlightAnnotation: getHighlightAnnotationClass(Core),
        EntityAnnotation: getEntityAnnotationClass(Core)
      }
    }
  }
}

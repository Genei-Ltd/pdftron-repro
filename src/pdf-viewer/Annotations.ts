import { TCore, Core } from './types'

type BaseAnnotationOptions = {
  StrokeColor?: [number, number, number, number?]
  PageNumber: number
  Quads: Core.Math.Quad[]
}

type HighlightAnnotationOptions = BaseAnnotationOptions & {}

function createHighlightAnnotationClass(Core: TCore) {
  const { Annotations } = Core
  const { TextHighlightAnnotation } = Annotations

  class HighlightAnnotation extends TextHighlightAnnotation {
    constructor(options: HighlightAnnotationOptions) {
      super('Highlight')
      this.Subject = 'Highlight'
      this.PageNumber = options.PageNumber
      this.Quads = options.Quads
      this.Opacity = 0.25
      if (options.StrokeColor) {
        this.StrokeColor = new Annotations.Color(...options.StrokeColor)
      }
    }
  }

  HighlightAnnotation.prototype.elementName = 'Highlight'
  return HighlightAnnotation
}

type EntityAnnotationOptions = BaseAnnotationOptions & {
  EntityId: number
}

function createEntityAnnotationClass(Core: TCore) {
  const { Annotations } = Core
  const { TextUnderlineAnnotation } = Annotations

  class EntityAnnotation extends TextUnderlineAnnotation {
    EntityId: number

    constructor(options: EntityAnnotationOptions) {
      super('Entity')
      this.Subject = 'Entity'
      this.EntityId = options.EntityId
      this.PageNumber = options.PageNumber
      this.Quads = options.Quads
      if (options.StrokeColor) {
        this.StrokeColor = new Annotations.Color(...options.StrokeColor)
      } else {
        this.StrokeColor = new Annotations.Color(0, 255, 0)
      }
    }
  }

  EntityAnnotation.prototype.elementName = 'Entity'
  return EntityAnnotation
}

export type TAnnotations = {
  HighlightAnnotation?: ReturnType<typeof createHighlightAnnotationClass>
  EntityAnnotation?: ReturnType<typeof createEntityAnnotationClass>
}

const Annotations: TAnnotations = {}

export function getHighlightAnnotationClass(Core: TCore) {
  if (!Annotations.HighlightAnnotation) {
    Annotations.HighlightAnnotation = createHighlightAnnotationClass(Core)
  }
  return Annotations.HighlightAnnotation
}

export function getEntityAnnotationClass(Core: TCore) {
  if (!Annotations.EntityAnnotation) {
    Annotations.EntityAnnotation = createEntityAnnotationClass(Core)
  }
  return Annotations.EntityAnnotation
}

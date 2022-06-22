import { useMemo } from 'react'
import { Core } from '../globals'
import { PdfController } from '../PdfController'

export const usePdfController = () => {
  return useMemo(() => new PdfController(Core), [])
}

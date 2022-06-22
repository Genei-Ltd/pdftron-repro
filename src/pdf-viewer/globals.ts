import { getenv } from 'utils/common'
import { TCore, TPDFNet } from './types'

// @ts-ignore
export const Core = window.Core as TCore
// @ts-ignore
export const PDFNet = window.PDFNet as TPDFNet

Core.setWorkerPath('/webviewer/core')
PDFNet.runWithCleanup(() => Core.disableFullPDF(), getenv('REACT_APP_PDFTRON_LICENSE', true))

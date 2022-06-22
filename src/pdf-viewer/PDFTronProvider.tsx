import {
  useState, createContext, useContext, useCallback, useMemo
} from 'react'
import { Core } from './globals'
import {
  DocViewerId, DocViewerMap, GetDocViewer, CreateDocViewer, DeleteDocViewer
} from './types'

export type PDFTronContextValue = {
  docViewers: DocViewerMap
  getDocViewer: GetDocViewer
  createDocViewer: CreateDocViewer
  deleteDocViewer: DeleteDocViewer
}

const PDFTronContext = createContext<PDFTronContextValue | null>(null)

type PDFTronProviderProps = React.PropsWithChildren<{}>

export const PDFTronProvider = (props: PDFTronProviderProps) => {
  const [ docViewers, setDocViewers ] = useState<DocViewerMap>({})

  const getDocViewer: GetDocViewer = useCallback((id: DocViewerId) => {
    const viewer = docViewers[id]
    if (!viewer) return null
    return viewer
  }, [ docViewers ])

  const createDocViewer: CreateDocViewer = useCallback((
    id, scrollViewElement, viewerElement, setupDocViewer
  ) => {
    const docViewer = new Core.DocumentViewer()
    docViewer.setScrollViewElement(scrollViewElement)
    docViewer.setViewerElement(viewerElement)
    if (setupDocViewer) setupDocViewer(docViewer, Core)
    setDocViewers((viewers) => {
      if (viewers.hasOwnProperty(id)) {
        throw new Error(`There is already a viewer with id ${id}`)
      }
      return { ...viewers, [id]: docViewer }
    })
    return docViewer
  }, [])

  const deleteDocViewer: DeleteDocViewer = useCallback((id: DocViewerId) => {
    setDocViewers((viewers) => {
      const { [id]: viewer, ...remainingViewers } = viewers
      if (!viewer) return viewers
      viewer.closeDocument()
      viewer.dispose()
      return remainingViewers
    })
  }, [])

  const value = useMemo(() => {
    return {
      docViewers,
      getDocViewer,
      createDocViewer,
      deleteDocViewer
    }
  }, [
    docViewers,
    getDocViewer,
    createDocViewer,
    deleteDocViewer,
  ])

  return (
    <PDFTronContext.Provider value={value}>
      {props.children}
    </PDFTronContext.Provider>
  )
}

export const usePDFTron = (): PDFTronContextValue => {
  const context = useContext(PDFTronContext)
  if (context === null) {
    throw new Error(
      `The \`usePDFTron\` hook must be used inside the <PDFTronProvider> component's context.`
    )
  }
  return context
}

export const useDocViewer = (id: string) => {
  const { getDocViewer } = usePDFTron()
  return getDocViewer(id)
}

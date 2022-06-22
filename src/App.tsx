import { PdfViewer, PDFTronProvider } from 'pdf-viewer'
import './App.css'

function App() {
  return (
    <PDFTronProvider>
      <div className='viewers'>
        <div className='menu'>
          Menu seems to cause selection offset
        </div>
        <div className='viewer-container'>
          <PdfViewer
            id='1'
            url='https://genei-cdn-resources.s3.eu-west-1.amazonaws.com/e11024aa-537d-4ca5-b0f9-01235221f6dd.pdf'
          />
        </div>
        <div className='viewer-container'>
          <PdfViewer
            id='2'
            url='https://genei-cdn-resources.s3.eu-west-1.amazonaws.com/Global+Burden+of+Cardiovascular+Diseases+and+Risk+Factors%2C+1990%E2%80%932019.pdf'
          />
        </div>
      </div>
    </PDFTronProvider>
  )
}

export default App

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ItemProvider } from './context/ItemContext.jsx'
import { DictionaryProvider } from './context/DictionaryContext.jsx'
import { APIProvider } from './context/APIContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <APIProvider>
    <ItemProvider>
      <DictionaryProvider>
          <App />
      </DictionaryProvider>
    </ItemProvider>
        </APIProvider>
  </StrictMode>
)

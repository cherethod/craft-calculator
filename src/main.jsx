import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ItemProvider } from './context/ItemContext.jsx'
import { DictionaryProvider } from './context/DictionaryContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ItemProvider>
      <DictionaryProvider>
        <App />
      </DictionaryProvider>
    </ItemProvider>
  </StrictMode>
)
